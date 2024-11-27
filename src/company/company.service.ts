import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';
import { EntityService } from '../common/entity.service';

@Injectable()
export class CompanyService extends EntityService<CompanyDocument> {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {
    super(companyModel);
  }

  // TODO : ADIDIONAR VALIDAÇÃO JWT
  async createCompany(data: Company): Promise<CompanyDocument> {
    return this.companyModel.create(data);
  }

  async findByTentantId(tenantId: string): Promise<CompanyDocument | null> {
    return this.findOne({ tenantId });
  }
}
