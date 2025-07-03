import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from './Cliente.entity';
import { OcorrenciaAgendamento } from './OcorrenciaAgendamento.entity';
import { FrequenciaAgendamentoEnum } from '../Enum/FrequenciaOcorrenciaEnum';

@Entity('agendamentos')
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, {
    nullable: false,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'date', nullable: false })
  data_inicio: Date;

  @Column({ type: 'date', nullable: false })
  data_fim: Date;

  @Column({
    type: 'enum',
    enum: FrequenciaAgendamentoEnum,
    nullable: false,
  })
  frequencia: FrequenciaAgendamentoEnum;

  @Column({ default: false })
  removido: boolean;

  @OneToMany(
    () => OcorrenciaAgendamento,
    (ocorrencia) => ocorrencia.agendamento,
  )
  ocorrencias: OcorrenciaAgendamento[];
}
