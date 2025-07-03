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
import { Agendamento } from './Agentamento.entity'; // Ajuste o caminho conforme sua estrutura

@Entity('clientes') // Nome da tabela no banco de dados
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  telefone: string;

  @Column({ nullable: true })
  endereco: string;

  @Column({ nullable: true })
  preferencias: string;

  @ManyToOne(() => Diarista, (diarista) => diarista.clientes, {
    nullable: false,
  })
  @JoinColumn({ name: 'diarista_id' })
  diarista: Diarista;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente)
  agendamentos: Agendamento[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
