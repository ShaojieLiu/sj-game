const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = ev => {
        if (r.readyState === 4) {
            request.cb(r.response)
        }
    }
    r.send()
}

const loadData = next => {
    let request = {
        url: `./res/${window.config.nes}`,
        cb(r) {
            window.bytes = new Uint8Array(r)
            next()
        }
    }
    ajax(request)
}
