import { ServicoDao } from '../Daos/servicoDao';
import { Servico } from '../Entities/Servico.Entity';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    return this.verificaServico(+id);
  }

  async update(id: string, data: Partial<Servico>) {
    await this.verificaServico(+id);

    const result = await this.serviceDao.update(+id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Serviço com ID ${id} não encontrado para atualização.`,
      );
    }

    return this.serviceDao.findOne(+id);
  }

  async remove(id: string) {
    await this.verificaServico(+id);
    return this.serviceDao.remove(+id);
  }

  /**
   * Valida e retorna um serviço pelo ID. Lança exceção se não encontrado.
   */
  async verificaServico(id: number): Promise<Servico> {
    const servico = await this.serviceDao.findOne(id);
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
    }
    return servico;
  }
}
