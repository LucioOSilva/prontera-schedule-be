import { Injectable } from '@nestjs/common';
import { RESTResponse, IRESTResponse } from '../service/RESTService';

@Injectable()
export class AuthService {
  public async login(authLogin: any): Promise<IRESTResponse> {
    try {
      console.log(authLogin);
      // const user: IUser = await QR.loadOne(
      //   userQueries.findUserByEmail(authLogin.email),
      // );
      // if (authLogin.email && authLogin.password) {
      //   const encodedPass = encodePass(authLogin.password);
      //   if (!user || encodedPass !== user.password)
      //     throw new Error('Email ou senha incorretos, tente novamente.');
      //   delete user.password;
      //   const userAuthed: IAuthResponse = { token: createJWT(user) };
      //   return RESTResponse(200, userAuthed, null);
      // }
      // throw new Error('Um erro ocorreu ao tentar autenticar');
      return RESTResponse(200, null, null);
    } catch (error) {
      return RESTResponse(500, null, error.message);
    }
  }

  // public async decode({
  //   authorization,
  // }: IAuthTokenDecodeDTO): Promise<IRESTResponse> {
  //   const tokenHash = authorization ? authorization.replace('Bearer ', '') : '';
  //   const dataResponse = { isAuthed: isValidJWT(tokenHash) };
  //   return RESTResponse(200, dataResponse, null);
  // }
}
