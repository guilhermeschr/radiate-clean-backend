import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { Diarista } from '../Entities/Diarista.entity';
import { Servico } from '../Entities/Servico.Entity';
import { AgendamentoController } from '../Controllers/agendamento.controller';
import { AgendamentoService } from '../Services/agendamentoService';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';
import { AgendamentoDao } from '../Daos/agendamentoDao';
import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';
import { ClienteDao } from '../Daos/clienteDao';
import { ServicoDao } from '../Daos/servicoDao';
import { Agendamento } from '../Entities/Agentamento.entity';
import { ClienteService } from '../Services/clienteService';
import { ServicoService } from '../Services/servicoService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agendamento,
      Cliente,
      Diarista,
      Servico,
      OcorrenciaAgendamento,
    ]),
  ],
  controllers: [AgendamentoController],
  providers: [
    AgendamentoService,
    AgendamentoDao,
    OcorrenciaAgendamentoDao,
    ClienteDao,
    ServicoDao,
    ClienteService,
    ServicoService,
  ],
})
export class AgendamentoModule {}
