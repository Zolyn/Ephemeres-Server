import { PlainDirectoryMap, ResolvedProviderConfig, StorageService, UpyunConfig } from '~/core/types';
export declare class UpyunService implements StorageService {
    main({ providerConfig, fullRetrieve, }: ResolvedProviderConfig): Promise<PlainDirectoryMap>;
    mergeProviderConfig(config: UpyunConfig): UpyunConfig;
    retrieveUpyunFileList(config: UpyunConfig, fullRetrieve: boolean): Promise<PlainDirectoryMap>;
}
