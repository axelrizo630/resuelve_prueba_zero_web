import { Module } from '@nestjs/common';
import { ExpressApiKeysTokenLimitRequests } from './middleware/api-keys.express.token-limit-requests';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [ExpressApiKeysTokenLimitRequests],
  exports: [ExpressApiKeysTokenLimitRequests],
  imports: [UsersModule],
})
export class ApiKeysModule {}
