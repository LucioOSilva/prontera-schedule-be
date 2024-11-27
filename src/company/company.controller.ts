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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/Roles';
import { CompanyDto } from './dto/company.dto';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() data: CompanyDto): Promise<Company> {
    return this.companyService.create(data);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Company>,
  ): Promise<Company | null> {
    return this.companyService.update(id, data);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
