import { Box, Flex, Heading } from '@chakra-ui/react';
import { Container } from '../Container';

export interface PageProps {
  title?: string;
  action?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, action, children }) => (
  <>
    {title && (
      <Box as="header" bg="white" shadow="sm">
        <Container py={6}>
          <Flex direction="row" align="center">
            <Box flex="1 1 auto">
              <Heading size="lg">{title}</Heading>
            </Box>
            {action && <Box flex="0 0 auto">{action}</Box>}
          </Flex>
        </Container>
      </Box>
    )}
    <Box as="main">
      <Container pt={6}>{children}</Container>
    </Box>
  </>
);
