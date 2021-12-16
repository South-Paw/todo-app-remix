import { Box, Checkbox, Flex, Grid, Heading, HStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const formatDateTime = (isoTime: string) => DateTime.fromISO(isoTime).toFormat('dd/LL/yy @ hh:mm a');

export interface TodoProps {
  label: string;
  createdAt: string;
  completedAt?: string;
}

export const Todo: React.FC<TodoProps> = ({ label, createdAt, completedAt }) => (
  <Box bg={completedAt ? 'green.50' : 'white'} borderWidth="1px" shadow="sm" borderRadius="lg">
    <Grid p={4} gap={4} templateColumns="24px 1fr">
      <Flex boxSize={6} align="center" justify="center">
        <Checkbox
          colorScheme="green"
          size="lg"
          name="isComplete"
          defaultChecked={!!completedAt}
          value={(!!completedAt).toString()}
          onChange={(e) => e.target.form?.submit()}
        />
      </Flex>
      <Box>
        <Heading size="md">{label}</Heading>
        <HStack spacing={1} mt={1} fontSize="sm" color="gray.600">
          {completedAt ? (
            <span>Completed {formatDateTime(completedAt)}</span>
          ) : (
            <span>Created {formatDateTime(createdAt)}</span>
          )}
        </HStack>
      </Box>
    </Grid>
  </Box>
);
