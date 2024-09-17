import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginInput {
  @ApiProperty({
    example: 'teste@email.com'
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Senha123!'
  })
  @IsString()
  password: string;
}
