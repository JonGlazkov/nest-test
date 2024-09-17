import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "./database/prisma.service";
import { JwtStrategy } from "./guards/jwt/jwt.strategy";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { ContactsModule } from "./modules/contacts/contacts.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    AuthModule,
    JwtModule,
    PassportModule,
    UsersModule,
    GroupsModule,
    ContactsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy],
})
export class AppModule {}
