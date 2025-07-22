import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;

    // Ensure JWT_SECRET is defined in the environment
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from Bearer token
      ignoreExpiration: false, // Don't ignore token expiration
      secretOrKey: jwtSecret, // Use the secret
    });
  }

  // Validate and decode the JWT
  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Debug JWT payload content
    if (!payload || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
