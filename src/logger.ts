
let isLogOpen = false

const logger: any = (() => {
    if (isLogOpen) {
        return console
    } else {
        return { log: () => { }, info: () => { }, error: () => { } }
    }
})()

logger.togglerLog = () => {
    isLogOpen = !isLogOpen
}

export {
    logger,
    isLogOpen
}