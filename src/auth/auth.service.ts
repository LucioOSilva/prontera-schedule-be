import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async login(authLogin: any): Promise<any> {
    console.log(authLogin);
    return authLogin;
  }
}
