import { IKnictClientBuilder } from "./client/KnictClientBuidler";
interface KnictConf {
    ipcRenderer?: any;
    addonInvoke?: Function;
    isOutputKnict?: boolean;
}
/**
 * 尝试搞个简化能自动生成对应文档的electron ipc方式
 */
export declare class Knict {
    proxy: any;
    funcs: any[];
    static ipc?: any;
    private static addonInvokeMethod?;
    static isOutputKnict: boolean;
    private Builder?;
    static builder(builder: IKnictClientBuilder): Knict;
    static init(conf: KnictConf): void;
    create<T>(basecls: T): T;
    buildFuncProxy(): void;
}
declare function get(url: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function path(path: string): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
declare function SendIpc(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function addon(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function str(key: string): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
declare function number(key: string): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
declare function cppParser(name: string): (target: any, propertyKey: string | symbol) => void;
interface ICppConfig {
    targetPath: string;
    tag: string;
}
declare function cppConfig(config: ICppConfig): (target: any, propertyKey: string | symbol) => void;
export { path, get };
export { SendIpc, addon, str, number };
export { cppParser, cppConfig, ICppConfig };
