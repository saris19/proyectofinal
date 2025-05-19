import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([4.6097, -74.0817], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.addDetectionPoint([4.6097, -74.0817], 'Punto de detección principal');
  }

  private addDetectionPoint(latLng: [number, number], popupText: string): void {
    const marker = L.marker(latLng)
      .addTo(this.map)
      .bindPopup(popupText);
    
    this.markers.push(marker);
  }

  public clearMarkers(): void {
    this.markers.forEach(marker => marker.removeFrom(this.map));
    this.markers = [];
  }
}