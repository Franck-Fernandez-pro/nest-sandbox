import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Donation } from 'src/graphql';
import { DonationsService } from './donations.service';

const donation: Donation = {
  id: 4,
  count: 300,
  displayName: 'John Doe',
  email: 'john@mail.io',
  mobile: '093487',
  team: 'team string',
  message: 'message string',
};
const fakeDonations: Donation[] = [
  {
    id: 1,
    createdAt: 12032020,
    count: 100,
    displayName: 'displayName string',
    email: 'email string',
    mobile: 'mobile string',
    team: 'team string',
    message: 'message string',
  },
  {
    id: 2,
    createdAt: 12032020,
    count: 200,
    displayName: 'displayName string',
    email: 'email string',
    mobile: 'mobile string',
    team: 'team string',
    message: 'message string',
  },
  {
    id: 3,
    createdAt: 12032020,
    count: 300,
    displayName: 'displayName string',
    email: 'email string',
    mobile: 'mobile string',
    team: 'team string',
    message: 'message string',
  },
];

const db = {
  donation: {
    findMany: jest.fn().mockResolvedValue(fakeDonations),
    findUnique: jest.fn().mockResolvedValue(fakeDonations[0]),
    create: jest.fn((x) => x),
  },
};

describe('DonationsService', () => {
  let service: DonationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationsService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<DonationsService>(DonationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', () => {
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('return created user', async () => {
      const response = await service.create(donation);
      expect(response).toEqual(donation);
    });
  });
});
