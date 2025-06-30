import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from '../Entities/Servico.Entity';
import { ServicoController } from '../Controllers/servico.controller';
import { ServicoService } from '../Services/servicoService';
import { Diarista } from '../Entities/Diarista.entity';
import { ServicoDao } from '../Daos/servicoDao';

@Module({
  imports: [TypeOrmModule.forFeature([Servico, Diarista])],
  controllers: [ServicoController],
  providers: [ServicoService, ServicoDao],
})
export class ServicoModule {}
