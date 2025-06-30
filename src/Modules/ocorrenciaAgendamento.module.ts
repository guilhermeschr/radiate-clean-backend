import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { Diarista } from '../Entities/Diarista.entity';
import { Servico } from '../Entities/Servico.Entity';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';
import { OcorrenciaAgendamentoService } from '../Services/ocorrenciaAgendamentoService';
import { OcorrenciaAgendamentoController } from '../Controllers/ocorrenciaAgendamento.controller';
import { Agendamento } from '../Entities/Agentamento.entity';
import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Diarista, Servico, OcorrenciaAgendamento, Agendamento])],
  controllers: [OcorrenciaAgendamentoController],
  providers: [OcorrenciaAgendamentoService, OcorrenciaAgendamentoDao],
})
export class OcorrenciaAgendamentoModule {}
