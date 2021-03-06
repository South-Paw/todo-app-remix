import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { loader } from '../../routes/index';
import { db } from '../../utils/db.server';

jest.mock('../../utils/db.server', () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(),
}));

const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

describe('routes/index', () => {
  const now = new Date();

  describe('loader', () => {
    it('should return incomplete todo items', async () => {
      prismaMock.todo.findMany.mockResolvedValue([
        { id: '2', label: 'Eat pie', createdAt: now, updatedAt: now, completedAt: null },
      ]);

      const response = await loader({
        request: new Request('http://localhost:3000/'),
        context: {},
        params: {},
      });

      expect(response.showAll).toEqual(false);
      expect(response.todos).toHaveLength(1);
      expect(response.todos).toEqual(expect.arrayContaining([expect.objectContaining({ id: '2' })]));
    });

    it('should return all todo items', async () => {
      prismaMock.todo.findMany.mockResolvedValue([
        { id: '1', label: 'Make pie', createdAt: now, updatedAt: now, completedAt: now },
        { id: '2', label: 'Eat pie', createdAt: now, updatedAt: now, completedAt: null },
      ]);

      const response = await loader({
        request: new Request('http://localhost:3000/?showAll=true'),
        context: {},
        params: {},
      });

      expect(response.showAll).toEqual(true);
      expect(response.todos).toHaveLength(2);
      expect(response.todos).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '1' }), expect.objectContaining({ id: '2' })]),
      );
    });
  });
});
