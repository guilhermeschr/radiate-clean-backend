import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { Agendamento } from '../Entities/Agentamento.entity';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';

@Injectable()
export class OcorrenciaAgendamentoDao {
  constructor(
    @InjectRepository(OcorrenciaAgendamento)
    private OcorrenciaAgendamentoRepository: Repository<OcorrenciaAgendamento>,
  ) {}

  create(data: Partial<OcorrenciaAgendamento>) {
    const ocorrenciaAgendamento = this.OcorrenciaAgendamentoRepository.create(data);
    return this.OcorrenciaAgendamentoRepository.save(ocorrenciaAgendamento);
  }

  async createMany(data: Partial<OcorrenciaAgendamento>[]): Promise<OcorrenciaAgendamento[]> {
    const ocorrencias = this.OcorrenciaAgendamentoRepository.create(data);
    return this.OcorrenciaAgendamentoRepository.save(ocorrencias);
  }

  findAll() {
    return this.OcorrenciaAgendamentoRepository.find();
  }

  findOne(id: number) {
    return this.OcorrenciaAgendamentoRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<OcorrenciaAgendamento>) {
    return this.OcorrenciaAgendamentoRepository.update(id, data);
  }

  remove(id: number) {
    return this.OcorrenciaAgendamentoRepository.delete(id);
  }
}
