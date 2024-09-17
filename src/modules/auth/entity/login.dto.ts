import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDTO {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  user: Partial<User>;
}
