import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Do login and get a JWT',
  })
  @ApiResponse({
    status: 200,
    description: 'The token to use in the headers',
  })
  @ApiResponse({
    status: 400,
    description: 'Something happened with the login',
  })
  login(@Body() body: CreateUserDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Do register and get a JWT',
  })
  @ApiResponse({
    status: 200,
    description: 'The token to use in the headers',
  })
  @ApiResponse({
    status: 400,
    description: 'Something happened with the register',
  })
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
