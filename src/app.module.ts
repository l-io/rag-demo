import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { DbService } from './db/db.service.js';
import { EmbeddingService } from './embeddings/embeddings.service.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, DbService, EmbeddingService],
})
export class AppModule {}
