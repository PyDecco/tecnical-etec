import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from 'src/entities/client';


@Module({
  imports: [TypeOrmModule.forFeature([Client])], // Registre a entidade aqui
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [TypeOrmModule], // Exporte o TypeOrmModule se outros módulos precisarem do repositório
})
export class ClientsModule {}
