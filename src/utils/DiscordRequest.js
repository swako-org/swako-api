import fetch from 'node-fetch';

const BASE_URL = 'https://discordapp.com/api/v6';

const SWAKO_GUILD = '694020760381161483';

class DiscordRequest {
  static getSwakoGuild() {
    return this.request(`/guilds/${SWAKO_GUILD}`);
  }

  static getSwakoMembers() {
    return this.generateSwakoMembersRequest().then(this.handleMembers);
  }

  static generateSwakoMembersRequest(after = 0) {
    return DiscordRequest.request(`/guilds/${SWAKO_GUILD}/members`, {
      limit: 1000,
      after,
    });
  }

  static request(endpoint, params) {
    const qParams = new URLSearchParams(params).toString();

    return fetch(`${BASE_URL}${endpoint}?${qParams}`, {
      headers: {
        'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  }

  static async handleMembers(members) {
    const fullMembers = [...members];

    if (members.length === 1000) {
      let lastUser = members.pop().user.id;
      for (;;) {
        const request = await this.generateSwakoMembersRequest(lastUser);

        fullMembers.push(...request);

        if (!request.length) break;

        lastUser = request.pop().user.id;
      }
    }

    return fullMembers;
  }
}

export default DiscordRequest;
