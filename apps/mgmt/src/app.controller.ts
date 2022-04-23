import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }
  @Get('health-check')
  get() {
    console.log('im here 1');
    return { success: true };
    // return this.appService.getHello();
  }
}
