import { Injectable } from '@angular/core';

export interface VehicleDetector {
  detect(): Promise<VehicleData>;
}

export interface VehicleData {
  type: string;
  axleCount: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleDetectorFactory {
  createDetector(type: 'camera' | 'lidar'): VehicleDetector {
    switch (type) {
      case 'camera': return new CameraDetector();
      case 'lidar': return new LidarDetector();
      default: throw new Error('Tipo de detector no válido');
    }
  }
}

class CameraDetector implements VehicleDetector {
  async detect(): Promise<VehicleData> {
    return {
      type: 'Camión',
      axleCount: 4,
      timestamp: new Date()
    };
  }
}

class LidarDetector implements VehicleDetector {
  async detect(): Promise<VehicleData> {
    return {
      type: 'Automóvil',
      axleCount: 2,
      timestamp: new Date()
    };
  }
}