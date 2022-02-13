"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("./core/utils");
let AppService = class AppService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async readConfig() {
        const [_, { default: { storageProviders, fullRetrieve = true }, },] = await (0, utils_1.awaitHelper)(Promise.resolve().then(() => require('./core/config')));
        if (!storageProviders) {
            throw new common_1.InternalServerErrorException('No storage provider was found');
        }
        const providersMap = new Map();
        if (Array.isArray(storageProviders)) {
            storageProviders.map((provider) => {
                providersMap.set(provider.name, provider.config);
            });
        }
        else {
            providersMap.set(storageProviders.name, storageProviders.config);
        }
        return { providersMap, fullRetrieve };
    }
    async getProviderConfig(path) {
        const { providersMap, fullRetrieve } = await this.readConfig();
        if (providersMap.has(path)) {
            return { providerConfig: providersMap.get(path), fullRetrieve };
        }
        else {
            throw new common_1.InternalServerErrorException('The specific provider is not configured.');
        }
    }
    async tryGetCache(key, service, resolvedProviderConfig) {
        const cache = await this.cacheManager.get(key);
        if (cache) {
            console.log(`Sending cache for ${key}`);
            return cache;
        }
        return await this.cacheManager.set(key, await service.main(resolvedProviderConfig), { ttl: 60 });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map