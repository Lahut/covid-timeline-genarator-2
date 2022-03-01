import { Controller, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { TimeLine } from '../models/timeline.model';
import { TimeLineItem } from '../models/timelineItem.model';
import { TimeLineService } from '../services/timelines.service';

@Controller('timeline')
export class TimelinesController {
  constructor(private readonly timelineService: TimeLineService) {}

  @Get()
  getTimeline(): any {
    return this.timelineService.getTimeline();
  }

  @Post()
  createTimeline(
    @Body('age') age: number,
    @Body('gender') gender: string,
    @Body('occupation') occupation: string,
    @Body('dateFrom') dateFrom: string,
    @Body('dateTo') dateTo: string,
    @Body('desc') desc: string,
    @Body('locationType') locationType: string,
    @Body('location') location: string,
  ): any {
    return this.timelineService.createTimeLine(
      age,
      gender,
      occupation,
      dateFrom,
      dateFrom.slice(0, 11).concat(dateTo),
      desc,
      locationType,
      location,
    );
  }

  @Put()
  insertTimeLineItem(
    @Body('age') age: number,
    @Body('gender') gender: string,
    @Body('occupation') occupation: string,
    @Body('dateFrom') dateFrom: string,
    @Body('dateTo') dateTo: string,
    @Body('desc') desc: string,
    @Body('locationType') locationType: string,
    @Body('location') location: string,
  ): any {
    return this.timelineService.insertTimeLine(
      age,
      gender,
      occupation,
      dateFrom,
      dateFrom.slice(0, 11).concat(dateTo),
      desc,
      locationType,
      location,
    );
  }

  @Delete('duration')
  deleteDuration(
    @Body('dateToDelete') dateToDelete: string,
    @Body('dateFromDelete') dateFromDelete: string,
    @Body('dateMain') dateMain: string,
  ): any {
    return this.timelineService.deleteDuration(
      dateToDelete,
      dateFromDelete,
      dateMain,
    );
  }
}
