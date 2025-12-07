import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // REGISTER --------------------------------------------------------
  async register(data: { name: string; email: string; password: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        emailVerified: false,
        accounts: {
          create: {
            id: randomUUID(),
            providerId: 'credentials',
            accountId: data.email,
            password: hashed,
          },
        },
      },
    });

    // Return EXACT shape requested
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // LOGIN -----------------------------------------------------------
  async login(email: string, password: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        providerId: 'credentials',
        accountId: email,
      },
      include: { user: true },
    });

    if (!account) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // Create session token
    const token = randomUUID();

    const session = await this.prisma.session.create({
      data: {
        id: randomUUID(),
        token,
        userId: account.user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });

    const u = account.user;

    // EXACT RESPONSE SHAPE:
    return {
      token: session.token,
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        emailVerified: u.emailVerified,
        image: u.image,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      },
    };
  }

  // VALIDATE / ME ---------------------------------------------------
  async validate(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    const u = session.user;

    // EXACT RESPONSE SHAPE FOR /me (no token in output)
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      emailVerified: u.emailVerified,
      image: u.image,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }

  // LOGOUT ----------------------------------------------------------
  async logout(token: string) {
  if (!token) {
    throw new UnauthorizedException('Missing session token');
  }

  await this.prisma.session.delete({
    where: { token },
  });

  return { message: 'Logged out' };
}

}
