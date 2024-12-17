/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private readonly jwtService: JwtService) {
  }
  async create(createUserDto: CreateUserDto) {
    const data = await this.userRepo.save(createUserDto);
    return data;
  }

  findAll(page: number, perPage: number) {
    const data = this.userRepo.find({
      skip: perPage * (page - 1),
      take: perPage,
    });
    return data;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({id:id});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({id:id});
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.password = updateUserDto.password ?? user.password;
    user.type = updateUserDto.type ?? user.type;
    const data = await this.userRepo.save(user);
    return data;
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return `This action removes a #${id} user`;
  }

  async register(registerDto: RegisterDto) {
    const {email, password, name} = registerDto;
    const userFromDb = await this.userRepo.findOne({where: {email}});
    if(userFromDb) throw new BadRequestException("user already exist");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepo.create({email, name, password: hashedPassword});
    const newUser = await this.userRepo.save(user);
    const payload = { id: newUser.id, type: newUser.type};
    const accessToken = await this.jwtService.signAsync(payload);
    return {accessToken};
  }

  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.userRepo.findOne({where: {email}});
    if(!user) throw new BadRequestException("invalid email");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) throw new BadRequestException("invalid password");
    const payload = { id: user.id, type: user.type};
    const accessToken = await this.jwtService.signAsync(payload);
    return {accessToken};
  }

  async getCurrentUser(id: number) {
    const user = await this.userRepo.findOne({ where: {id}});
    if(!user) throw new NotFoundException("user not found");
    return user;
  }
}
