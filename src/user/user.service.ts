import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { EncryptService } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly encryptService: EncryptService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async createUser(userDTO: UserDto): Promise<User | null> {
    const userExists = await this.findByEmail(userDTO.email);
    if (!userExists) {
      const hashedPassword = this.encryptService.encrypt(userDTO.email);
      const user = new this.userModel({ ...userDTO, password: hashedPassword });
      await user.save();
      return user;
    }
  }
}
