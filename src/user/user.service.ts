import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  private readonly SALT = parseInt(process.env.HASH_SEED);

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      this.SALT,
    );
    const res = await this.usersRepo.save(createUserDto);
    return res;
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: number) {
    return await this.usersRepo
      .createQueryBuilder('user')
      .where('user.id = :idUser', { idUser: id })
      .getOne();
  }

  async findOneByName(name: string) {
    // return this.users.find((x) => x.username == name);
    return await this.usersRepo
      .createQueryBuilder('user')
      .where('user.username = :userName', { userName: name })
      .getOne();
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.usersRepo.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepo
      .createQueryBuilder('user')
      .where('user.id = :idUer', { idUser: id })
      .getOne();
    if (user) {
      return this.usersRepo.remove(user);
    } else {
      return new Error(`User with id: ${id} not found`);
    }
  }
}
