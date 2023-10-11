import { memo, useCallback, useState } from 'react';
import {
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';
import RadioCard from './RadioCard';

interface Props {
  next: (value: any) => void;
  initialCount: number;
}
const options = [5, 20, 50, 100];

function CountSelection({ next, initialCount }: Props) {
  const [pounds, setPounds] = useState<number>(initialCount);
  const [customAmount, setCustomAmount] = useState(
    options.includes(pounds) ? '' : pounds
  );
  const { getRadioProps, getRootProps } = useRadioGroup({
    name: 'pounds',
    value: pounds,
    onChange: (nextValue) => {
      setCustomAmount('');
      setPounds(parseInt(nextValue));
    },
  });
  const group = getRootProps();

  const handleNumberInputFocus = useCallback(() => setPounds(0), []);

  const handleNumberInputOnChange = useCallback((value) => {
    setPounds(parseInt(value));
    setCustomAmount(value);
  }, []);

  const nextStep = useCallback(() => next({ count: pounds }), [pounds, next]);

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h3" size="md">
        JOIN #TEAMSEAS
      </Heading>
      <Text fontSize="md" fontWeight="bold">
        $1 removes a pound of trash
      </Text>

      <SimpleGrid mt={5} columns={2} spacing={2} {...group}>
        {options &&
          options.map((value, idx) => {
            const radio = getRadioProps({ value });

            return (
              <RadioCard key={idx} {...radio}>
                {value} pounds
              </RadioCard>
            );
          })}
      </SimpleGrid>

      <NumberInput
        onFocus={handleNumberInputFocus}
        onChange={handleNumberInputOnChange}
        value={customAmount}
      >
        <NumberInputField placeholder="Other amount" />
      </NumberInput>

      <VStack spacing={2}>
        <Button
          isFullWidth
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          onClick={nextStep}
        >
          Next
        </Button>
      </VStack>
    </VStack>
  );
}

export default memo(CountSelection);
