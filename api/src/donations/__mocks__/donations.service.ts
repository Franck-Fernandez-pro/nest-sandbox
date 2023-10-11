import { donationsStub, donationStub } from '../../../test/stubs/donation.stub';

export const DonationsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(donationStub()),
  findAll: jest.fn().mockResolvedValue(donationsStub()),
  create: jest.fn((dto) => ({ id: 999, createdAt: 999, ...dto })),
  getTotal: jest
    .fn()
    .mockResolvedValue(
      donationsStub().reduce((acc, curr) => curr.count + acc, 0),
    ),
});
