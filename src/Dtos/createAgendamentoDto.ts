import { IsDateString, IsInt, IsBoolean, IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

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

//export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {} // Use PartialType do @nestjs/mapped-types
