import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [PrismaClient],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
