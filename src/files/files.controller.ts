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

import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Menambahkan metadata file' })
  create(@Body() dto: CreateFileDto) {
    return this.filesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan semua file' })
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Menampilkan detail file' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengubah metadata file' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFileDto,
  ) {
    return this.filesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus metadata file' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }
}