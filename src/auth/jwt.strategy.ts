import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './dto/payload.dto';
import jwtConfig from './jwt.config';
import { SendUserDTO } from 'src/user/dto/send-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig().secret,
    });
  }

  async validate(payload: Payload): Promise<SendUserDTO> {
    return {
      id: payload.sub,
      username: payload.username,
      firstName: payload.firstName,
      isActive: payload.isActive,
      lastName: payload.lastName,
    };
  }
}
