import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diarista } from '../Entities/Diarista.entity';

@Injectable()
export class DiaristaDao {
  constructor(
    @InjectRepository(Diarista)
    private diaristaRepository: Repository<Diarista>,
  ) {}

  create(data: Partial<Diarista>) {
    const diarista = this.diaristaRepository.create(data);
    return this.diaristaRepository.save(diarista);
  }

  findAll() {
    return this.diaristaRepository.find();
  }

  findOne(id: number) {
    return this.diaristaRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Diarista>) {
    return this.diaristaRepository.update(id, data);
  }

  remove(id: number) {
    return this.diaristaRepository.delete(id);
  }
}
