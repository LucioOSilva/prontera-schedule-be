import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';
import { EntityService } from '../common/entity.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CompanyService extends EntityService<CompanyDocument> {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly authService: AuthService,
  ) {
    super(companyModel);
  }

  async createCompany(token: string, data: Partial<Company>): Promise<CompanyDocument> {
    const isAbleToCreate = await this.authService.hasRolePermission(token, 'admin');
    if (!isAbleToCreate) {
      throw new HttpException('Not allowed', HttpStatus.FORBIDDEN);
    }

    return this.companyModel.create(data);
  }

  async findByTentantId(tenantId: string): Promise<CompanyDocument | null> {
    return this.findOne({ tenantId });
  }
}
