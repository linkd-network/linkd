import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }


  @Post('addNote')
  appNote(): string {
    return 'Hola';
    // return this.appService.getHello();
  }

  @Get('getNote')
  get(): string {
    return 'Hola';
    // return this.appService.getHello();
  }
}
