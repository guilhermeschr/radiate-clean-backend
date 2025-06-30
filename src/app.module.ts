import { Module } from '@nestjs/common';
import { DiaristaModule } from './Modules/diarista.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './Modules/cliente.module';
import { ServicoModule } from './Modules/servico.module';
import { AgendamentoModule } from './Modules/agendamento.module';
import { OcorrenciaAgendamentoModule } from './Modules/ocorrenciaAgendamento.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    DiaristaModule,
    ClienteModule,
    ServicoModule,
    AgendamentoModule,
    OcorrenciaAgendamentoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
