export interface IKnictClientBuilder {
    f?: Function;
    build(k: any): any;
}
export declare class KnictBasicClientBuilder implements IKnictClientBuilder {
    build(k: any): any;
}
export declare class KnictConsoleClientBuilder implements IKnictClientBuilder {
    build(k: any): any;
}
