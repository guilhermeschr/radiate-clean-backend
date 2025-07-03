import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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
  findAllComAgendamento() {
    return this.service.findAllComAgendamento();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('por-mes/:offset')
  async listarPorMes(@Param('offset') offset: number) {
    return this.service.buscarPorMes(Number(offset));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<OcorrenciaAgendamento>,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
