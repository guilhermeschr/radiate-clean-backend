import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { ClienteController } from '../Controllers/cliente.controller';
import { Diarista } from '../Entities/Diarista.entity';
import { ClienteService } from '../Services/clienteService';
import { ClienteDao } from '../Daos/clienteDao';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Diarista])],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteDao],
})
export class ClienteModule {}
