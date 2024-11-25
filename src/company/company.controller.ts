import {
  Controller,
  Get,
  Post,
  Patch,
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

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/create')
  async create(@Body() data: Company): Promise<Company> {
    return this.companyService.create(data);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/')
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get('/tenant/:id')
  async findByTentantId(
    @Param('id') tenantId: string,
  ): Promise<Company | null> {
    return this.companyService.findByTentantId(tenantId);
  }

  @UseGuards(RolesGuard)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Company>,
  ): Promise<Company | null> {
    return this.companyService.update(id, data);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
