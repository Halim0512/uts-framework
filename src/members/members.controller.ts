import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Menambahkan member baru' })
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan semua member' })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Menampilkan detail member' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengubah data member' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMemberDto,
  ) {
    return this.membersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus member' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.remove(id);
  }
}