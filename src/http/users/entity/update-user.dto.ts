import { ApiProperty } from "@nestjs/swagger";
import type { User } from "@prisma/client";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO implements Partial<User> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;
}
