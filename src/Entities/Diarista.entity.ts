import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Cliente } from './Cliente.entity';
import { Servico } from './Servico.Entity';

@Entity('diaristas')
export class Diarista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  token: string;

  @Column({ name: 'horario_notificacao' })
  horarioNotificacao: string;

  @OneToMany(() => Cliente, (cliente) => cliente.diarista)
  clientes: Cliente[];

  @OneToMany(() => Servico, (servico) => servico.diarista)
  servicos: Servico[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
