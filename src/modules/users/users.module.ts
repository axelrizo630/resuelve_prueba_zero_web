import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
