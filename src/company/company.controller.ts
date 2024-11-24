import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../schemas/company.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() data: Partial<Company>): Promise<Company> {
    return this.companyService.create(data);
  }

  @UseGuards(JwtAuthGuard)
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Company>,
  ): Promise<Company | null> {
    return this.companyService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
