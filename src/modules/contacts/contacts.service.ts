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

  private parseContacts(content: string, groupId: string) {
    return content.split("\n").map((row) => {
      const [name, phone] = row.split(",");
      const formattedPhone = parseFloat(phone).toFixed(0).replace(/\D/g, ""); // Converte para número inteiro sem notação científica e remove caracteres não numéricos
      return {
        name,
        phone: formattedPhone,
        groupId,
      };
    });
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
    let content = "";

    if (fileType === "xlsx") {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      content = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    } else {
      content = file.buffer.toString();
    }

    const contactsData = this.parseContacts(content, groupId);
    await this.prismaService.contacts
      .createMany({
        data: contactsData,
      })
      .catch((error) => {
        return { message: "Error creating contacts", error };
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
    await this.prismaService.contacts.delete({
      where: {
        id,
      },
    });
  }
}
