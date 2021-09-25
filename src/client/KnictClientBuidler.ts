export interface IKnictClientBuilder {
    build(k:any):any
}

export class KnictConsoleClientBuilder implements IKnictClientBuilder {
    build(k:any):any {
        return (() => {
            console.info('KnictClientBuilder', 'build', k)
        })()
    }
}

