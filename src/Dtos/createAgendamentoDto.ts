import { IsDateString, IsInt, IsBoolean, IsNumber, IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { OcorrenciaStatus } from '../Enum/OcorrenciaStatusEnum';

export class CreateAgendamentoDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsDateString()
  @IsNotEmpty()
  data_inicio: string; // String para receber do frontend

  @IsDateString()
  @IsNotEmpty()
  data_fim?: string; // String para receber do frontend

  @IsEnum(OcorrenciaStatus, { message: 'Frequência inválida' })
  @IsString()
  frequencia?: 'semanal' | 'quinzenal' | 'mensal'; // Tipagem mais específica

  @IsInt()
  @IsNotEmpty()
  servicoId: number;

  @IsBoolean()
  @IsNotEmpty()
  meia_diaria: boolean;

  @IsOptional()
  @IsNumber()
  valor_extra?: number;
}

