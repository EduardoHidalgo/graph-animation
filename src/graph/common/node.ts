export interface NodeArgs {
  id: string;
}

export abstract class Node<E> {
  id: string;
  adjacencyList: Array<E>;

  constructor({ id }: NodeArgs) {
    this.id = id;
    this.adjacencyList = [];
  }

  addEdge(edge: E) {
    this.adjacencyList.push(edge);
  }

  removeEdge(edge: E): void {
    const index = this.adjacencyList.indexOf(edge);
    if (index > -1) {
      this.adjacencyList.splice(index, 1);
    }
  }
}
