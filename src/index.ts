import DemoIpcService from './DemoIpcService'
import Knict from './Knict'


const wedriveIpcInstance = Knict.create<DemoIpcService>(new DemoIpcService())

console.info(wedriveIpcInstance)
