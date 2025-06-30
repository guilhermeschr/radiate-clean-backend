import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { Agendamento } from '../Entities/Agentamento.entity';

@Injectable()
export class AgendamentoDao {
  constructor(
    @InjectRepository(Agendamento)
    private AgendamentoRepository: Repository<Agendamento>,
  ) {}

  create(data: Partial<Cliente>) {
    const agendamento = this.AgendamentoRepository.create(data);
    return this.AgendamentoRepository.save(agendamento);
  }

  findAll() {
    return this.AgendamentoRepository.find();
  }

  findOne(id: number) {
    return this.AgendamentoRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Agendamento>) {
    return this.AgendamentoRepository.update(id, data);
  }

  remove(id: number) {
    return this.AgendamentoRepository.delete(id);
  }
}
