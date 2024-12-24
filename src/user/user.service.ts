import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { UtilsService } from '../utils';
import { EntityService } from '../common/entity.service'; // Importando EntityService
import { Model } from 'mongoose';
import { LoggedUser } from 'src/auth/types';
import { Role } from 'src/auth/types';

@Injectable()
export class UserService extends EntityService<UserDocument> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly utilsService: UtilsService,
  ) {
    super(userModel);
  }

  private createMatcher(
    role: Role,
    loggedUser: LoggedUser,
    filter: Partial<UserDto>,
  ): Record<string, any> {
    const { name, email, ...filterRest } = filter;
    const tenantId = loggedUser.tenantId;

    const matcher: Record<string, any> = {
      tenantId,
      role,
      ...filterRest,
    };

    if (name) {
      matcher.name = { $regex: name, $options: 'i' };
    }

    if (email) {
      matcher.email = { $regex: email, $options: 'i' };
    }

    return matcher;
  }

  public async findByTenantAndEmail(
    tenantId: string,
    email: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, email });
  }

  public async findByTenantAndPhone(
    tenantId: string,
    phone: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, phone });
  }

  public async findByTenantAndId(
    tenantId: string,
    id: string,
  ): Promise<UserDocument | null> {
    return this.findOne({ tenantId, _id: id });
  }

  public async createUser(
    role: Role,
    loggedUser: LoggedUser,
    userDTO: UserDto,
  ): Promise<UserDocument | null> {
    userDTO.tenantId = loggedUser.tenantId;
    userDTO.createdBy = loggedUser._id;

    const userExists = await this.findOne({
      tenantId: userDTO.tenantId,
      phone: userDTO.phone,
    });

    if (userExists) {
      throw new HttpException(
        'User already exists, phone or email already in use',
        400,
      );
    }

    const isAbleToCreate = this.utilsService.verifyRoleAllow(
      loggedUser.role,
      role,
    );

    if (!isAbleToCreate) {
      throw new HttpException(
        'Unable to create user, insufficient permissions',
        403,
      );
    }

    if (!userDTO.email) {
      userDTO.email = this.utilsService.generateRandomEmail(userDTO.tenantId);
    }

    if (!userDTO.password) {
      userDTO.password = '123456';
    } else {
      userDTO.password = this.utilsService.encrypt(userDTO.password);
    }

    const user = await this.create(userDTO).catch((_error) => {
      throw new HttpException(
        'Unable to create user, phone or email already exists',
        400,
      );
    });
    return user;
  }

  public async findAllByRole(
    role: Role,
    loggedUser: LoggedUser,
    filter: Partial<UserDto> = {},
  ): Promise<UserDocument[]> {
    const allowedRetriveRoles = this.utilsService.roleHierarchy(
      loggedUser.role,
    );

    if (!allowedRetriveRoles || !allowedRetriveRoles.includes(role)) {
      throw new HttpException(
        `Unauthorized to retrieve '${role}' of this role`,
        403,
      );
    }

    const patientMatcher: Record<string, any> = this.createMatcher(
      role,
      loggedUser,
      filter,
    );

    const patients = await this.findAll(patientMatcher);
    return patients;
  }
}
