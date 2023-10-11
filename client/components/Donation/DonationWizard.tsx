import { gql, useMutation } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { memo, useState } from 'react';
import CountSelection from './CountSelection';
import DonationDetails from './DonationDetails';

const CREATE_DONATION_MUTATION = gql`
  mutation CreateDonation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      count
    }
  }
`;

interface Props {}

function DonationWizard(props: Props) {
  const [step, setStep] = useState(0);
  const [donationDetails, setDonationDetails] = useState({
    count: 20,
  });
  const [createDonation, { data }] = useMutation(CREATE_DONATION_MUTATION, {
    refetchQueries: ['Donations'],
  });

  const next = (values: any = {}) => {
    const mergedDetails = { ...donationDetails, ...values };

    if (step === pages.length - 1) {
      submitDonation(mergedDetails);
    } else {
      setStep(step + 1);
      setDonationDetails(mergedDetails);
    }
  };

  const previous = () => {
    setStep(step - 1);
  };

  const submitDonation = async (values: any) => {
    await createDonation({
      variables: {
        createDonationInput: values,
      },
    });
  };

  const pages = [
    <CountSelection key={0} next={next} initialCount={donationDetails.count} />,
    <DonationDetails key={1} next={next} previous={previous} />,
  ];

  return (
    <Box
      boxShadow="xl"
      p={8}
      bgColor="blue.700"
      color="gray.200"
      borderRadius="xl"
      minW="sm"
    >
      {data ? (
        <div>
          Thank you for your donation of ${data?.createDonation?.count}!!
        </div>
      ) : (
        pages[step]
      )}
    </Box>
  );
}

export default memo(DonationWizard);
