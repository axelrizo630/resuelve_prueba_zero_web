import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('my-api-key')
  @ApiOperation({
    summary: 'Get my API KEY using the JWT provided in the headers',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Bearer JWT provided by the login endpoint',
  })
  @ApiResponse({ status: 200, description: 'The API KEY of the user' })
  @ApiResponse({ status: 401, description: 'An error with the user token' })
  async getMyApiKey(@Headers('authorization') authorization: string) {
    const user = await this.usersService.getUserByJWT(authorization);

    return { apiKey: user.apiKey };
  }
}
