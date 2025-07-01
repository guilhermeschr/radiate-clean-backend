import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToMany, JoinColumn,
} from 'typeorm';
import { Diarista } from './Diarista.entity';
import { Agendamento } from './Agentamento.entity'; // Ajuste o caminho conforme sua estrutura

@Entity('clientes') // Nome da tabela no banco de dados
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  telefone: string;

  @Column({ nullable: true }) // Pode ser nulo
  endereco: string;

  @Column({ nullable: true }) // Pode ser nulo
  preferencias: string;

  @ManyToOne(() => Diarista, (diarista) => diarista.clientes, { nullable: false })
  @JoinColumn({ name: 'diarista_id' })
  diarista: Diarista;

  // Nova relação: Um cliente pode ter muitos agendamentos
  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente)
  agendamentos: Agendamento[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
