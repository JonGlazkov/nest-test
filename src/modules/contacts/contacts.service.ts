import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import * as xlsx from "xlsx";
import { ContactsDTO } from "./entity/contacts-dto";

@Injectable()
export class ContactsService {
  constructor(private readonly prismaService: PrismaService) {}

  private getFileType(filename: string): string {
    return filename.split(".").pop().toLowerCase();
  }

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

  async createByFile(groupId: string, file: Express.Multer.File) {
    const fileType = this.getFileType(file.originalname);

    if (fileType === "xlsx") {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]);

      const contactsData = worksheet.split("\n").map((row) => {
        const [name, phone] = row.split(",");
        const formattedPhone = parseFloat(phone).toFixed(0); // Converte para número inteiro sem notação científica

        return {
          name,
          phone: formattedPhone.replace(/\D/g, ""),
          groupId,
        };
      });

      await this.prismaService.contacts.createMany({
        data: contactsData,
      });

      return { message: "Contacts created successfully" };
    }

    const contacts = file.buffer.toString().split("\n");
    const contactsData = contacts.map((contact) => {
      const [name, phone] = contact.split(",");
      const formattedPhone = phone?.replace(/\D/g, "");
      return {
        name,
        phone: formattedPhone,
        groupId,
      };
    });
    await this.prismaService.contacts.createMany({
      data: contactsData,
    });
    return { message: "Contacts created successfully" };
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
