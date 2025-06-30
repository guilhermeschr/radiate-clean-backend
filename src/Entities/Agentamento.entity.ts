import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from './Cliente.entity'; // Ajuste o caminho conforme sua estrutura
import { OcorrenciaAgendamento } from './OcorrenciaAgendamento.entity'; // Importe a OcorrenciaAgendamento

@Entity('agendamentos') // Nome da tabela no banco de dados
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  // Relacionamento ManyToOne com Cliente
  // Muitos agendamentos podem pertencer a um único cliente
  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, { nullable: false })
  cliente: Cliente; // O documento menciona cliente_id, então precisamos da relação com Cliente

  @Column({ type: 'date', nullable: false }) // Data de início do agendamento (rotina)
  data_inicio: Date;

  @Column({ type: 'date', nullable: false}) // Data de fim do agendamento (rotina) - pode ser nula para agendamentos contínuos
  data_fim: Date;

  @Column({ nullable: false }) // Frequência pode ser nula se for um agendamento único
  frequencia: string; // Ex: 'semanal', 'quinzenal', 'mensal' (conforme a visão geral do sistema)

  @Column({ default: false }) // Indica se o agendamento foi removido (soft delete)
  removido: boolean;

  // Relacionamento OneToMany com OcorrenciaAgendamento
  // Um agendamento pode ter muitas ocorrências (instâncias)
  @OneToMany(() => OcorrenciaAgendamento, (ocorrencia) => ocorrencia.agendamento)
  ocorrencias: OcorrenciaAgendamento[];
}
