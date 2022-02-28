import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeLinesModule } from './timelines/timelines.module';

@Module({
  imports: [TimeLinesModule],
  controllers: [AppController],
  providers: [AppService], //add service for use to anoter classes
})
export class AppModule {} //we can add multiple modules import module to another modules
