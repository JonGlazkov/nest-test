import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContactsModule } from "./http/contacts/contacts.module";
import { GroupsModule } from "./http/groups/groups.module";
import { UsersModule } from "./http/users/users.module";

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    ContactsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
