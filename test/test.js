'ust strict'

const {assert, expect} = require('chai')
const { Knict, DemoIpcService, KnictConsoleClientBuilder } = require('../dist/src/index')
console.info('Knict Test Start')

console.info( KnictConsoleClientBuilder)

Knict.builder(new KnictConsoleClientBuilder())


describe('Just Try Console', () => {
    const demoIpcService = new DemoIpcService() 
    const demo = Knict.create(DemoIpcService)
    let hasX = false
    console.info(demo)

    it('demo Function is ok', () => {
        for (let x in demo) {
            hasX  = true
            // console.info('x', x, typeof demoIpcService, typeof demoIpcService[x])
            // assert((demoIpcService + '') === 'DemoIpcService {}')
            // expect(typeof demoIpcService )
            assert(typeof demo[x] === 'function')
        }
    })
    it('demo has X', () => {
        expect(hasX)
        assert(hasX)
    })
})