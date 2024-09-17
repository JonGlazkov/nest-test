import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class PaginationUserDTO {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;
}
