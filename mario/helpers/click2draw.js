/**
 * Created by liushaojie on 2017/8/30.
 */
const bindClickGet = () => {
    e('#canvas').addEventListener('click', ev => {
        // log('click on canvas', ev, ev.offsetX, ev.offsetY)
        const drawOffsetX = Math.floor(ev.offsetX / (8 * window.config.pixelSize))
        const drawOffsetY = Math.floor(ev.offsetY / (8 * window.config.pixelSize))
        window.config.drawOffset = {drawOffsetX, drawOffsetY}
        log(window.config.drawOffset)
    })
}

const bindClickDraw = (canvasId) => {
    e(canvasId).addEventListener('click', ev => {
        const x = Math.floor(ev.offsetX / (8 * window.config.pixelSize))
        const y = Math.floor(ev.offsetY / (8 * window.config.pixelSize))
        const dataX = window.config.drawOffset.drawOffsetX
        const dataY = window.config.drawOffset.drawOffsetY
        const btyeInBlock = 16
        const block = window.bytes.slice(window.config.byteNum + (dataY * 8 + dataX) * btyeInBlock)

        drawBlock(canvasId, block, x, y)
    })
}

const bindDiy = (canvasId) => {
    bindClickGet()
    bindClickDraw(canvasId)
}