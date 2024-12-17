/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Roles } from 'src/user/decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantService.create(createVariantDto);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number, @Query('perPage', ParseIntPipe) perPage: number) {
    return this.variantService.findAll(page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(+id, updateVariantDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  remove(@Param('id') id: string) {
    return this.variantService.remove(+id);
  }
}
