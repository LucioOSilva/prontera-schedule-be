import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { RESTResponse, IRESTResponse } from '../service/RESTService';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Método para verificar se o email já existe no banco de dados
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async createUser(userDTO: any): Promise<IRESTResponse<any>> {
    try {
      const userExists = await this.findByEmail(userDTO.email); // Verifica se o email já existe
      if (userExists) {
        throw new Error('Email already in use'); // Lança um erro caso o email já exista
      }

      const user = new this.userModel(userDTO); // Cria um novo documento
      await user.save(); // Salva no MongoDB
      return RESTResponse(201, { id: user._id, email: user.email }, null);
    } catch (error: any) {
      const code = error.message.includes('User validation failed') ? 400 : 500;
      return RESTResponse(code, null, error.message);
    }
  }
}
