import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Servico } from '../Entities/Servico.Entity';
import { ServicoService } from '../Services/servicoService';

@Controller('servico')
export class ServicoController {
  constructor(private readonly service: ServicoService) {}

  @Post()
  create(@Body() data: Partial<Servico>) {
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
  update(@Param('id') id: string, @Body() data: Partial<Servico>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
