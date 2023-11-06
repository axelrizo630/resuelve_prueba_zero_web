import { Controller, Get, Headers } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api-keys')
@ApiTags('API Keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get('remaining-requests')
  @ApiOperation({
    summary: 'Get my remaining requests using the JWT provided in the headers',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Bearer JWT provided by the login endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'The remaining requests of the user',
  })
  async getMyRemainingRequests(
    @Headers('authorization') authorization: string,
  ) {
    return await this.apiKeysService.getRemainingRequests(authorization);
  }
}
