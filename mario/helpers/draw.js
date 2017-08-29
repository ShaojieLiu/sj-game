window.couters = {};
const drawPixel = (canvas, p, offsetX, offsetY) => {
    const pixelSize = window.config.pixelSize
    const colors = [
        '0',
        '#fe0000',
        '#ffcc66',
        '#663300',
    ]
    const x = (offsetX) * pixelSize
    const y = (offsetY) * pixelSize
    const x2 = x + pixelSize
    const y2 = y + pixelSize
    const color = colors[Number(p)]
    const ctx = e(canvas).getContext('2d')
    const key = canvas + '-' + x + '-' + y;
    if(couters[key] === undefined){
        couters[key] = 0
    }
    couters[key] = couters[key] + 1;
    if (color !== '0') {
        ctx.fillStyle = color
        ctx.fillRect(x, y, x2, y2)
    }else{
        ctx.clearRect(x, y, x2, y2)
    }
}

const drawBlock = (canvas, block, offsetX, offsetY) => {
    offsetX *= 8
    offsetY *= 8
    for (let i = 0; i < 8; i++) {
        const p1 = block[i]
        const p2 = block[i + 8]
        for(let j = 0; j < 8; j++) {
            const c1 = (p1 >> (7 - j)) & 0b00000001
            const c2 = (p2 >> (7 - j)) & 0b00000001
            const p = c2 << 1 | c1
            const x = offsetX + j
            const y = offsetY + i
            drawPixel(canvas, p, x, y)
        }
    }
}

const getPage = (bytes) => {
    const index = window.config.byteNum
    return Array.from(bytes).slice(0).splice(index, 1024)
}

const drawPage = (canvas) => {
    const page = getPage(window.bytes)
    log('page', page, page.length)
    const w = 2
    const h = 8
    e(canvas).width = w * window.config.pixelSize * 8
    e(canvas).height = h * window.config.pixelSize * 8
    e(canvas).getContext('2d').clearRect(0, 0, 999, 999)
    let index = 0
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const block = page.slice(0).splice(index, 16)
            drawBlock(canvas, block, j, i)
            index += 16
        }
    }
}

const drawMario = (canvas, marioIndex) => {
    const w = 2
    const h = 4
    e(canvas).width = w * window.config.pixelSize * 8
    e(canvas).height = h * window.config.pixelSize * 8
    e(canvas).getContext('2d').clearRect(0, 0, 999, 999)
    marioIndex = marioIndex || window.config.marioIndex
    const data = Array.from(bytes).slice(0).splice(marioIndex, 128)
    let index = 0
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const block = data.slice(0).splice(index, 16)
            drawBlock(canvas, block, j, i)
            index += 16
        }
    }
}

const drawWalking = (canvas) => {
    let index = 0
    clearInterval(window.config.marioId)
    window.config.marioId = setInterval(() => {
        drawMario(canvas, 32784 + index * 128)
        index++
        if (index === 3) {index = 0}
    }, 1000 / 5)
}
