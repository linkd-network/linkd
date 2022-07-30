import { Module } from '@nestjs/common';
import { DrtController } from './controllers/drt/drt.controller';

@Module({
    imports: [],
    controllers: [
        DrtController
    ],
    providers: [],
})
export class DrtModule { }
