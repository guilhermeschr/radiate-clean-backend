import dayjs from 'dayjs';
import { AgendamentoDao } from '../Daos/agendamentoDao';
import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';
import { Agendamento } from '../Entities/Agentamento.entity';
import { OcorrenciaAgendamento } from '../Entities/OcorrenciaAgendamento.entity';
import { Servico } from '../Entities/Servico.Entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgendamentoDto } from '../Dtos/createAgendamentoDto';
import { OcorrenciaStatus } from '../Enum/OcorrenciaStatusEnum';
import { FrequenciaAgendamentoEnum } from '../Enum/FrequenciaOcorrenciaEnum';
import { ClienteService } from './clienteService';
import { ServicoService } from './servicoService';

@Injectable()
export class AgendamentoService {
  constructor(
    private readonly agendamentoDao: AgendamentoDao,
    private readonly ocorrenciaAgendamentoDao: OcorrenciaAgendamentoDao,
    private readonly clienteService: ClienteService,
    private readonly servicoService: ServicoService,
  ) {}

  /**
   * Cria um novo agendamento e gera suas ocorrências.
   * @param createAgendamentoDto Dados para criar o agendamento.
   * @returns O agendamento criado.
   */
  async create(
    createAgendamentoDto: CreateAgendamentoDto,
  ): Promise<Agendamento> {
    const {
      clienteId,
      data_inicio,
      data_fim,
      frequencia,
      servicoId,
      meia_diaria,
      valor_extra,
    } = createAgendamentoDto;

    // Validações
    const cliente = await this.clienteService.verificaCliente(clienteId);
    const servico = await this.servicoService.verificaServico(servicoId);
    this.validaFrequencia(frequencia);

    const parsedDataInicio = dayjs(data_inicio).startOf('day').toDate();
    const parsedDataFim = dayjs(data_fim).endOf('day').toDate();

    if (parsedDataInicio > parsedDataFim) {
      throw new BadRequestException(
        'A data de início não pode ser posterior à data de fim.',
      );
    }

    const agendamentoData: Partial<Agendamento> = {
      cliente: cliente,
      data_inicio: parsedDataInicio,
      data_fim: parsedDataFim,
      frequencia: frequencia as FrequenciaAgendamentoEnum,
      removido: false,
    };
    const AgendamentoSalvado =
      await this.agendamentoDao.create(agendamentoData);

    await this.generateOcorrencias(
      AgendamentoSalvado,
      servico,
      meia_diaria,
      valor_extra,
    );

    return AgendamentoSalvado;
  }

  /**
   * Gera as ocorrências de agendamento com base na frequência e período.
   * @param agendamento O agendamento pai.
   * @param servico O serviço associado às ocorrências.
   * @param meia_diaria Indica se a ocorrência é de meia diária.
   * @param valor_extra Valor extra para a ocorrência.
   */
  private async generateOcorrencias(
    agendamento: Agendamento,
    servico: Servico,
    meia_diaria: boolean,
    valor_extra?: number,
  ) {
    const ocorrenciasParaCriar: Partial<OcorrenciaAgendamento>[] = [];
    const dataAtualGeracao = agendamento.data_inicio;
    const dataFinal = agendamento.data_fim;

    // Loop para gerar ocorrências
    while (true) {
      if (dataAtualGeracao > dataFinal) {
        break;
      }

      ocorrenciasParaCriar.push({
        agendamento: agendamento,
        data: new Date(dataAtualGeracao),
        meia_diaria: meia_diaria,
        valor_extra: valor_extra || null,
        status: OcorrenciaStatus.AGENDADO,
        servico: servico,
      });

      if (agendamento.frequencia === FrequenciaAgendamentoEnum.SEMANAL) {
        dataAtualGeracao.setDate(dataAtualGeracao.getDate() + 7);
      } else if (
        agendamento.frequencia === FrequenciaAgendamentoEnum.QUINZENAL
      ) {
        dataAtualGeracao.setDate(dataAtualGeracao.getDate() + 14);
      } else if (agendamento.frequencia === FrequenciaAgendamentoEnum.MENSAL) {
        dataAtualGeracao.setMonth(dataAtualGeracao.getMonth() + 1);
      } else {
        break;
      }
    }

    if (ocorrenciasParaCriar.length > 0) {
      await this.ocorrenciaAgendamentoDao.createMany(ocorrenciasParaCriar);
    }
  }

  findAll() {
    return this.agendamentoDao.findAllComOcorrencias();
  }

  findOne(id: string) {
    return this.verificaAgendamento(+id);
  }

  async update(id: string, data: Partial<Agendamento>) {
    await this.verificaAgendamento(+id);

    const result = await this.agendamentoDao.update(+id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Agendamento com ID ${id} não encontrado para atualização.`,
      );
    }

    return this.agendamentoDao.findOne(+id);
  }

  async remove(id: string) {
    await this.verificaAgendamento(+id);
    return this.agendamentoDao.remove(+id);
  }

  /**
   * Verifica se a frequência é válida dentro do enum FrequenciaAgendamento.
   * Lança BadRequestException se inválida.
   */
  validaFrequencia(frequencia: string | undefined) {
    if (
      frequencia &&
      !Object.values(FrequenciaAgendamentoEnum).includes(
        frequencia as FrequenciaAgendamentoEnum,
      )
    ) {
      throw new BadRequestException(
        `Frequência inválida: ${frequencia}. Valores permitidos: ${Object.values(FrequenciaAgendamentoEnum).join(', ')}`,
      );
    }
  }

  async verificaAgendamento(agendamentoId: number): Promise<Agendamento> {
    const agendamento = await this.agendamentoDao.findOne(agendamentoId);
    if (!agendamento) {
      throw new NotFoundException(
        `Agendamento com ID ${agendamentoId} não encontrado.`,
      );
    }
    return agendamento;
  }
}
