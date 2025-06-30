import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Agendamento } from './Agentamento.entity'; // Importe a entidade Agendamento
import { Servico } from './Servico.Entity';
import { OcorrenciaStatus } from '../Enum/OcorrenciaStatusEnum'; // Importe a entidade Servico (se houver)

@Entity('ocorrencias_agendamento') // Nome da tabela no banco de dados
export class OcorrenciaAgendamento {
  @PrimaryGeneratedColumn()
  id: number;

  // Relacionamento ManyToOne com Agendamento
  // Muitas ocorrências pertencem a um único agendamento
  @ManyToOne(() => Agendamento, (agendamento) => agendamento.ocorrencias, { nullable: false })
  @JoinColumn({ name: 'agendamento_id' }) // Define o nome da coluna de chave estrangeira
  agendamento: Agendamento;

  @Column({ type: 'date', nullable: false }) // Data da ocorrência
  data: Date;

  @Column({ default: false }) // Indica se é meia diária (true) ou diária inteira (false)
  meia_diaria: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Valor extra para a ocorrência
  valor_extra: number | null;

  @Column({
    type: 'enum',
    enum: OcorrenciaStatus,
    default: OcorrenciaStatus.AGENDADO, // Status inicial
    nullable: false,
  })
  status: OcorrenciaStatus;

  // Relacionamento ManyToOne com Servico (se um serviço específico for associado à ocorrência)
  // Uma ocorrência pode ter um serviço específico associado
  @ManyToOne(() => Servico, (servico) => servico.ocorrencias, { nullable: true }) // Assumindo que um serviço pode ter várias ocorrências
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  // Você pode adicionar outras colunas conforme necessário, como:
  // @Column({ type: 'time', nullable: true })
  // hora_inicio: string;
  //
  // @Column({ type: 'time', nullable: true })
  // hora_fim: string;
}
