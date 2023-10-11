import { registerEnumType } from '@nestjs/graphql';

export enum DonationScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    count = "count",
    displayName = "displayName",
    email = "email",
    mobile = "mobile",
    team = "team",
    message = "message"
}


registerEnumType(DonationScalarFieldEnum, { name: 'DonationScalarFieldEnum', description: undefined })
