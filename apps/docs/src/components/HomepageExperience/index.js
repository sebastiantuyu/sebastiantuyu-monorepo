import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Step,
  Steps,
  useColorModeValue,
  Stepper
} from '@chakra-ui/react';

export const HomepageExperiences = ({ experiences }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box p={4} maxW="500px" mx="auto">
      <Heading mb={8} textAlign="center">
        My SSR Developer Experiences
      </Heading>
      <Steps activeStep={currentStep} colorScheme="teal">
        {experiences.map((experience, index) => (
          <Step key={index}>
            <Box
              bg={index === currentStep ? bgColor : 'transparent'}
              p={4}
              borderRadius="md"
              boxShadow={index === currentStep ? 'md' : 'none'}
            >
              <Heading mb={4} size="md">
                {experience.title}
              </Heading>
              <Text>{experience.description}</Text>
            </Box>
          </Step>
        ))}
      </Steps>
      <Stack direction="row" mt={8} spacing={4} justifyContent="center">
        {currentStep > 0 && (
          <Button onClick={prevStep} colorScheme="teal" variant="outline">
            Previous
          </Button>
        )}
        {currentStep < experiences.length - 1 ? (
          <Button onClick={nextStep} colorScheme="teal">
            Next
          </Button>
        ) : (
          <Button colorScheme="teal" variant="outline" disabled>
            Finish
          </Button>
        )}
      </Stack>
    </Box>
  );
};