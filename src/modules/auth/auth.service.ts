import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { ChangePasswordInput } from "./entity/change-password.input";
import { AuthLoginDTO } from "./entity/login.dto";
import { AuthLoginInput } from "./entity/login.input";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async jwtToken(user: User): Promise<AuthLoginDTO> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login({ email, password }: AuthLoginInput): Promise<AuthLoginDTO> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new NotFoundException("Este usuário não existe");

    if (password !== user.password)
      throw new UnauthorizedException("Credenciais incorretas");

    if (user) return this.jwtToken(user);
  }

  async getAccount(access_token: string): Promise<any> {
    const user = this.jwtService.decode(access_token, { json: true });
    return user;
  }

  async changePassword(id: string, data: ChangePasswordInput): Promise<User> {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) throw new BadRequestException("Este usuário não existe");

    if (data.password !== data.confirmationPassword)
      throw new BadRequestException("As senhas estão diferentes");

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: data.password,
      },
    });
  }
}
