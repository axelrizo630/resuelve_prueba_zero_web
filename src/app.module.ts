import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialCalculationsModule } from './modules/financial-calculations/financial-calculations.module';
import { ChuckNorrisJokesProxyModule } from './modules/chuck-norris-jokes-proxy/chuck-norris-jokes-proxy.module';

@Module({
  imports: [FinancialCalculationsModule, ChuckNorrisJokesProxyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
