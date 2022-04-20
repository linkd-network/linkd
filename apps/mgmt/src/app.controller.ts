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
  get() {
    console.log('im here');
    return { name: 'Hola' };
    // return this.appService.getHello();
  }
}
