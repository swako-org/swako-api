import Controller from '../structures/Controller';

import DiscordRequest from '../utils/DiscordRequest';

const FRONT_END_ROLE = '695439885578010634';
const BACK_END_ROLE = '695370283141431447';

class DeveloperController extends Controller {
  load(route) {
    route.get('/', async (_, res) => {
      const members = await DiscordRequest.getSwakoMembers().then(result =>
        result.filter(member =>
          member.roles.some(role =>
            [FRONT_END_ROLE, BACK_END_ROLE].includes(role),
          ),
        ),
      );

      return res.json({
        frontEnd: members.filter(m => m.roles.includes(FRONT_END_ROLE)),
        backEnd: members.filter(m => m.roles.includes(BACK_END_ROLE)),
      });
    });
  }
}

export default new DeveloperController();
