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
    Builder?: IKnictClientBuilder;
    static toggleLog: () => void;
    static builder(builder: IKnictClientBuilder): Knict;
    static init(conf: KnictConf): void;
    create<T>(basecls: T): T;
    buildFuncProxy(): void;
}
export {};
