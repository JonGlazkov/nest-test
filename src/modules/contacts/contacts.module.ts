import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { ContactsController } from "./contacts.controller";
import { ContactsService } from "./contacts.service";

@Module({
  imports: [PrismaClient],
  controllers: [ContactsController],
  providers: [ContactsService, PrismaService],
})
export class ContactsModule {}
