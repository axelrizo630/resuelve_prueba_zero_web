import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  decodeToken(token: string) {
    const tokenFormatted = token.split(' ')[1];
    const data = this.jwtService.decode(tokenFormatted);

    const isNotIdValid =
      !data ||
      typeof data === 'string' ||
      !data.id ||
      typeof data.id !== 'number';

    const isNotUsernameValid =
      !data ||
      typeof data === 'string' ||
      !data.username ||
      typeof data.username !== 'string';

    if (isNotIdValid || isNotUsernameValid)
      throw new UnauthorizedException(
        'Something happened with your api token, sign in again',
      );

    return data as { id: number; username: string };
  }
}
