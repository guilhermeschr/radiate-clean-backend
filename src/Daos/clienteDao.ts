import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diarista } from '../Entities/Diarista.entity';
import { Cliente } from '../Entities/Cliente.entity';

@Injectable()
export class ClienteDao {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(data: Partial<Cliente>) {
    const cliente = this.clienteRepository.create(data);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Cliente>) {
    return this.clienteRepository.update(id, data);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
