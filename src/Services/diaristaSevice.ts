import { DiaristaDao } from '../Daos/diaristaDao';
import { Diarista } from '../Entities/Diarista.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiaristaService {
  constructor(private readonly serviceDao: DiaristaDao) {}

  create(data: Partial<Diarista>) {
    return this.serviceDao.create(data);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.serviceDao.findOne(+id);
  }

  update(id: string, data: Partial<Diarista>) {
    return this.serviceDao.update(+id, data);
  }

  remove(id: string) {
    return this.serviceDao.remove(+id);
  }
}
