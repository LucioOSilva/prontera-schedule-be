import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { RESTResponse, IRESTResponse } from '../service/RESTService';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Método para verificar se o email já existe no banco de dados
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async createUser(userDTO: UserDto): Promise<User | null> {
    const userExists = await this.findByEmail(userDTO.email);
    if (!userExists) {
      const user = new this.userModel(userDTO);
      await user.save();
      return user;
    }
  }
}
