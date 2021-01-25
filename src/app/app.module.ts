import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dnasProviders } from '../providers/dna/dna.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...dnasProviders],
})
export class AppModule {}
