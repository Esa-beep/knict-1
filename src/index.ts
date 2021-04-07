console.info('knict') 

function get(url: string) {
    console.log("get(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                get: url
            }
        }
        console.log("get(): called", target, propertyKey, descriptor); 
    }
} 


function path(path: string) {
    console.log("path(): evaluated");
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) { 
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict
            }
            if (targetMethod.knict.path == undefined) {
                targetMethod.knict.path = new Object()
            } 
            targetMethod.knict.path[path] = parameterIndex
        }
        console.log("path(): called", target, propertyKey, parameterIndex); 
    }
}


class Knict {

    static proxy:any = {}

    static funcs:any[] = []

    static create(cls:any):any {
        // console.log('Knict.create', typeof cls, cls )
        for (let x in cls) {
            console.info(typeof x)
            if (typeof cls[x] === 'function') {
                this.funcs.push(cls[x])
            }
        }
        // console.log('Knict.funcs', this.funcs )
        this.proxy = cls
        Knict.buildFuncProxy()
        return this.proxy
    }

    static buildFuncProxy() {
        this.funcs.forEach((func:any) => {
            // console.info('buildFuncProxy func', func)
            this.proxy['listRepos'] = function(){
                let args = arguments
                // func.knict.path.keys().forEach((path: string) => {
                   
                // })
                // console.info(func.knict.path)
                for (let path in func.knict.path) {
                    // console.info('buildFuncProxy path', path)
                    func.knict.get = func.knict.get.replace('{'+ path + '}', args[func.knict.path[path]])
                }
                
                // console.log('Knict call', 'listRepos')
                return (() => {
                    console.log('Knict', func.knict.get)
                })()
            }
        })
    }
}

class GitHubService {
    // @GET("users/{user}/repos")
    // listRepos(@Path("user") String user);
    @get("users/{user}/repos")
    listRepos(@path("user")user: string):any {}
}
const githubService = Knict.create(new GitHubService())  

githubService.listRepos('kfdykme') 
// Knict.create(new GitHubService()).listRepos()