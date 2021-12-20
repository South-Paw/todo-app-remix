import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { redirect } from 'remix';
import { action } from '../../routes/todos/$id';
import { db } from '../../utils/db.server';

jest.mock('../../utils/db.server', () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(),
}));

const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

describe('routes/todos/$id', () => {
  const now = new Date();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe('action', () => {
    it('should mark a todo as completed', async () => {
      prismaMock.todo.update.mockResolvedValue({
        id: '2',
        label: 'Eat pie',
        createdAt: now,
        updatedAt: now,
        completedAt: now,
      });

      const body = new URLSearchParams({
        isComplete: 'true',
      });

      const response = await action({
        request: new Request('http://localhost:3000/todos/2?showAll=false', {
          method: 'POST',
          body,
        }),
        params: {
          id: '2',
        },
        context: {},
      });

      expect(response).toEqual(redirect('/?showAll=false'));
      expect(prismaMock.todo.update).toHaveBeenCalledWith({
        data: { completedAt: new Date() },
        where: { id: '2' },
      });
    });

    it('should mark a todo as incomplete', async () => {
      prismaMock.todo.update.mockResolvedValue({
        id: '2',
        label: 'Eat pie',
        createdAt: now,
        updatedAt: now,
        completedAt: null,
      });

      const body = new URLSearchParams({
        isComplete: 'false',
      });

      const response = await action({
        request: new Request('http://localhost:3000/todos/2?showAll=true', {
          method: 'POST',
          body,
        }),
        params: {
          id: '2',
        },
        context: {},
      });

      expect(response).toEqual(redirect('/?showAll=true'));
      expect(prismaMock.todo.update).toHaveBeenCalledWith({
        data: { completedAt: null },
        where: { id: '2' },
      });
    });
  });
});
