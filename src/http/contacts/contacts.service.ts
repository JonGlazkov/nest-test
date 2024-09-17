import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ContactsDTO } from "./entity/contacts-dto";

@Injectable()
export class ContactsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(groupId: string, data: ContactsDTO) {
    return this.prismaService.contacts.create({
      data: {
        name: data.name,
        phone: data.phone,
        group: {
          connect: {
            id: groupId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.contacts.findMany({ include: { group: true } });
  }

  async findOne(id: string) {
    return this.prismaService.contacts.findUnique({
      where: {
        id,
      },
      include: { group: true },
    });
  }

  async update(id: string, data: ContactsDTO) {
    return this.prismaService.contacts.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prismaService.contacts.delete({
      where: {
        id,
      },
    });
  }
}
