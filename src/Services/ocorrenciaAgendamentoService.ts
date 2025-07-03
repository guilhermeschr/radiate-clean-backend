import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';
import { OcorrenciaStatus } from '../Enum/OcorrenciaStatusEnum';

@Injectable()
export class OcorrenciaAgendamentoService {
  constructor(private readonly serviceDao: OcorrenciaAgendamentoDao) {}

  create(data: Partial<OcorrenciaAgendamento>) {
    return this.serviceDao.create(data);
  }

  findAllComAgendamento() {
    return this.serviceDao.findAllComAgendamento();
  }

  /**
   * Retorna as ocorrências de agendamento de um mês específico.
   * @param offsetMes - Quantidade de meses para frente ou para trás em relação ao mês atual (ex: -1, 0, 1).
   */
  async buscarPorMes(offsetMes: number): Promise<OcorrenciaAgendamento[]> {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    //Cria a primeira data do mês desejado
    const dataInicial = new Date(ano, mes + offsetMes, 1);
    //Cria o último momento do mês desejado
    const dataFinal = new Date(ano, mes + offsetMes + 1, 0, 23, 59, 59, 999);

    return this.serviceDao.buscarPorPeriodo(dataInicial, dataFinal);
  }

  findAll() {
    return this.serviceDao.findAll();
  }

  findOne(id: string) {
    return this.verificaOcorrenciaAgendamento(+id);
  }

  async update(id: string, data: Partial<OcorrenciaAgendamento>) {
    await this.verificaOcorrenciaAgendamento(+id);
    this.validaStatusOcorrencia(data.status);

    const result = await this.serviceDao.update(+id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Ocorrência de agendamento com ID ${id} não encontrada para atualização.`,
      );
    }

    return this.serviceDao.findOne(+id);
  }

  async remove(id: string) {
    await this.verificaOcorrenciaAgendamento(+id);
    return this.serviceDao.remove(+id);
  }

  /**
   * Busca uma ocorrência de agendamento por ID e lança exceção se não for encontrada
   */
  async verificaOcorrenciaAgendamento(
    ocorrenciaId: number,
  ): Promise<OcorrenciaAgendamento> {
    const ocorrencia = await this.serviceDao.findOne(ocorrenciaId);
    if (!ocorrencia) {
      throw new NotFoundException(
        `Ocorrência de agendamento com ID ${ocorrenciaId} não encontrada.`,
      );
    }
    return ocorrencia;
  }

  validaStatusOcorrencia(status: string | undefined) {
    if (
      status &&
      !Object.values(OcorrenciaStatus).includes(status as OcorrenciaStatus)
    ) {
      throw new BadRequestException(
        `Status de ocorrência inválido: ${status}. Valores permitidos: ${Object.values(OcorrenciaStatus).join(', ')}`,
      );
    }
  }
}
