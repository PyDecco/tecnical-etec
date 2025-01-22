import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { Client } from './entities/client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'nest_postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_db',
      autoLoadEntities: true, 
      synchronize: true,      
    }),ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
