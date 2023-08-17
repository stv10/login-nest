import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export default (): TypeOrmModuleOptions => ({
  port: parseInt(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: 'postgres',
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['dist/**/entities/*.entity.js'],
});
