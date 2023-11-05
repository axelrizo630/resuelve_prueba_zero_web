import { Module } from '@nestjs/common';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { UsersModule } from '../users/users.module';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';
import { ExpressApiKeysTokenLimitRequests } from './middleware/api-keys.express.token-limit-requests';

@Module({
  providers: [ExpressApiKeysTokenLimitRequests, ApiKeysService],
  exports: [ExpressApiKeysTokenLimitRequests],
  imports: [UsersModule, JwtTokenModule],
  controllers: [ApiKeysController],
})
export class ApiKeysModule {}
