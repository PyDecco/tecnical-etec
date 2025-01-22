import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  const mockClientRepository = {
    create: jest.fn().mockImplementation((dto: CreateClientDto) => ({
      ...dto,
      id: 'some-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    save: jest.fn().mockImplementation((client: Client) => Promise.resolve(client)),
    findOne: jest.fn().mockResolvedValue(null), // Default behavior (no conflict)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new client when CPF and email are unique', async () => {
    const createClientDto: CreateClientDto = {
      fullName: 'John Doe',
      cpf: '12345678901',
      email: 'john.doe@example.com',
      preferredColor: 'blue',
      observations: 'Some observations',
    };

    const result = await service.create(createClientDto);

    expect(result).toHaveProperty('id');
    expect(result.fullName).toBe(createClientDto.fullName);
    expect(result.cpf).toBe(createClientDto.cpf);
    expect(result.email).toBe(createClientDto.email);
    expect(result.preferredColor).toBe(createClientDto.preferredColor);
    expect(result.observations).toBe(createClientDto.observations);
  });
});

