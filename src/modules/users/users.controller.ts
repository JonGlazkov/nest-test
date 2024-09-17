import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDTO } from "./entity/create-user.dto";
import { PaginationUserDTO } from "./entity/pagination-user.dto";
import { UpdateUserDTO } from "./entity/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(
    @Query() query?: PaginationUserDTO
  ): Promise<{ data: User[]; count: number }> {
    return await this.userService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<Partial<User>> {
    return await this.userService.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: UpdateUserDTO
  ): Promise<User> {
    return await this.userService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<User> {
    return await this.userService.delete(id);
  }
}
