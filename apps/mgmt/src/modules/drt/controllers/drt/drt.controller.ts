import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { CreateDRTSubscriptionPayload } from 'src/app.models';
import { EntityType } from '../../../../enums/drt.enums';
import { SubscriptionService } from '../../services/subscription.service';

@Controller('drt')
export class DrtController {

    constructor(private subscriptionService: SubscriptionService) { }

    @Post('subscribe/:entity')
    async subscribeToAd(@Param('entity') entityType: EntityType, @Body() nbody, @Headers('wallet-account-id') walletAccountId) {
        console.log(`Recieved subscribe request from ${entityType} for data `, nbody);
        const payload: CreateDRTSubscriptionPayload = {
            ...nbody,
            subscriberType: entityType,
            userAccountId: walletAccountId || '0.0.47868369',
        };
        const result = await this.subscriptionService.upsertSubscription(payload);
        return {
            success: true,
            ...result
        }
    }



}
