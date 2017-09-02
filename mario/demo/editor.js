/**
 * Created by liushaojie on 2017/9/2.
 */

const configInit = () => {
    window.config = {}
}

const __main = () => {
    configInit()
    const images = {
        brick1: './res/img/brick1.png',
        brick2: './res/img/brick2.png',
        brick3: './res/img/brick3.png',
        brick4: './res/img/brick4.png',
    }
    const afterLoad = () => {
        log('图片载入成功,游戏开始')
        game.replaceScene(sceneEditor)
    }
    const game = new EgGame(30, images, afterLoad)
    const itemCanvas = e('#itemPackage')
    const sceneCanvas = e('#editingScene')
    const sceneEditor = new SceneEditor(game, itemCanvas, sceneCanvas)
}