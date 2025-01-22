import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';

@Controller('clients')
export class ClientsController {

  constructor(private readonly usersService: ClientsService) {}

  @Post()
  async create(@Body() createUserDto: CreateClientDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; 
      }
      throw new Error('Erro inesperado ao criar o usuário.');
    }
  }
}
