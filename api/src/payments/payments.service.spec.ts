import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

interface Payment {
  id: string;
  amount: number;
  currency: string;
}

const fakePayments: Payment[] = [
  { id: '1', amount: 100, currency: 'USD' },
  { id: '2', amount: 200, currency: 'EUR' },
  { id: '3', amount: 300, currency: 'GBP' },
];

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of payments', () => {
      const payments = service.findAll();
      expect(payments).toEqual(fakePayments);
    });
  });
});
