import { Component, OnInit } from '@angular/core';
import { VehicleDetectorFactory } from '../../../core/services/vehicle-detector-factory.service';
import { VehicleQueue } from '../../../core/models/vehicle-queue';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MapComponent } from '../map/map.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
    MapComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vehicleQueue = new VehicleQueue<any>();
  detectorType: 'camera' | 'lidar' = 'camera';
  dateFilter = '';
  vehicleTypeFilter = 'todos';
  private updateInterval = interval(5000);

  // Configuración del gráfico
  public trafficChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      data: [10, 20, 35, 45, 30, 15],
      label: 'Vehículos por hora',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  public trafficChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de vehículos'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hora del día'
        }
      }
    }
  };

  public trafficChartType: 'bar' = 'bar';

  // Estadísticas
  public stats = {
    totalVehicles: 0,
    cars: 0,
    trucks: 0,
    avgAxles: 0
  };

  constructor(
    private detectorFactory: VehicleDetectorFactory,
    private apiHttp: ApiHttpService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.updateStats();
    this.startDetection();
    this.updateInterval.subscribe(() => {
      this.startDetection();
    });
  }

  async startDetection() {
    try {
      const detector = this.detectorFactory.createDetector(this.detectorType);
      const vehicle = await detector.detect();
      
      this.vehicleQueue.enqueue(vehicle);
      this.saveToApi(vehicle);
      this.updateChart();
      this.updateStats();
      
      this.notification.addNotification(
        'success',
        `${vehicle.type} detectado - ${vehicle.axleCount} ejes`
      );
    } catch (error) {
      this.notification.addNotification(
        'error',
        'Error en detección: ' + (error as Error).message
      );
    }
  }

  private saveToApi(vehicle: any) {
    this.apiHttp.getVehicleData('sensor-1').subscribe({
      next: () => console.log('Datos guardados'),
      error: (err) => this.notification.addNotification('warning', 'Error al guardar datos')
    });
  }

  private updateChart() {
    const hour = new Date().getHours();
    const index = Math.floor(hour / 4);
    const counts = [...this.trafficChartData.datasets[0].data] as number[];
    counts[index] += 1;
    
    this.trafficChartData = {
      ...this.trafficChartData,
      datasets: [{
        ...this.trafficChartData.datasets[0],
        data: counts
      }]
    };
  }

  private updateStats() {
    const vehicles = this.vehicleQueue.getItems();
    this.stats = {
      totalVehicles: vehicles.length,
      cars: vehicles.filter(v => v.type === 'Automóvil').length,
      trucks: vehicles.filter(v => v.type === 'Camión').length,
      avgAxles: vehicles.reduce((sum, v) => sum + v.axleCount, 0) / vehicles.length || 0
    };
  }

  get filteredVehicles() {
    return this.vehicleQueue.getItems().filter(vehicle => {
      const matchesDate = this.dateFilter ? 
        new Date(vehicle.timestamp).toLocaleDateString() === new Date(this.dateFilter).toLocaleDateString() : 
        true;
      const matchesType = this.vehicleTypeFilter !== 'todos' ? 
        vehicle.type === this.vehicleTypeFilter : 
        true;
      return matchesDate && matchesType;
    });
  }
}