export interface IKnictClientBuilder {
    build(k:any):any
}

class KnictClientBuilder implements IKnictClientBuilder {
    build(k:any):any {
        return (() => {
            console.info('KnictClientBuilder', 'build', k)
        })()
    }
}

