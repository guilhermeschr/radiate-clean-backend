import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Diarista } from './Diarista.entity';
import { OcorrenciaAgendamento } from './OcorrenciaAgendamento.entity';

@Entity('servicos')
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_meia_diaria: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_diaria: number;

  @ManyToOne(() => Diarista, (diarista) => diarista.servicos, {
    nullable: false,
  })
  @JoinColumn({ name: 'diarista_id' })
  diarista: Diarista;

  @OneToMany(() => OcorrenciaAgendamento, (ocorrencia) => ocorrencia.servico)
  ocorrencias: OcorrenciaAgendamento[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
