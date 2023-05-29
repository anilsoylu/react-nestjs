import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async delete(id: string): Promise<Cat> {
    return this.catModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel.findById(id).exec();
    if (!existingCat) {
      throw new Error('Cat not found');
    }

    if (updateCatDto.name) {
      existingCat.name = updateCatDto.name;
    }

    if (updateCatDto.age) {
      existingCat.age = updateCatDto.age;
    }

    return existingCat.save();
  }
}
