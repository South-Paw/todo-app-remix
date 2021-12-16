import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { matchPath } from 'react-router-dom';
import { Link, useLocation } from 'remix';

export interface NavigationItemProps {
  label: string;
  to: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ label, to }) => {
  const { pathname } = useLocation();

  const isCurrent = useMemo(() => matchPath(to, pathname), [pathname]);

  return (
    <Box
      as={Link}
      to={to}
      px={3}
      py={2}
      bg="gray.900"
      borderRadius="md"
      color={isCurrent ? 'white' : 'gray.300'}
      fontSize="sm"
      fontWeight="bold"
      _hover={{ bg: 'gray.700' }}
    >
      {label}
    </Box>
  );
};
