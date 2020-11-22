class Node {
    constructor(value, distance) {
        this.value = value
        this.distance = distance
    }
}

class PriorityQueue {

    constructor() {
        this.values = []
    }

    //helper method that swaps the values and two indexes of an array
    swap(index1, index2) {
        let temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
        return this.values;
    }
    //helper methods that bubbles up values from end
    bubbleUp() {
        //get index of inserted element
        let index = this.values.length - 1
        //loop while index is not 0 or element no longer needs to bubble
        while (index > 0) {
            //get parent index via formula
            let parentIndex = Math.floor((index - 1) / 2);
            //if values is greater than parent, swap the two
            if (this.values[parentIndex].distance > this.values[index].distance) {
                //swap with helper method
                this.swap(index, parentIndex);
                //change current index to parent index
                index = parentIndex;
            } else {
                break;
            }
        }
        return 0;
    }
    // method that pushes new value onto the end and calls the bubble helper
    enqueue(value) {
        this.values.push(value)
        //calculate parent, if parent is greater swap
        //while loop or recurse
        this.bubbleUp();
        return this.values
    }
    has(id) {
        for (let i = 0; i < this.values.length; i++) {
            // console.log("has check", this.values[i], node);
            if (this.values[i].value === id) return true;
        }
        return false;
    }
    bubbleDown() {
        let parentIndex = 0;
        const length = this.values.length;
        const elementPriority = this.values[0].distance;
        //loop breaks if no swaps are needed
        while (true) {
            //get indexes of child elements by following formula
            let leftChildIndex = (2 * parentIndex) + 1;
            let rightChildIndex = (2 * parentIndex) + 2;
            let leftChildPriority, rightChildPriority;
            let indexToSwap = null;
            // if left child exists, and is greater than the element, plan to swap with the left child index
            if (leftChildIndex < length) {
                leftChildPriority = this.values[leftChildIndex].distance
                if (leftChildPriority < elementPriority) {
                    indexToSwap = leftChildIndex;
                }
            }
            //if right child exists
            if (rightChildIndex < length) {
                rightChildPriority = this.values[rightChildIndex].distance

                if (
                    //if right child is greater than element and there are no plans to swap
                    (rightChildPriority < elementPriority && indexToSwap === null) ||
                    //OR if right child is greater than left child and there ARE plans to swap
                    (rightChildPriority < leftChildPriority && indexToSwap !== null)) {
                    //plan to swap with the right child
                    indexToSwap = rightChildIndex
                }
            }
            //if there are no plans to swap, break out of the loop
            if (indexToSwap === null) {
                break;
            }
            //swap with planned element
            this.swap(parentIndex, indexToSwap);
            //starting index is now index that we swapped with
            parentIndex = indexToSwap;
        }
    }
    replace(node, dist) {
        let index = -1;
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].value === node) {
                index = i;
                break ;
            }
        }
        console.log("array pq", this.values, node);
        if (index < 0) return -1;
        this.values[index].distance = dist;
        while (index >= 1) {
            //get parent index via formula
            let parentIndex = Math.floor((index - 1) / 2);
            //if values is greater than parent, swap the two
            if (this.values[parentIndex].distance > this.values[index].distance) {
                //swap with helper method
                this.swap(index, parentIndex);
                //change current index to parent index
                index = parentIndex;
            } else {
                break;
            }
        }
        return 0;
    }
    dequeue() {
        //swap first and last element
        this.swap(0, this.values.length - 1);
        //pop max value off of values
        let poppedNode = this.values.pop();
        //re-adjust heap if length is greater than 1
        if (this.values.length > 1) {
            this.bubbleDown();
        }

        return poppedNode;
    }
}
export { PriorityQueue, Node };