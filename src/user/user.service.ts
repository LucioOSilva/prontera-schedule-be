import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { EncryptService } from '../utils';
import { EntityService } from '../common/entity.service'; // Importando EntityService
import { Model } from 'mongoose';

@Injectable()
export class UserService extends EntityService<UserDocument> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly encryptService: EncryptService,
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email });
  }

  public async createUser(userDTO: UserDto): Promise<UserDocument | null> {
    const userExists = await this.findByEmail(userDTO.email);
    if (!userExists) {
      const hashedPassword = this.encryptService.encrypt(userDTO.password);
      const user = await this.create({ ...userDTO, password: hashedPassword });
      return user;
    }
    return null;
  }
}
