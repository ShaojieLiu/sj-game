const __start = () => {
    drawPage('#canvas')
    drawMario('#mario')
    bindDiy('#mario')
    drawDiy('#diy1', 2, 4)
    drawDiy('#diy2', 2, 2)
    drawDiy('#diy3', 4, 2)
    // drawWalking('#mario-walking')
}

const __update = () => {
    drawPage('#canvas')
    drawMario('#mario')
}

const __main = () => {
    configInit()
    insertInit()
    loadData(__start)
    bindAll()
}

__main()