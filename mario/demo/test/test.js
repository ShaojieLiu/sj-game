/**
 * Created by liushaojie on 2017/9/4.
 */
/**
 * Created by liushaojie on 2017/9/2.
 */

const bindAll = () => {
    es('.auto-btn').map(btn => btn.addEventListener('click', ev => {
        const t = ev.target
        const key = t.dataset.key
        const step = t.dataset.step
        eval(`${key} = Number(${key}) + Number(${step})`)
    }))
}

const configInit = () => {
    window.config = {}
    bindAll()
}

const __main = () => {
    configInit()
    const images = {
        brick1: './res/img/brick1.png',
        brick2: './res/img/brick2.png',
        brick3: './res/img/brick3.png',
        brick4: './res/img/brick4.png',

        mario_s0: './res/img/mario_s0.png',
        mario_s1: './res/img/mario_s1.png',
        mario_s2: './res/img/mario_s2.png',

        mario1: './res/img/mario1.png',
        mario2: './res/img/mario2.png',
        mario3: './res/img/mario3.png',
        mario4: './res/img/mario4.png',
        mario5: './res/img/mario5.png',
        mario6: './res/img/mario6.png',
    }
    const afterLoad = () => {
        log('图片载入成功,游戏开始')
        game.replaceScene(sceneEditor)
    }
    const game = new EgGame(30, images, afterLoad)
    const sceneCanvas = e('#testScene')
    const sceneEditor = new SceneTest(game, sceneCanvas)
}