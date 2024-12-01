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
        return ['receptionist', 'doctor', 'patient'];
      case 'receptionist':
        return ['patient'];
      case 'doctor':
        return ['patient'];
      default:
        return null;
    }
  }

  private verifyRoleAllow(loggedUserRole: string, role: string): boolean {
    switch (loggedUserRole) {
      case 'superadmin':
        role === 'receptionist' ||
          role === 'doctor' ||
          role === 'patient' ||
          role === 'admin';
      case 'admin':
        return (
          role === 'receptionist' || role === 'doctor' || role === 'patient'
        );
      case 'receptionist':
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

  async findByTenantAndPhone(
    tenantId: string,
    phone: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, phone });
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
    const userExists = await this.findOne({
      tenantId: userDTO.tenantId,
      phone: userDTO.phone,
    });

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

    if (!userDTO.email) {
      userDTO.email = this.encryptService.generateRandomEmail(userDTO.tenantId);
    }

    const hashedPassword = this.encryptService.encrypt(userDTO.password);
    const user = await this.create({
      ...userDTO,
      password: hashedPassword,
    }).catch((_error) => {
      throw new HttpException(
        'Unable to create user, phone or email already exists',
        400,
      );
    });
    return user;
  }
}
