import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Cliente } from '../Entities/Cliente.entity';
import { ClienteService } from '../Services/clienteService';
import { OcorrenciaAgendamentoService } from '../Services/ocorrenciaAgendamentoService';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';

@Controller('ocorrenciaAgendamento')
export class OcorrenciaAgendamentoController {
  constructor(private readonly service: OcorrenciaAgendamentoService) {}

  @Post()
  create(@Body() data: Partial<OcorrenciaAgendamento>) {
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
  update(@Param('id') id: string, @Body() data: Partial<OcorrenciaAgendamento>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
