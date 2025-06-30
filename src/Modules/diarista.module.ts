import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaristaDao } from '../Daos/diaristaDao';
import { DiaristaController } from '../Controllers/diarista.controller';
import { Diarista } from '../Entities/Diarista.entity';
import { DiaristaService } from '../Services/diaristaSevice';

@Module({
  imports: [TypeOrmModule.forFeature([Diarista])],
  controllers: [DiaristaController],
  providers: [DiaristaService, DiaristaDao],
})
export class DiaristaModule {}
