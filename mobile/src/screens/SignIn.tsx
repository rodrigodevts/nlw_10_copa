import React from 'react';
import { Center, Icon, Text } from 'native-base';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';

import LogoSvg from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';

export function SignIn() {
  const { signIn } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <LogoSvg width={133} height={24} />
      <Button
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={
          <Icon as={Fontisto} name="google" color="white" size="md" />
        }
        mt={12}
        onPress={signIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'} do seu e-mail
        para criação de sua conta.
      </Text>
    </Center>
  );
}
