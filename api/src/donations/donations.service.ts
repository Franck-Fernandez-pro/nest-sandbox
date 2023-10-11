import { Injectable } from '@nestjs/common';
import { Donation } from '@prisma/client';
import { DonationCreateInput } from '../@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { OrderByParams } from '../graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async create(createDonationInput: DonationCreateInput): Promise<Donation> {
    const { data }: any = await this.prisma.donation.create({
      data: createDonationInput,
    });

    return data;
  }

  async findAll(orderBy?: OrderByParams): Promise<Donation[]> {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};

    return this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  async findOne(id: number): Promise<Donation> {
    return this.prisma.donation.findUnique({
      where: { id },
    });
  }

  async getTotal(): Promise<number> {
    const response = await this.prisma.donation.aggregate({
      _sum: { count: true },
    });

    return response._sum.count;
  }
}
