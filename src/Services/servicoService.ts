import { ServicoDao } from '../Daos/servicoDao';
import { Servico } from '../Entities/Servico.Entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicoService {
  constructor(private readonly serviceDao: ServicoDao) {}

  create(data: Partial<Servico>) {
    return this.serviceDao.create(data);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.serviceDao.findOne(+id);
  }

  update(id: string, data: Partial<Servico>) {
    return this.serviceDao.update(+id, data);
  }

  remove(id: string) {
    return this.serviceDao.remove(+id);
  }
}
