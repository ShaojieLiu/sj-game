const __start = () => {
    drawPage('#canvas')
    drawMario('#mario')
    // drawWalking('#mario-walking')
}

const __main = () => {
    configInit()
    insertInit()
    loadData(__start)
    bindAll()
}

__main()