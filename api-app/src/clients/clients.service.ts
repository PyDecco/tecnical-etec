import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly usersRepository: Repository<Client>,
  ) {}

  async create(createUserDto: CreateClientDto): Promise<Client> {
    const { cpf, email } = createUserDto;
    
    const cpfExists = await this.usersRepository.findOne({ where: { cpf } });
    if (cpfExists) {
      throw new ConflictException('CPF já cadastrado.');
    }

    const emailExists = await this.usersRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }
}

