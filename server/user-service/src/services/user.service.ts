import { PrismaClient, User, Role } from "../generated/prisma";
import { UserInput, LoginInput } from "../types";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const createUser = async (userData: UserInput): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password);

  return prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      role: (userData.role as Role) || "driver",
    },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const loginUser = async (loginData: LoginInput) => {
  const user = await findUserByEmail(loginData.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    loginData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (
  id: number
): Promise<Omit<User, "password"> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
