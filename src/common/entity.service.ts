import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class EntityService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findOne(query: any, projection?: any): Promise<T | null> {
    return this.model.findOne(query).select(projection).exec();
  }

  async findAll(query: any = {}, projection?: any): Promise<T[]> {
    return this.model.find(query).select(projection).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(entityDTO: Partial<T>): Promise<T> {
    const entity = new this.model(entityDTO);
    return entity.save();
  }

  async updateById(
    id: string | ObjectId,
    entityDTO: Partial<T>,
  ): Promise<T | null> {
    const idType = typeof id === 'string' ? new ObjectId(id) : id;
    return this.model
      .findByIdAndUpdate(idType, entityDTO, { new: true })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(new ObjectId(id)).exec();
  }
}
