import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GroupDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
