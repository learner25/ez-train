import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Accept tokens from all common header names
    const authHeader = request.headers['authorization'];
    const sessionToken = 
      request.headers['x-session-token'] ||
      request.headers['session-token'] ||
      request.headers['token'];

    let token: string | null = null;

     
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }

   
    if (!token && sessionToken) {
      token = sessionToken;
    }

    if (!token) {
      throw new UnauthorizedException('Missing session token');
    }

    // Validate session
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid session token');
    }

    
    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired');
    }

     
    request.user = session.user;
    request.session = session;

    return true;
  }
}
