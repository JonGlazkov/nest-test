import { Module } from "@nestjs/common";
import { EnvModuleConfig } from "./env/env.module";

@Module({
  imports: [EnvModuleConfig],
})
export class ConfigModule {}
