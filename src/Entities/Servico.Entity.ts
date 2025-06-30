import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToMany,
} from 'typeorm';
import { Diarista } from './Diarista.entity';
import { OcorrenciaAgendamento } from './OcorrenciaAgendamento.entity'; // Ajuste o caminho conforme sua estrutura

@Entity('servicos') // Nome da tabela no banco de dados
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valorMeiaDiaria: number; // Valor para meia diária

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valorDiaria: number; // Valor para diária inteira

  // Relação ManyToOne com Diarista
  // Muitos serviços podem pertencer a uma única diarista
  @ManyToOne(() => Diarista, (diarista) => diarista.servicos, { nullable: false })
  diarista: Diarista;

  // Nova relação: Um serviço pode estar associado a muitas ocorrências de agendamento
  @OneToMany(() => OcorrenciaAgendamento, (ocorrencia) => ocorrencia.servico)
  ocorrencias: OcorrenciaAgendamento[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
