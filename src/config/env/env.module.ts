import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import z from "zod";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: z.object({
        JWT_SECRET: z.string(),
      }),
    }),
  ],
})
export class EnvModuleConfig {}
