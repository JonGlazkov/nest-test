import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordInput {  
  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  confirmationPassword: string;
}
