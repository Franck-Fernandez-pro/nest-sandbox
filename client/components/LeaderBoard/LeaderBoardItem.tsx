import { memo, useMemo } from 'react';
import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import { Donation } from '../../types';
import { formatDate } from '../../utils';

interface Props {
  donation: Donation;
}

function LeaderBoardItem({
  donation: { count, displayName, team, message, createdAt },
}: Props) {
  const createdAtMemo = useMemo(() => formatDate(createdAt), [createdAt]);

  return (
    <Flex
      boxShadow="md"
      p={3}
      bgColor="teal.200"
      color="gray.800"
      borderRadius="lg"
      maxWidth="lg"
      width="100%"
    >
      <Avatar size="lg" />
      <Box flex="1" ml={4}>
        <Flex justifyContent="space-between" h="100%">
          <Flex flexDirection="column" textAlign="left">
            <Text fontWeight="bold" fontSize="sm" textTransform="uppercase">
              {team}
            </Text>
            <Text fontWeight="bold">{displayName}</Text>
            <Text fontSize="sm">{message}</Text>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="space-around"
            textAlign="right"
          >
            <div>
              <Badge
                colorScheme=""
                borderRadius="full"
                textTransform="lowercase"
                py={1}
                px={3}
                as="div"
              >
                {count.toLocaleString()} pounds
              </Badge>
              <Text fontSize="xs">{createdAtMemo}</Text>
            </div>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default memo(LeaderBoardItem);
