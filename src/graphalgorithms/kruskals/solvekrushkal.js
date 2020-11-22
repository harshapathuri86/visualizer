import { PriorityQueue, Node } from './priorityqueue';




export class UnionFind {
    constructor(elements) {
       // Number of disconnected components
       this.count = elements.length;
 
       // Keep Track of connected components
       this.parent = {};
 
       // Initialize the data structure such that all
       // elements have themselves as parents
       elements.forEach(e => (this.parent[parseInt(e)] = parseInt(e)));
    }
 
    union(a, b) {
       let rootA = this.find(a);
       let rootB = this.find(b);
 
       // Roots are same so these are already connected.
       if (parseInt(rootA) === parseInt(rootB)) return;
 
       // Always make the element with smaller root the parent.
       if (parseInt(rootA)< parseInt(rootB)) {
          if (this.parent[b] !== b) this.union(this.parent[b], a);
          this.parent[b] = this.parent[a];
       } else {
          if (this.parent[a] !== a) this.union(this.parent[a], b);
          this.parent[a] = this.parent[b];
       }
    }
 
    // Returns final parent of a node
    find(a) {
       while (this.parent[a] !== a) {
          a = this.parent[a];
       }
       return a;
    }
 
    // Checks connectivity of the 2 nodes
    connected(a, b) {
       return this.find(a) === this.find(b);
    }
 }

export function solvePrims(nodes, edges, network) {
    console.log(edges)
    let edgeQueue = new PriorityQueue()
    for (let node in edges) {
        edgeQueue.enqueue(new Node([edges[node].from, edges[node].to,edges[node].id], parseInt(edges[node].label)));
     }
     let node_ids = []
     for(let node in nodes){
        console.log(nodes[node])
        node_ids.push(nodes[node].id)
     }
     let uf = new UnionFind(node_ids);
     // Loop until either we explore all nodes or queue is empty
     while (edgeQueue.values.length>=1) {
        // Get the edge data using destructuring
        let nextEdge = edgeQueue.dequeue();
        //console.log(nextEdge)
        let nodes_pq = nextEdge.value
        //console.log(nodes_pq)
         console.log(uf)
         
        if (!uf.connected(nodes_pq[0], nodes_pq[1])) {
            console.log("Entered")
            network.edges.update({
               id:nodes_pq[2],
               from: nodes_pq[0],
               to: nodes_pq[1],
               color : "blue",
               width : 3,
            })
            network.nodes.update({
               id: nodes_pq[0],
               label: nodes_pq[0],
               color: "green"
            })
            network.nodes.update({
               id: nodes_pq[1],
               label: nodes_pq[1],
               color: "green"
            })
           uf.union(parseInt(nodes_pq[0]), parseInt(nodes_pq[1]));
           console.log(uf)
        }
     }
  
}
