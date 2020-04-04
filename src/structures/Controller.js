import { Router } from 'express';

class Controller {
  constructor() {
    this.route = Router();
  }

  run() {
    this.load(this.route);
    return this.route;
  }

  load() {}
}

export default Controller;
