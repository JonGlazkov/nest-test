import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { Auth } from "src/decorators/auth.decorator";
import { AuthService } from "./auth.service";
import { ChangePasswordInput } from "./entity/change-password.input";
import { AuthLoginDTO } from "./entity/login.dto";
import { AuthLoginInput } from "./entity/login.input";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("account")
  @Auth()
  async getAccount(@Headers() headers): Promise<User> {
    return await this.authService.getAccount(
      headers.authorization.split(" ")[1]
    );
  }

  @Post("login")
  async login(@Body() data: AuthLoginInput): Promise<AuthLoginDTO> {
    return await this.authService.login(data);
  }

  @Post("change-password/:id")
  async changePassword(
    @Param("id") id: string,
    @Body() data: ChangePasswordInput
  ): Promise<User> {
    return await this.authService.changePassword(id, data);
  }
}
