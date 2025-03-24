// lib/prisma.ts
"use server";
import  { PrismaClient }  from "@prisma/client";

const prismaClientSigleton = () => {
  return new PrismaClient();
}

declare const globalThis: {
    prismaGlobal:  ReturnType<typeof prismaClientSigleton>;
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSigleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

