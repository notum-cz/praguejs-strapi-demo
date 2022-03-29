/**
 * Class for containg models uid to process.
 * Saves processed models so none is processed twice.
 */
class ModelQueue {
  /**
   * 
   * @param {string[]} contentTypes 
   */
  constructor(contentTypes) {
    this.enqueuedModels = new Map();
    this.modelUidsQueue = contentTypes;
    this.modelUidsQueue.forEach((modelUid) => {
      this.enqueuedModels.set(modelUid, true);
    });
  }
  /**
   * Pops model uid from the queue.
   * @returns {string} Model uid
   */
  pop = () => {
    return this.modelUidsQueue.pop();
  };
  /**
   * Adds model uid to queue. If already processed does nothing.
   * @param {string} modelUid Model uid to add
   */
  enqueue = (modelUid) => {
    if (!this.enqueuedModels.has(modelUid)) {
      this.enqueuedModels.set(modelUid, true);
      this.modelUidsQueue.push(modelUid);
    }
  };
}

module.exports = ModelQueue;
