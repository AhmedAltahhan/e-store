/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto} from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { AuthRolesGuard } from './guards/auth-roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  findAll(@Query('page', ParseIntPipe) page: number, @Query('perPage', ParseIntPipe) perPage: number) {
    return this.userService.findAll(page, perPage);
  }

  @Get(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get("ddd")
  @UseGuards(AuthGuard)
  aaaa(@Req() request: any) {
    const payload = request["user"];
    return this.userService.getCurrentUser(payload.id)
  }
  
}
