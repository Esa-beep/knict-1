import DemoIpcService from './DemoIpcService'
import * as KnictM from './Knict'
import * as KnictBuilder from './client/KnictClientBuidler'
import * as KnictBase from './KnictBase'

export = {
    ...KnictM,
    ...KnictBuilder,
    ...KnictBase,
    DemoIpcService
}