import { Controller, Get, Headers } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get('remaining-requests')
  async getMyRemainingRequests(
    @Headers('authorization') authorization: string,
  ) {
    return await this.apiKeysService.getRemainingRequests(authorization);
  }
}
