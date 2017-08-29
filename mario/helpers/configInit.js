const configInit = () => {
    window.config = {
        pixelSize: 3,
        byteNum: 32768 + 16,
        marioIndex: 32784,
        marioId: 0,
        nes: 'mario.nes',
    }
    es('.config-val').forEach(ele => ele.innerHTML = window.config[ele.dataset.key])
}

const btnTemplate = (insertParam) => {
    const {text, key, step} = insertParam
    const t = `
        <br/>
        <span>${text}</span>
        <button class='config-btn' data-key='${key}' data-value='-${step}'>prev</button>
        <button class='config-btn' data-key='${key}'' data-value='${step}'>next</button>
        <span class='config-val' data-key='${key}''>${window.config[key]}</span>
        <br/>
    `
    return t
}

const insertInit = () => {
    const insertList = [
        {
            text: '页数',
            key: 'byteNum',
            step: 1024,
        },{
            text: 'marioIndex',
            key: 'marioIndex',
            step: 128,
        }
    ]
    insertList.forEach(i => e('Config').insertAdjacentHTML('beforeend', btnTemplate(i)))
}

const bindAll = () => {
    es('.config-btn').forEach(ele => {
        ele.addEventListener('click', ev => {
            const t = ev.target
            if (t.dataset.key) {
                eval(`window.config.${t.dataset.key} += ${Number(t.dataset.value)}`)
                es('.config-val').forEach(ele => ele.innerHTML = window.config[ele.dataset.key])
                __start()
            }
        })
    })
}
