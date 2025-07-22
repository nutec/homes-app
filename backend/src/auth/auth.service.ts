import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly users: User[] = this.loadUsersFromDb();

  constructor(private readonly jwtService: JwtService) {}

  // Load users from the db.json file
  private loadUsersFromDb(): User[] {
    const filePath = path.join(__dirname, '../../db.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data).users;
  }

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password: _, ...result } = user; // Omit password from the result
    return result;
  }

  // Generate a JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
