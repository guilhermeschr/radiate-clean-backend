import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Cliente } from '../Entities/Cliente.entity';
import { ClienteService } from '../Services/clienteService';
import { AgendamentoService } from '../Services/agendamentoService';
import { Agendamento } from '../Entities/Agentamento.entity';
import { CreateAgendamentoDto } from '../Dtos/createAgendamentoDto';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly service: AgendamentoService) {}

  @Post()
  create(@Body() data: CreateAgendamentoDto) {
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
  update(@Param('id') id: string, @Body() data: Partial<Agendamento>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
