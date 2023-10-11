export interface Donation {
  id: number;
  count: number;
  displayName: string;
  email: string;
  mobile?: string;
  team?: string;
  message?: string;
  createdAt: Date;
}

export interface Donations {
  donations: Donation[];
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
