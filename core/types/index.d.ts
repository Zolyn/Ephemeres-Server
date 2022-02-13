declare global {
    namespace NodeJS {
        interface ProcessEnv {
            UPYUN_SERVICE: string;
            UPYUN_OPERATOR: string;
            UPYUN_PASSWORD: string;
        }
    }
}
interface UpyunConfig {
    service?: string;
    operator?: string;
    password?: string;
}
interface TenConfig {
    operator?: string;
}
declare type ProviderList = 'upyun' | 'ten';
declare type ProviderConfigs = UpyunConfig | TenConfig;
interface ResolvedProviderConfig {
    providerConfig: ProviderConfigs;
    fullRetrieve: boolean;
}
declare type ProviderMap = Map<ProviderList, ProviderConfigs>;
interface StorageProvider {
    name: ProviderList;
    config?: ProviderConfigs;
}
interface EphemeresConfig {
    fullRetrieve?: boolean;
    storageProviders: StorageProvider | StorageProvider[];
}
interface ResolvedEphemeresConfig {
    fullRetrieve: boolean;
    providersMap: ProviderMap;
}
interface StorageService {
    main({ providerConfig, fullRetrieve, }: ResolvedProviderConfig): Promise<PlainDirectoryMap>;
}
interface PlainFileMeta {
    isDir: boolean;
    pathname: string;
    time: number;
    size: number;
}
interface PlainDirectoryMeta {
    pathname: string;
    files: PlainFileMetaList;
}
interface FileType {
    suffix: string[];
    type: string;
    icon: string;
}
declare type PlainFileMetaList = PlainFileMeta[];
interface PlainDirectoryMap {
    [path: string]: PlainDirectoryMeta;
}
export { StorageService, StorageProvider, EphemeresConfig, ResolvedEphemeresConfig, ProviderMap, ProviderList, ProviderConfigs, ResolvedProviderConfig, UpyunConfig, TenConfig, PlainDirectoryMap, PlainFileMeta, PlainFileMetaList, FileType, };
