import { CreateDonationInput } from '../../src/graphql';

interface Donation {
  id: number;
  createdAt: number;
  count: number;
  displayName: string;
  email: string;
  mobile: string | null;
  team: string | null;
  message: string | null;
}

export function donationStub(): Donation {
  return {
    id: 123,
    createdAt: 16467196838,
    count: 1000,
    displayName: 'Elon',
    email: 'elon@nest.io',
    mobile: '123456',
    team: 'Team Space',
    message: 'Good morning',
  };
}

export function donationsStub(): Donation[] {
  return [
    {
      id: 1,
      createdAt: 1646734196838,
      count: 100,
      displayName: 'Marius',
      email: 'marius@nest.io',
      mobile: '123456',
      team: 'Team React',
      message: 'Hello world',
    },
    {
      id: 2,
      createdAt: 1646734196839,
      count: 200,
      displayName: 'Bob',
      email: 'bob@nest.io',
      mobile: '123456',
      team: 'Team Vue',
      message: 'Hello there',
    },
    {
      id: 3,
      createdAt: 1646734196840,
      count: 300,
      displayName: 'John',
      email: 'john@nest.io',
      mobile: '123456',
      team: 'Team Angular',
      message: 'Hi!',
    },
  ];
}

export function newDonationStub(): CreateDonationInput {
  return {
    count: 1000,
    displayName: 'Elon',
    email: 'elon@nest.io',
    mobile: '123456',
    team: 'Team Space',
    message: 'Good morning',
  };
}
