// ../components/queue.tsx

import React, { ReactNode } from 'react';

class Queue<T extends ReactNode> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  // You can add more methods if needed

  render(): React.ReactNode {
    // Add your JSX to render the queue or any additional information
    return (
      <div>
        <h2>Queue:</h2>
        <ul>
          {this.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  
}

export default Queue;
