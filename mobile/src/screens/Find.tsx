import React from 'react';
import { Heading, Stack, VStack } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  return (
    <Stack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'} seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do seu bolão?" />

        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </Stack>
  );
}
