import React from 'react';
import { Button as ButtonNative, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <ButtonNative
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600',
      }}
      _loading={{
        _spinner: {
          color: 'black',
        },
      }}
      {...rest}>
      <Text
        marginLeft={2}
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : 'black'}>
        {title}
      </Text>
    </ButtonNative>
  );
}
