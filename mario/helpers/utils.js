const e = sel => document.querySelector(sel)
const es = sel => Array.from(document.querySelectorAll(sel))
const log = console.log.bind(console)

const resizeAndClear = (canvas, w, h) => {
    e(canvas).width = w * window.config.pixelSize * 8
    e(canvas).height = h * window.config.pixelSize * 8
    e(canvas).getContext('2d').clearRect(0, 0, 999, 999)
}