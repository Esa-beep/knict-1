'ust strict'

const {assert, expect} = require('chai')
const { Knict, DemoIpcService, KnictConsoleClientBuilder } = require('../dist/src/index')
console.info('Knict Test Start')

console.info( KnictConsoleClientBuilder)

const knict = Knict.builder(new KnictConsoleClientBuilder())


describe('Just Try Console', () => {
    const demoIpcService = new DemoIpcService() 
    const demo = knict.create(demoIpcService)
    let hasX = false

    it('demo Function is ok', () => {
        for (let x in demo) {
            hasX  = true
            // console.info('x', x, typeof demoIpcService, typeof demoIpcService[x])
            // assert((demoIpcService + '') === 'DemoIpcService {}')
            // expect(typeof demoIpcService )
            console.info(demo[x], typeof demo[x])
            assert(typeof demo[x] === 'function')
        }
    })
    it('demo has X', () => {
        expect(hasX)
        assert(hasX)
    })

    it('demo openAbc', () => {
        const res  = demo.openAbc('', '', '', 0)
        // console.info('openAbc res', res)

        assert(res !== undefined)
    })


})