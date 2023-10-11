import { Key, memo, useState } from 'react';
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import LeaderBoardItem from './LeaderBoardItem';
import { gql, useQuery } from '@apollo/client';
import { Donation, Donations, SortOrder } from '../../types';

const DONATIONS_QUERY = gql`
  query Donations($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      count
      displayName
      team
      message
      createdAt
    }
  }
`;

interface QueryVariable {
  orderBy: {
    field: string;
    direction: SortOrder;
  };
}

interface Props {}

function LeaderBoard({}: Props) {
  const [field, setField] = useState<string>('createdAt');
  const { data, error, loading } = useQuery<Donations, QueryVariable>(
    DONATIONS_QUERY,
    {
      variables: {
        orderBy: {
          field,
          direction: SortOrder.desc,
        },
      },
    }
  );

  if (error) return <div>Something went wrong...</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <Box w="100%">
      <VStack spacing={4}>
        <Heading>LeaderBoard</Heading>

        <RadioGroup onChange={setField} value={field}>
          <Stack direction="row">
            <Radio value="createdAt">Most recent</Radio>
            <Radio value="count">Most Pounds</Radio>
          </Stack>
        </RadioGroup>

        {data?.donations &&
          data.donations.map((donation: Donation, idx: Key) => (
            <LeaderBoardItem key={idx} donation={donation} />
          ))}
      </VStack>
    </Box>
  );
}

export default memo(LeaderBoard);
