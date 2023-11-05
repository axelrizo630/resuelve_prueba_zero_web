import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: CreateUserDto) {
    const user = await this.userService.findOneByUsername(body.username);
    if (!user)
      throw new BadRequestException(
        `No exist ${body.username} in our database`,
      );

    const isPasswordValid = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Password is invalid');

    const payload = {
      token: this.jwtService.sign({
        username: user.username,
        id: user.id,
      }),
    };
    return payload;
  }

  async register(body: CreateUserDto) {
    const user = await this.userService.findOneByUsername(body.username);
    if (user) throw new BadRequestException('User already exists');

    const userWithHashedPassword = {
      ...body,
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    };

    const newUser = await this.userService.create(userWithHashedPassword);
    const payload = {
      token: this.jwtService.sign({
        username: newUser.username,
        id: newUser.id,
      }),
    };
    return payload;
  }
}
