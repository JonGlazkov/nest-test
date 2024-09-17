import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";

@Module({
  imports: [PrismaClient],
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService],
})
export class GroupsModule {}
