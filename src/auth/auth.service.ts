import { Injectable } from '@nestjs/common';
import { RESTResponse, IRESTResponse } from '../service/RESTService';

@Injectable()
export class AuthService {
  public async login(authLogin: any): Promise<IRESTResponse<any>> {
    try {
      console.log(authLogin);
      return RESTResponse(200, null, null);
    } catch (error) {
      return RESTResponse(500, null, error.message);
    }
  }
}
