import { Module } from '@nestjs/common';
import { TimelinesController } from './controllers/timelines.controller';
import { TimeLineService } from './services/timelines.service';

@Module({
  controllers: [TimelinesController],
  providers: [TimeLineService],
})
export class TimeLinesModule {}
