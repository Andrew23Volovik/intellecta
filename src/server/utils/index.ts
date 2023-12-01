import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const MAX_COUNT = 5;

export const incrementApiLimit = async (userId: string): Promise<void> => {
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async (userId: string): Promise<boolean> => {
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: userId },
  });

  return !userApiLimit || userApiLimit.count < MAX_COUNT;
};

export const getApiLimitCount = async (userId: string) => {
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  return !userApiLimit ? 0 : userApiLimit.count;
};
