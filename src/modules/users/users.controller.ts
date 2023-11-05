import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('my-api-key')
  async getMyApiKey(@Headers('authorization') authorization: string) {
    const user = await this.usersService.getUserByJWT(authorization);

    return { apiKey: user.apiKey };
  }
}
