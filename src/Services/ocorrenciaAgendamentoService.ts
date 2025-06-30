import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OcorrenciaAgendamentoService {
  constructor(private readonly serviceDao: OcorrenciaAgendamentoDao) {}

  create( data: Partial<OcorrenciaAgendamento>) {
    return this.serviceDao.create(data);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.serviceDao.findOne(+id);
  }

  update(id: string, data: Partial<OcorrenciaAgendamento>) {
    return this.serviceDao.update(+id, data);
  }

  remove(id: string) {
    return this.serviceDao.remove(+id);
  }
}
