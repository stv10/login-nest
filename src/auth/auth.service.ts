import { Injectable } from '@nestjs/common';
import { SendUserDTO } from 'src/user/dto/send-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<SendUserDTO> {
    const user = await this.usersService.findOneByName(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch && user.isActive) {
      const result: SendUserDTO = { ...user };
      return result;
    }
    return null;
  }

  async login(user: SendUserDTO) {
    const payload: Payload = {
      username: user.username,
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
