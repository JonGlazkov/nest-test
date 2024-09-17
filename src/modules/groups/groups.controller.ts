import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { GroupDTO } from "./entity/group-dto";
import { GroupsService } from "./groups.service";

@Controller("groups")
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.groupService.findOne(id);
  }

  @Post()
  async create(@Body() data: GroupDTO) {
    return await this.groupService.create(data);
  }

  @Put(":id")
  async update(@Param("id") id: string, data: GroupDTO) {
    return await this.groupService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.groupService.delete(id);
  }
}
