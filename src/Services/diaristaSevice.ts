import { DiaristaDao } from '../Daos/diaristaDao';
import { Diarista } from '../Entities/Diarista.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    return this.verificaDiarista(+id);
  }

  async update(id: string, data: Partial<Diarista>) {
    await this.verificaDiarista(+id);

    const result = await this.serviceDao.update(+id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Diarista com ID ${id} não encontrada para atualização.`,
      );
    }

    return this.serviceDao.findOne(+id);
  }

  async remove(id: string) {
    await this.verificaDiarista(+id);
    return this.serviceDao.remove(+id);
  }

  /**
   * Busca uma diarista por ID e lança exceção se não for encontrada
   */
  async verificaDiarista(diaristaId: number): Promise<Diarista> {
    const diarista = await this.serviceDao.findOne(diaristaId);
    if (!diarista) {
      throw new NotFoundException(
        `Diarista com ID ${diaristaId} não encontrada.`,
      );
    }
    return diarista;
  }
}
