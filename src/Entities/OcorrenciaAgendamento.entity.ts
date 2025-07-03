import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agendamento } from './Agentamento.entity';
import { Servico } from './Servico.Entity';
import { OcorrenciaStatus } from '../Enum/OcorrenciaStatusEnum';

@Entity('ocorrencias_agendamento')
export class OcorrenciaAgendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agendamento, (agendamento) => agendamento.ocorrencias, {
    nullable: false,
  })
  @JoinColumn({ name: 'agendamento_id' })
  agendamento: Agendamento;

  @Column({ type: 'date', nullable: false })
  data: Date;

  @Column({ default: false })
  meia_diaria: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valor_extra: number | null;

  @Column({
    type: 'enum',
    enum: OcorrenciaStatus,
    default: OcorrenciaStatus.AGENDADO,
    nullable: false,
  })
  status: OcorrenciaStatus;

  @ManyToOne(() => Servico, (servico) => servico.ocorrencias, {
    nullable: true,
  })
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;
}
