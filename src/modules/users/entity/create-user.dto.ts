import { ApiProperty } from "@nestjs/swagger";
import type { User } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO implements Partial<User> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  confirmationPassword: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
