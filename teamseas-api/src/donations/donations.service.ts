import { DonationCreateInput } from './../../prisma/src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderByParams } from '../graphql';
import { Prisma } from '@prisma/client';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDonationInput: DonationCreateInput) {
    return this.prisma.donation.create({ data: createDonationInput });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({ where: donationWhereUniqueInput });
  }

  async getTotal() {
    const response = this.prisma.donation.aggregate({
      _sum: {
        count: true,
      },
    });
    return (await response)._sum.count;
  }
}
