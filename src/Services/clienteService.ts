import { ClienteDao } from '../Daos/clienteDao';
import { Cliente } from '../Entities/Cliente.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClienteService {
  constructor(private readonly serviceDao: ClienteDao) {}

  async create(data: Partial<Cliente>) {
    return this.serviceDao.create(data);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.verificaCliente(+id);
  }

  async update(id: string, data: Partial<Cliente>) {
    await this.verificaCliente(+id);

    const result = await this.serviceDao.update(+id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Cliente com ID ${id} não encontrado para atualização.`,
      );
    }

    return this.serviceDao.findOne(+id);
  }

  async remove(id: string) {
    await this.verificaCliente(+id);
    return this.serviceDao.remove(+id);
  }

  /**
   * Busca um cliente por ID e lança exceção se não for encontrado
   */
  async verificaCliente(clienteId: number): Promise<Cliente> {
    const cliente = await this.serviceDao.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }
    return cliente;
  }
}
