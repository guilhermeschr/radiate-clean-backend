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

@Entity()
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
  horarioNotificacao: String;

  @OneToMany(() => Cliente, (cliente) => cliente.diarista)
  clientes: Cliente[]; // Uma diarista pode ter vários clientes

  // Nova relação: Uma diarista pode ter vários serviços
  @OneToMany(() => Servico, (servico) => servico.diarista)
  servicos: Servico[];

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
