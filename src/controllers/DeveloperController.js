import Controller from '../structures/Controller';

class DeveloperController extends Controller {
  load(route) {
    route.get('/', (req, res) => {
      return res.json({
        front: [],
        back: [],
      });
    });
  }
}

export default new DeveloperController();
