import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Diarista } from '../Entities/Diarista.entity';
import { DiaristaService } from '../Services/diaristaSevice';

@Controller('diarista')
export class DiaristaController {
  constructor(private readonly service: DiaristaService) {}

  @Post()
  create(@Body() data: Partial<Diarista>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Diarista>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
