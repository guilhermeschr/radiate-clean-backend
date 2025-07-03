import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';

@Injectable()
export class OcorrenciaAgendamentoDao {
  constructor(
    @InjectRepository(OcorrenciaAgendamento)
    private OcorrenciaAgendamentoRepository: Repository<OcorrenciaAgendamento>,
  ) {}

  create(data: Partial<OcorrenciaAgendamento>) {
    const ocorrenciaAgendamento =
      this.OcorrenciaAgendamentoRepository.create(data);
    return this.OcorrenciaAgendamentoRepository.save(ocorrenciaAgendamento);
  }

  async createMany(
    data: Partial<OcorrenciaAgendamento>[],
  ): Promise<OcorrenciaAgendamento[]> {
    const ocorrencias = this.OcorrenciaAgendamentoRepository.create(data);
    return this.OcorrenciaAgendamentoRepository.save(ocorrencias);
  }

  async buscarPorPeriodo(
    inicio: Date,
    fim: Date,
  ): Promise<OcorrenciaAgendamento[]> {
    return this.OcorrenciaAgendamentoRepository.find({
      where: {
        data: Between(inicio, fim),
      },
      relations: ['agendamento', 'servico', 'agendamento.cliente'],
      order: {
        data: 'ASC',
      },
    });
  }

  async findAllComAgendamento(): Promise<OcorrenciaAgendamento[]> {
    return this.OcorrenciaAgendamentoRepository.find({
      relations: ['agendamento', 'servico', 'agendamento.cliente'],
      order: {
        data: 'ASC',
      },
    });
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
