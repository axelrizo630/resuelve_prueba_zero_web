import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtTokenService,
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
    const decodedToken = this.jwtService.decodeToken(token);

    const user = await this.usersRepository.findOneBy({ id: decodedToken.id });
    return user;
  }
}
