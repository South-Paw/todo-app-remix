import { Box, BoxProps } from '@chakra-ui/react';

export interface ContainerProps {}

export const Container: React.FC<BoxProps> = (props) => <Box maxW="7xl" mx="auto" px={[6, null, null, 8]} {...props} />;
