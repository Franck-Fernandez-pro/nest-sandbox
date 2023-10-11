import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);

    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail(id);
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const updatedOwner = await this.ownersRepository.findOne(id);
    updatedOwner.name = updateOwnerInput.name;

    return this.ownersRepository.save(updatedOwner);
  }

  async remove(id: number): Promise<Owner> {
    const deletedOwner = await this.ownersRepository.findOne(id);
    await this.ownersRepository.delete(id);

    return deletedOwner;
  }
}
