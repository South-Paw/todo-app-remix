import { Box } from '@chakra-ui/react';
import { Navigation } from './Navigation';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navigation />
      {children}
    </Box>
  );
};
