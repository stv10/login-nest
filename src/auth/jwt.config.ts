import { JwtModuleOptions } from '@nestjs/jwt';

export default (): JwtModuleOptions => ({
  secret: process.env.JWT_KEY,
  signOptions: { expiresIn: '180d' },
});
