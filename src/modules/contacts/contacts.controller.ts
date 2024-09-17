import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { ContactsDTO } from "./entity/contacts-dto";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }

  @Post("add/:groupId")
  async create(@Param("groupId") groupId: string, @Body() data: ContactsDTO) {
    return this.contactsService.create(groupId, data);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.contactsService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: ContactsDTO) {
    return this.contactsService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.contactsService.remove(id);
  }
}
