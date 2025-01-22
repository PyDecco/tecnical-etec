import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from 'src/entities/client';


@Module({
  imports: [TypeOrmModule.forFeature([Client])], 
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [TypeOrmModule], 
})
export class ClientsModule {}
