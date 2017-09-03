const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = request.responseType
    r.onreadystatechange = ev => {
        if (r.readyState === 4) {
            request.cb(r.response)
        }
    }
    r.send()
}

const loadData = (next, url, type) => {
    let request = {
        url: url || `./res/${window.config.nes}`,
        responseType: type || 'arraybuffer',
        cb(r) {
            if (!type) {window.bytes = new Uint8Array(r)}
            next(r)
        },
    }
    ajax(request)
}
