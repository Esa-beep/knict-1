'ust strict'

const assert = require('chai').assert
const { Knict, DemoIpcService, KnictConsoleClientBuilder } = require('../dist/src/index').Knict
console.info('Knict Test Start')

console.info( KnictConsoleClientBuilder)

Knict.builder(KnictConsoleClientBuilder())


describe('Just Try Console', () => {
    it('demo Function is ok', () => {
        const demoIpcService = DemoIpcService()
        console.info(demoIpcService)
        const demo = Knict.create(demoIpcService)
        for (let x in demoIpcService) {
            // console.info('x', x, typeof demoIpcService, typeof demoIpcService[x])
            // assert((demoIpcService + '') === 'DemoIpcService {}')
            // expect(typeof demoIpcService )
            assert(typeof demo[x] === 'function')
        }
        console.info(demo)
    })
})