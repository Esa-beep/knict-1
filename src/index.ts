import DemoIpcService from './DemoIpcService'
import Knict from './Knict'
import { KnictConsoleClientBuilder } from './client/KnictClientBuidler'


Knict.builder(new KnictConsoleClientBuilder())
const wedriveIpcInstance = Knict.create<DemoIpcService>(new DemoIpcService())


wedriveIpcInstance.openAbc("", "", "", 0)
