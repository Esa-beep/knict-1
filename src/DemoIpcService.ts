import { SendIpc, addon, str, number, cppParser, cppConfig } from './Knict'
 
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
  ): any {}
 
}

export default DemoIpcService

