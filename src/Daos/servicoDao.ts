import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diarista } from '../Entities/Diarista.entity';
import { Cliente } from '../Entities/Cliente.entity';
import { Servico } from '../Entities/Servico.Entity';

@Injectable()
export class ServicoDao {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  create(data: Partial<Servico>) {
    const servico = this.servicoRepository.create(data);
    return this.servicoRepository.save(servico);
  }

  findAll() {
    return this.servicoRepository.find();
  }

  findOne(id: number) {
    return this.servicoRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Servico>) {
    return this.servicoRepository.update(id, data);
  }

  remove(id: number) {
    return this.servicoRepository.delete(id);
  }
}
