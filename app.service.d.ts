import { Cache } from 'cache-manager';
import { PlainDirectoryMap, ProviderList, ResolvedEphemeresConfig, ResolvedProviderConfig, StorageService } from './core/types';
export declare class AppService {
    private cacheManager;
    constructor(cacheManager: Cache);
    readConfig(): Promise<ResolvedEphemeresConfig>;
    getProviderConfig(path: ProviderList): Promise<ResolvedProviderConfig>;
    tryGetCache(key: string, service: StorageService, resolvedProviderConfig: ResolvedProviderConfig): Promise<PlainDirectoryMap>;
}
