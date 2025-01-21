import { IsString, IsEmail, IsOptional, IsEnum, Matches } from 'class-validator';

export class CreateClientDto {
  @IsString()
  fullName: string;

  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos numéricos' })
  cpf: string;

  @IsEmail()
  email: string;

  @IsEnum(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], { message: 'Cor inválida' })
  preferredColor: string;

  @IsOptional()
  @IsString()
  observations?: string;
}
