const __start = () => {
    drawPage('#canvas')
    drawMario('#mario')
    drawDiy('#diy1', 2, 4)
    // drawWalking('#mario-walking')
}

const __main = () => {
    configInit()
    insertInit()
    loadData(__start)
    bindAll()
}

__main()