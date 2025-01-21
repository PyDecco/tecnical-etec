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
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: 'nest_password',
      database: 'nest_database',
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true,      // Apenas para desenvolvimento (sincroniza o schema do BD)
    }),ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
