import { ClienteDao } from '../Daos/clienteDao';
import { Cliente } from '../Entities/Cliente.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService {
  constructor(private readonly serviceDao: ClienteDao) {}

  create( data: Partial<Cliente>) {
    return this.serviceDao.create(data);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.serviceDao.findOne(+id);
  }

  update(id: string, data: Partial<Cliente>) {
    return this.serviceDao.update(+id, data);
  }

  remove(id: string) {
    return this.serviceDao.remove(+id);
  }
}
