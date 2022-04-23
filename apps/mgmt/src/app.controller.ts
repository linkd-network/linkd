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
    console.log('im here 1');
    return { name: 'Deanox' };
    // return this.appService.getHello();
  }
}
