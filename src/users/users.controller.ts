import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()

  @Get()
  findAll( query: PaginationDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() { id }: IsValidObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.usersService.remove(+id);
  }
}
