import { Test, TestingModule } from '@nestjs/testing';
import { Donation } from '@prisma/client';
import { CreateDonationInput } from 'src/graphql';
import {
  donationStub,
  donationsStub,
  newDonationStub,
} from '../../test/stubs/donation.stub';
import { DonationsResolver } from './donations.resolver';
import { DonationsService } from './donations.service';

jest.mock('./donations.service');

describe('DonationsResolver', () => {
  let resolver: DonationsResolver;
  let service: DonationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationsResolver, DonationsService],
    }).compile();

    resolver = module.get<DonationsResolver>(DonationsResolver);
    service = module.get<DonationsService>(DonationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let donation: Donation;

      beforeEach(async () => {
        donation = await resolver.findOne(donationStub().id);
      });

      it('then it should return a donation', () => {
        expect(donation).toEqual(donationStub());
      });

      it('then it should called service', () => {
        expect(service.findOne).toHaveBeenCalledWith(donationStub().id);
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let donations: Donation[];

      beforeEach(async () => {
        donations = await resolver.findAll();
      });

      it('then it should return array of donation', () => {
        expect(donations).toEqual(donationsStub());
      });

      it('then it should called service', () => {
        expect(service.findAll).toHaveBeenCalled();
      });
    });
  });

  describe('getTotal', () => {
    describe('when getTotal is called', () => {
      let total: number;

      beforeEach(async () => {
        total = await resolver.totalDonations();
      });

      it('then it should return array of donation', async () => {
        expect(total).toEqual(await service.getTotal());
      });

      it('then it should called service', () => {
        expect(service.getTotal).toHaveBeenCalled();
      });
    });
  });

  // Incomplete tests
  describe('create', () => {
    describe('when create is called', () => {
      const newDonation: CreateDonationInput = newDonationStub();
      let donation: Donation;

      beforeEach(async () => {
        donation = await resolver.create(newDonation);
      });

      it('then it should return new donation', async () => {
        expect(donation).toEqual({
          id: expect.any(Number),
          createdAt: expect.any(Number),
          ...newDonation,
        });
      });

      it('then it should called service', () => {
        expect(service.create).toHaveBeenCalled();
        expect(service.getTotal).toHaveBeenCalled();
      });
    });
  });
});
