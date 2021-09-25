'ust strict'

const assert = require('chai').assert
const { Knict, DemoIpcService, KnictConsoleClientBuilder } = require('../dist/src/index').default
console.info('Knict Test Start')

Knict.builder(new KnictConsoleClientBuilder())


describe('Just Try Console', () => {
    it('demo Function is ok', () => {
        const demoIpcService = new DemoIpcService()
        console.info(demoIpcService)
        const demo = Knict.create(demoIpcService)
        for(let x in demoIpcService) {
            // console.info('x', x, typeof demoIpcService, typeof demoIpcService[x])
            // assert((demoIpcService + '') === 'DemoIpcService {}')
            // expect(typeof demoIpcService )
            assert(typeof demo[x] === 'function')
        }
        console.info(demo)
    })
})