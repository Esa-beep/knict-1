
import * as KnictBase from './KnictBase'
import { logger } from './logger'


function addon() {
    logger.log('Knict addon(): evaluated')
    return KnictBase.BaseAnotaionForFunction((targetMethod: KnictBase.IDataTargetMethod, propertyKey: string) => {
        targetMethod.knict = {
            ...targetMethod.knict,
            name: propertyKey,
            platform: 'electron',
            res: targetMethod()
        }
    })
}

function str(key: string) {
    logger.log('Knict str(): evaluated')
    return KnictBase.BaseAnotaionForParam((targetMethod: KnictBase.IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number) => {
        let str: any = {}
        str[key] = parameterIndex
        return {
            data: {
                str
            }
        }
    })
}

function number(key: string) {
    logger.log('Knict number(): evaluated')
    return KnictBase.BaseAnotaionForParam((targetMethod: KnictBase.IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number) => {
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object()
        }
        if (targetMethod.knict.data.number == undefined) {
            targetMethod.knict.data.number = new Object()
        }
        targetMethod.knict.data.number[key] = parameterIndex
    })
}

class DemoIpcService {
    /** 
     *
     * @param spaceId
     * @param folderId
     * @param fileId
     * @param scence
     */
    @addon()
    openAbc(
        @str('aa') spaceId: string,
        @str('bb') folderId: string,
        @str('cc') fileId: string,
        @number('dd') scence: number
    ): any { }

}

export default DemoIpcService

