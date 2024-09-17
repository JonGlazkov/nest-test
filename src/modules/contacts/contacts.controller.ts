import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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

  @Post("upload/:groupId")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Param("groupId") groupId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 8 * 1024 * 1024 /* 8MB */ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.contactsService.createByFile(groupId, file);
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
