import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    await this.validateUniqueFields(createClientDto);
    const newClient = this.clientsRepository.create(createClientDto);
    return await this.clientsRepository.save(newClient);
  }

  private async validateUniqueFields(createClientDto: CreateClientDto): Promise<void> {
    const { cpf, email } = createClientDto;

    if (await this.isCpfRegistered(cpf)) {
      throw new ConflictException('CPF já cadastrado.');
    }

    if (await this.isEmailRegistered(email)) {
      throw new ConflictException('E-mail já cadastrado.');
    }
  }

  private async isCpfRegistered(cpf: string): Promise<boolean> {
    const cpfExists = await this.clientsRepository.findOne({ where: { cpf } });
    return !!cpfExists;
  }

  private async isEmailRegistered(email: string): Promise<boolean> {
    const emailExists = await this.clientsRepository.findOne({ where: { email } });
    return !!emailExists;
  }
}

