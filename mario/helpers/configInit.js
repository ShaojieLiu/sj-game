const configInit = () => {
    window.config = {
        pixelSize: 4,
        byteNum: 32768 + 16,
        marioSize: {
            w: 2,
            h: 4,
            s: 16,
        },
        marioIndex: 32784,
        marioId: 0,
        nes: 'mario.nes',
    }
    es('.config-val').forEach(ele => ele.innerHTML = window.config[ele.dataset.key])
}

const btnTemplate = (insertParam) => {
    const {text, key, step} = insertParam
    const t = `
        <span>${text}</span>
        <button class='config-btn' data-key='${key}' data-step='-${step}'>prev</button>
        <button class='config-btn' data-key='${key}'' data-step='${step}'>next</button>
        <span class='config-val' data-key='${key}''>${window.config[key]}</span>
            <br/>
`
    return t
}

const inputTemplate = (insertParam) => {
    const {text, key} = insertParam
    const t = `
        <span>${text}</span>
        <input class='config-input' data-key='${key}'/>
           <br/>
 `
    return t
}

const insertInit = () => {
    const insertBtnList = [
        {
            text: '页数',
            key: 'byteNum',
            step: 1024 / 16,
        },{
            text: 'marioIndex',
            key: 'marioIndex',
            step: 'window.config.marioSize.s',
        }
    ]
    insertBtnList.forEach(i => e('Config').insertAdjacentHTML('beforeend', btnTemplate(i)))
    const insertInputList = [
        {
            text: 'marioStep',
            key: 'marioSize.s',
        }, {
            text: 'marioW',
            key: 'marioSize.w',
        }, {
            text: 'marioH',
            key: 'marioSize.h',
        }
    ]
    insertInputList.forEach(i => e('Config').insertAdjacentHTML('beforeend', inputTemplate(i)))
}

const bindAll = () => {
    es('.config-btn').forEach(ele => {
        ele.addEventListener('click', ev => {
            const t = ev.target
            if (t.dataset.key) {
                const s = t.dataset.step
                // const step = typeof s === Number ? s : s
                eval(`window.config.${t.dataset.key} += ${s} * 16`)
                es('.config-val').forEach(ele => ele.innerHTML = window.config[ele.dataset.key])
                __update()
            }
        })
    })
    es('.config-input').forEach(ele => {
        ele.addEventListener('change', ev => {
            log(ev)
            const t = ev.target
            if (t.dataset.key) {
                eval(`window.config.${t.dataset.key} = ${Number(t.value)}`)
                es('.config-val').forEach(ele => ele.innerHTML = window.config[ele.dataset.key])
                __update()
            }
        })
    })
}
