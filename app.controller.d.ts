import { AppService } from './app.service';
import { UpyunService } from './services';
import { PlainDirectoryMap } from './core/types';
export declare class AppController {
    private readonly appService;
    private readonly upyunService;
    constructor(appService: AppService, upyunService: UpyunService);
    upyun(ip: string, xRealIP: string): Promise<PlainDirectoryMap>;
}
