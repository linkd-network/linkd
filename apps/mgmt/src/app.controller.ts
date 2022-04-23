import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }
  @Get('health-check')
  get() {
    return { success: true };
  }
}
