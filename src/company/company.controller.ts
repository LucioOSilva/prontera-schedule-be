import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../schemas/company.schema';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/Roles';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Roles('admin', 'client')
  @UseGuards(RolesGuard)
  @Post('/create')
  async create(
    @Headers() { authorization }: any,
    @Body() data: Partial<Company>,
  ): Promise<Company> {
    return this.companyService.createCompany(data);
  }

  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get('/tenant/:id')
  async findByTentantId(
    @Param('id') tenantId: string,
  ): Promise<Company | null> {
    return this.companyService.findByTentantId(tenantId);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @UseGuards(RolesGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Company>,
  ): Promise<Company | null> {
    return this.companyService.update(id, data);
  }

  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
