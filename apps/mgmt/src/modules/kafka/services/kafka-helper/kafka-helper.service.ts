import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaHelperService {

    getBrokers() {
        return ['localhost:9092']
    }


}
