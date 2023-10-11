import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

interface Payment {
  id: string;
  amount: number;
  currency: string;
}

@Injectable()
export class PaymentsService {
  private fakeUsers = [
    {
      email: 'react@gmail.io',
      payments: [
        { id: '1', amount: 100, currency: 'USD' },
        { id: '2', amount: 200, currency: 'EUR' },
      ],
    },
    {
      email: 'vue@gmail.io',
      payment: [{ id: '3', amount: 300, currency: 'GBP' }],
    },
    { email: 'angular@gmail.io' },
  ];

  private fakePayments: Payment[] = [
    { id: '1', amount: 100, currency: 'USD' },
    { id: '2', amount: 200, currency: 'EUR' },
    { id: '3', amount: 300, currency: 'GBP' },
  ];

  async create(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.fakeUsers.find((user) => user.email === email);

    if (user) {
      return { status: 'success' };
    }

    throw new BadRequestException();
  }

  findAll(): Payment[] {
    return this.fakePayments;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
