import { Injectable } from "@nestjs/common";
global.fetch = require('node-fetch');
require('abortcontroller-polyfill/dist/polyfill-patch-fetch');
import * as IPFS from 'ipfs-http-client';

const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || 'http://host.docker.internal:5001/api/v0';

@Injectable()
export class IpfsAPIService {

    private ipfs;

    constructor() {
        this.ipfs = IPFS.create({ url: IPFS_ENDPOINT });
    }

    public async save(data) {
        const { cid } = await this.ipfs.add(data);
        return {
            cid: cid.toString()
        }
    }
}