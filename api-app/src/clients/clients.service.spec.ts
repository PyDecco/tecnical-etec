import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from 'src/entities/client';
import { ConflictException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw a ConflictException if CPF already exists', async () => {
      mockRepository.findOne.mockResolvedValueOnce({ cpf: '12345678900' });

      await expect(
        service.create({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' }),
      ).rejects.toThrow(ConflictException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { cpf: '12345678900' } });
    });

    it('should throw a ConflictException if email already exists', async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null) // CPF does not exist
        .mockResolvedValueOnce({ email: 'test@example.com' });

      await expect(
        service.create({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' }),
      ).rejects.toThrow(ConflictException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });

    it('should create and save a new client if CPF and email are unique', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
      mockRepository.create.mockReturnValue({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' });
      mockRepository.save.mockResolvedValue({ id: 1, cpf: '12345678900', email: 'test@example.com', name: 'Test User' });

      const result = await service.create({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' });

      expect(mockRepository.create).toHaveBeenCalledWith({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' });
      expect(mockRepository.save).toHaveBeenCalledWith({ cpf: '12345678900', email: 'test@example.com', name: 'Test User' });
      expect(result).toEqual({ id: 1, cpf: '12345678900', email: 'test@example.com', name: 'Test User' });
    });
  });
});
