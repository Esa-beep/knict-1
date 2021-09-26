import DemoIpcService from './DemoIpcService'
import * as KnictM from './Knict'
import * as KnictBuilder from './client/KnictClientBuidler'


export = {
    ...KnictM,
    ...KnictBuilder,
    DemoIpcService
}