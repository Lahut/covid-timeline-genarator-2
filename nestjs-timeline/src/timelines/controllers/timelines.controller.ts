import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { TimeLine } from '../models/timeline.model';
import { TimeLineItem } from '../models/timelineItem.model';
import { TimeLineService } from '../services/timelines.service';

@Controller('timeline')
export class TimelinesController {
  constructor(private readonly timelineService: TimeLineService) {}

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
    @Body('timelines') timelines: TimeLineItem[],
    @Body('visitedPlaces') visitedPlaces: string[],
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
      timelines,
      visitedPlaces,
    );
  }
}
