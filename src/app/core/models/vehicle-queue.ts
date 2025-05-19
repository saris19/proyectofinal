export class VehicleQueue<T> {
  private items: T[] = [];

  getItems(): T[] {
    return [...this.items];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }

  getLastItem(): T | null {
    return this.items.length > 0 ? this.items[0] : null;
  }
}