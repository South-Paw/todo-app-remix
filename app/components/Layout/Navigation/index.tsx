import { Box, Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { Link } from 'remix';
import { Container } from '../../Container';
import { NavigationItem, NavigationItemProps } from './Item';

const navigation: NavigationItemProps[] = [{ label: 'All', to: '/' }];

export interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => (
  <Box as="nav" bg="gray.800" shadow="sm">
    <Container>
      <Flex align="center" h={16}>
        <Flex align="center" flexShrink={0} as={Link} to="/">
          <Image boxSize={8} src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
          <Heading ml={3} color="white" size="md">
            My Todo List
          </Heading>
        </Flex>
        <HStack ml={10} align="baseline" spacing={4}>
          {navigation.map(({ label, to }) => (
            <NavigationItem key={label} label={label} to={to} />
          ))}
        </HStack>
      </Flex>
    </Container>
  </Box>
);
