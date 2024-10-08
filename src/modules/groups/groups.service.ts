import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { GroupDTO } from "./entity/group-dto";

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.groups.findMany({ include: { contacts: true } });
  }

  async findOne(id: string) {
    return this.prismaService.groups.findFirst({
      where: { id },
      include: { contacts: true },
    });
  }

  async create(data: GroupDTO) {
    return this.prismaService.groups.create({ data });
  }

  async update(id: string, data: GroupDTO) {
    return this.prismaService.groups.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Delete os registros relacionados na tabela contacts
    await this.prismaService.contacts.deleteMany({
      where: {
        groupId: id, // Certifique-se de que o campo `groupId` seja o correto
      },
    });

    // Agora pode deletar o grupo
    return this.prismaService.groups.delete({
      where: { id },
    });
  }
}
