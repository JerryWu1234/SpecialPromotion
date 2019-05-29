
var MyCircularQueue = function(k) {
    this.val = new Array(k)
    this.head = -1
    this.tail = -1
    this.size = k

};

/**
 * Insert an element into the circular queue. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull() === true) {
        return false
    }
    if (this.isEmpty() === true) {
        this.head = 0
    }
    this.tail = (this.tail + 1) % this.size
    this.val[this.tail] = value
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty() === true) {
        return false
    }
    this.val[this.head] = ''
    if (this.head === this.tail) {
        this.head = -1;
        this.tail = -1
        return true
    }
    this.head = (this.head + 1) % this.size

    return true
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty() == true) {
        return -1;
    }
    return this.val[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty() == true) {
        return -1;
    }
    return this.val[this.tail]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.head === -1
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return ((this.tail + 1) % this.size)  === this.head
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */