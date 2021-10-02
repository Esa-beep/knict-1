export interface IKnictClientBuilder {
    f?: Function
    build(k:any):any
}

export class KnictBasicClientBuilder implements IKnictClientBuilder {
    
    
    build(k: any) :any {
        return (() => {
            return k
        })()
    }
}

export class KnictConsoleClientBuilder implements IKnictClientBuilder {
    build(k:any):any {
        return (() => {
            console.info('KnictConsoleClientBuilder', 'console', k)
            return k
        })()
    }
}

