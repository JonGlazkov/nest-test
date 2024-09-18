import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDTO } from "./entity/create-user.dto";
import { PaginationUserDTO } from "./entity/pagination-user.dto";
import { UpdateUserDTO } from "./entity/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    email,
    password,
    name,
  }: CreateUserDTO): Promise<Partial<User>> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new BadRequestException("User already exists");
    }

    const {
      id: createdId,
      email: createdEmail,
      name: createdName,
    } = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return {
      id: createdId,
      email: createdEmail,
      name: createdName,
    };
  }

  async findAll({
    email,
    limit = 10,
    name,
    page = 1,
  }: PaginationUserDTO): Promise<{ data: User[]; count: number }> {
    const usersCount = await this.prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : {},
        email: email ? { contains: email } : {},
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : {},
        email: email ? { contains: email } : {},
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: users,
      count: usersCount.length,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
