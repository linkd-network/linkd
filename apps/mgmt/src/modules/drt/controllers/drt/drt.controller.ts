import { Body, Controller, Param, Post } from '@nestjs/common';
import { EntityType } from '../../../../enums/drt.enums';

@Controller('drt')
export class DrtController {

    @Post('subscribe/:entity')
    async subscribeToAd(@Param('entity') entityType: EntityType, @Body() nbody) {
        console.log(entityType);
        return { success: true }
    }



}
