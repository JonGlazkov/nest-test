import { ApiProperty } from "@nestjs/swagger";
import type { User } from "@prisma/client";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDTO implements Partial<User> {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @ApiProperty()
  password: string;
}
