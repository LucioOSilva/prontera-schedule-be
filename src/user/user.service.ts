import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { EncryptService } from '../utils';
import { EntityService } from '../common/entity.service'; // Importando EntityService
import { Model } from 'mongoose';
import { LoggedUser } from 'src/auth/types';

@Injectable()
export class UserService extends EntityService<UserDocument> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly encryptService: EncryptService,
  ) {
    super(userModel);
  }

  private roleHierarchy(role: string): string[] | null {
    switch (role) {
      case 'admin':
        return ['recepcionist', 'doctor', 'patient'];
      case 'recepcionist':
        return ['patient'];
      case 'doctor':
        return ['patient'];
      default:
        return null;
    }
  }

  private verifyRoleAllow(loggedUserRole: string, role: string): boolean {
    switch (loggedUserRole) {
      case 'admin':
        return (
          role === 'recepcionist' || role === 'doctor' || role === 'patient'
        );
      case 'recepcionist':
        return role === 'patient';
      default:
        return false;
    }
  }

  async findByTenantAndEmail(
    tenantId: string,
    email: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, email });
  }

  async findByTenantAndId(
    tenantId: string,
    id: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, _id: id });
  }

  public async createUser(
    loggedUser: LoggedUser,
    userDTO: UserDto,
  ): Promise<UserDocument | null> {
    const userExists = await this.findByTenantAndEmail(
      userDTO.tenantId,
      userDTO.email,
    );

    if (userExists) {
      throw new HttpException('User already exists', 400);
    }

    const isAbleToCreate = this.verifyRoleAllow(loggedUser.role, userDTO.role);

    if (!isAbleToCreate) {
      throw new HttpException(
        'Unable to create user, insufficient permissions',
        403,
      );
    }

    const hashedPassword = this.encryptService.encrypt(userDTO.password);
    const user = await this.create({
      ...userDTO,
      password: hashedPassword,
    });
    return user;
  }
}
