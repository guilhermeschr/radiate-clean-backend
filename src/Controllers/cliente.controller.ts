import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Cliente } from '../Entities/Cliente.entity';
import { ClienteService } from '../Services/clienteService';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @Post()
  create(@Body() data: Partial<Cliente>) {
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
  update(@Param('id') id: string, @Body() data: Partial<Cliente>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
