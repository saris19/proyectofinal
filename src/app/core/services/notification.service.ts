import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  currentNotifications = this.notifications.asObservable();
  private idCounter = 0;

  addNotification(type: Notification['type'], message: string) {
    const newNotification: Notification = {
      id: ++this.idCounter,
      type,
      message,
      timestamp: new Date()
    };
    
    this.notifications.next([...this.notifications.value, newNotification]);

    if (type !== 'error') {
      setTimeout(() => this.removeNotification(newNotification.id), 5000);
    }
  }

  removeNotification(id: number) {
    this.notifications.next(
      this.notifications.value.filter(n => n.id !== id)
    );
  }

  clearAll() {
    this.notifications.next([]);
  }
}