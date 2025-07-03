import {
  IsDateString,
  IsInt,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { FrequenciaAgendamentoEnum } from '../Enum/FrequenciaOcorrenciaEnum';

export class CreateAgendamentoDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsDateString()
  @IsNotEmpty()
  data_inicio: string;

  @IsDateString()
  @IsNotEmpty()
  data_fim?: string;

  @IsEnum(FrequenciaAgendamentoEnum, {
    message: 'Frequência inválida. Use: semanal, quinzenal ou mensal.',
  })
  @IsString()
  frequencia?: FrequenciaAgendamentoEnum;

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
