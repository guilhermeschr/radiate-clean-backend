import dayjs from 'dayjs';
import { AgendamentoDao } from '../Daos/agendamentoDao';
import { OcorrenciaAgendamentoDao } from '../Daos/ocorrenciaAgendamentoDao';
import { Agendamento } from '../Entities/Agentamento.entity';
import { ClienteDao } from '../Daos/clienteDao';
import { ServicoDao } from '../Daos/servicoDao';
import {
  OcorrenciaAgendamento,
  OcorrenciaStatus,
} from '../Entities/OcorrenciaAgendamento.entity';
import { Servico } from '../Entities/Servico.Entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendamentoDto } from '../Dtos/createAgendamentoDto';

@Injectable()
export class AgendamentoService {
  constructor(
    private readonly agendamentoDao: AgendamentoDao,
    private readonly ocorrenciaAgendamentoDao: OcorrenciaAgendamentoDao,
    private readonly clienteDao: ClienteDao, // Injetando ClienteDao para buscar o cliente
    private readonly servicoDao: ServicoDao, // Injetando ServicoDao para buscar o serviço
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

    const cliente = await this.clienteDao.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const servico = await this.servicoDao.findOne(servicoId);
    if (!servico) {
      throw new NotFoundException(
        `Serviço com ID ${servicoId} não encontrado.`,
      );
    }

    const parsedDataInicio = dayjs(data_inicio).startOf('day').toDate();
    const parsedDataFim = dayjs(data_fim).endOf('day').toDate();

    if (parsedDataInicio > parsedDataFim) {
      throw new BadRequestException(
        'A data de início não pode ser posterior à data de fim.',
      );
    }

    // 1. Criar o Agendamento principal
    const agendamentoData: Partial<Agendamento> = {
      cliente: cliente,
      data_inicio: parsedDataInicio,
      data_fim: parsedDataFim,
      frequencia: frequencia, // Garante que seja null se não fornecido
      removido: false,
    };
    const savedAgendamento = await this.agendamentoDao.create(agendamentoData);

    // 2. Gerar e salvar as Ocorrências de Agendamento
    await this.generateOcorrencias(
      savedAgendamento,
      servico,
      meia_diaria,
      valor_extra,
    );

    return savedAgendamento;
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
    const ocorrenciasToCreate: Partial<OcorrenciaAgendamento>[] = [];
    let currentDate = agendamento.data_inicio;
    const endDate = agendamento.data_fim;

    // Loop para gerar ocorrências
    while (true) {
      if (endDate && currentDate > endDate) {
        break; // Sai do loop se a data atual ultrapassar a data de fim
      }

      // Cria a ocorrência para a data atual
      ocorrenciasToCreate.push({
        agendamento: agendamento,
        data: new Date(currentDate), // Clona a data para evitar problemas de referência
        meia_diaria: meia_diaria,
        valor_extra: valor_extra || null,
        status: OcorrenciaStatus.AGENDADO,
        servico: servico,
      });

      // Avança para a próxima data com base na frequência
      if (agendamento.frequencia === 'semanal') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (agendamento.frequencia === 'quinzenal') {
        currentDate.setDate(currentDate.getDate() + 14);
      } else if (agendamento.frequencia === 'mensal') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        // Se não houver frequência (agendamento único), sai do loop após a primeira ocorrência
        break;
      }
    }

    if (ocorrenciasToCreate.length > 0) {
      await this.ocorrenciaAgendamentoDao.createMany(ocorrenciasToCreate);
    }
  }

  findAll() {
    return this.agendamentoDao.findAll();
  }

  findOne(id: string) {
    return this.agendamentoDao.findOne(+id);
  }

  update(id: string, data: Partial<Agendamento>) {
    return this.agendamentoDao.update(+id, data);
  }

  remove(id: string) {
    return this.agendamentoDao.remove(+id);
  }
}
