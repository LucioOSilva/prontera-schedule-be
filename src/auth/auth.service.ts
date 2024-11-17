import { Injectable } from '@nestjs/common';
import { RESTResponse, IRESTResponse } from '../service/RESTService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async registerUser(authData: any): Promise<IRESTResponse> {
    try {
      const user = new this.userModel(authData); // Cria um novo documento
      await user.save(); // Salva no MongoDB
      return RESTResponse(201, { id: user._id, email: user.email }, null);
    } catch (error) {
      return RESTResponse(500, null, error.message);
    }
  }

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
}
