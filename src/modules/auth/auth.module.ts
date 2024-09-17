import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    PrismaClient,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
