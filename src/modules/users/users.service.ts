import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    user.apiKey = crypto.randomBytes(16).toString('hex');
    return this.usersRepository.save(user);
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async findUserByApiKey(apiKey: string) {
    return await this.usersRepository.findOneBy({ apiKey });
  }

  async getUserByJWT(token: string) {
    const data = this.jwtService.decode(token);
    if (typeof data === 'string' || !data.id || typeof data.id !== 'number')
      throw new UnauthorizedException(
        'Something happened with your api token, sign in again',
      );
    const user = await this.usersRepository.findOneBy({ id: data.id });
    return user;
  }
}
