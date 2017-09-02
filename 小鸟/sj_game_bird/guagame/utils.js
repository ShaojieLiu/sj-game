var e = sel => document.querySelector(sel)
var es = sel => Array.from(document.querySelectorAll(sel))

var log = console.log.bind(console)

Object.prototype.map = function(fun) {
    const keys = Object.keys(this)
    const result = {}
    objArr = keys.map(k => ({
        [k]: fun(this[k], k)
    })  )
    objArr.map(obj => Object.assign(result, obj))
    return result
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(o, b) {
    // var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}


const isIntersect = (a, b) => {
    // debugger
    // log(a, b)
    const aSpace = getSpace(a)
    const bSpace = getSpace(b)
    return get4points(aSpace).some(p => isPointIn(p, bSpace)) ||
        get4points(bSpace).some(p => isPointIn(p, aSpace))
}

const isPointIn = function(point, space) {
    return (
        point[0] > space.x1 &&
        point[0] < space.x2 &&
        point[1] > space.y1 &&
        point[1] < space.y2
    )
}

const getSpace = (instance) => {
    const a = instance
    return {
        x1: a.x,
        y1: a.y,
        x2: a.x + a.w,
        y2: a.y + a.h,
    }
}


const get4points = (space) => {
    const s = space
    return [
        [s.x1, s.y1],
        [s.x2, s.y1],
        [s.x1, s.y2],
        [s.x2, s.y2]
    ]
}
