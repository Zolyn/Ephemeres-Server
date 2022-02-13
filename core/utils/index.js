"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfigAndEnv = exports.deepMerge = exports.getFileTypeAndIcon = exports.transformBytes = exports.transformTime = exports.defineConfig = exports.awaitHelper = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
function defineConfig(config) {
    return config;
}
exports.defineConfig = defineConfig;
function awaitHelper(promise) {
    return promise
        .then((res) => ['', res])
        .catch((err) => [err, null]);
}
exports.awaitHelper = awaitHelper;
function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    else {
        return time.toString();
    }
}
function transformTime(time) {
    const rawDate = new Date(time * 1000);
    const year = rawDate.getFullYear();
    const month = rawDate.getMonth() + 1;
    const date = rawDate.getDate();
    const hour = rawDate.getHours();
    const minute = rawDate.getMinutes();
    const second = rawDate.getSeconds();
    return `${year}-${month}-${date} ${hour}:${formatTime(minute)}:${formatTime(second)}`;
}
exports.transformTime = transformTime;
function transformBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let result = '-';
    units.reduce((prev, val) => {
        if (!prev) {
            return prev;
        }
        const transformedBytes = parseFloat((bytes / prev).toFixed(2));
        if (transformedBytes < 1024 || val === 'GB') {
            result = `${transformedBytes} ${val}`;
            return 0;
        }
        return prev * 1024;
    }, 1);
    return result;
}
exports.transformBytes = transformBytes;
const fileTypeMap = [
    {
        suffix: ['txt', 'log', 'out'],
        type: 'text',
        icon: 'node-text',
    },
    {
        suffix: ['png', 'jpg', 'webm', 'gif'],
        type: 'image',
        icon: 'file-image',
    },
    {
        suffix: ['doc', 'docx'],
        type: 'word',
        icon: 'file-word',
    },
    {
        suffix: ['xls', 'xlsx', 'et'],
        type: 'excel',
        icon: 'file-excel',
    },
    {
        suffix: ['ppt', 'pptx'],
        type: 'powerpoint',
        icon: 'file-powerpoint',
    },
    {
        suffix: ['zip', 'rar', '7z', 'tar', 'gz', 'zst', 'lzma', 'iso', 'jar'],
        type: 'zip',
        icon: 'zip-box',
    },
    {
        suffix: ['mp4', 'mkv', 'wmv', 'flv'],
        type: 'video',
        icon: 'file-video',
    },
    {
        suffix: ['mp3', 'ogg', 'wav', 'aac'],
        type: 'music',
        icon: 'file-music',
    },
    {
        suffix: ['pdf'],
        type: 'pdf',
        icon: 'file-pdf',
    },
    {
        suffix: ['md'],
        type: 'markdown',
        icon: 'language-markdown',
    },
    {
        suffix: ['js'],
        type: 'javascript',
        icon: 'language-javascript',
    },
    {
        suffix: ['ts'],
        type: 'typescript',
        icon: 'language-typescript',
    },
    {
        suffix: ['vue'],
        type: 'vue',
        icon: 'vuejs',
    },
    {
        suffix: ['css'],
        type: 'css',
        icon: 'language-css-3',
    },
    {
        suffix: ['json'],
        type: 'json',
        icon: 'code-json',
    },
];
const transformedFileTypeMap = new Map(fileTypeMap
    .map((val) => val.suffix.map((suffix) => [suffix, val]))
    .flat());
function getFileTypeAndIcon(name) {
    const fileTypeObject = transformedFileTypeMap.get((0, path_1.extname)(name).slice(1));
    const normalFile = {
        suffix: [],
        type: 'file',
        icon: 'file-cloud',
    };
    return fileTypeObject !== null && fileTypeObject !== void 0 ? fileTypeObject : normalFile;
}
exports.getFileTypeAndIcon = getFileTypeAndIcon;
function deepMerge(target, merge) {
    const keys = [...new Set([...Object.keys(target), ...Object.keys(merge)])];
    const mergedObject = {};
    keys.map((key) => {
        var _a;
        if (typeof target[key] === 'object' && typeof merge[key] === 'object') {
            mergedObject[key] = deepMerge(target[key], merge[key]);
        }
        else {
            mergedObject[key] = (_a = merge[key]) !== null && _a !== void 0 ? _a : target[key];
        }
        return undefined;
    });
    return mergedObject;
}
exports.deepMerge = deepMerge;
function mergeConfigAndEnv(identity, config, envs) {
    const mergedConfig = {};
    Object.keys(envs).map((key) => {
        var _a;
        let mergedVal = envs[key];
        if (config) {
            mergedVal = (_a = envs[key]) !== null && _a !== void 0 ? _a : config[key];
        }
        if (mergedVal === undefined) {
            throw new common_1.InternalServerErrorException(`[${identity}]: Missing or improper value for prop: ${key}`);
        }
        mergedConfig[key] = mergedVal;
    });
    return mergedConfig;
}
exports.mergeConfigAndEnv = mergeConfigAndEnv;
//# sourceMappingURL=index.js.map