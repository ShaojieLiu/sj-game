var Editor = function (game) {
    var e = {
        game,
        blocks: [],
        tempBlock: [],
    }
    e.draw = function() {
        // draw 背景
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)
        // draw
        //
        // game.drawImage(paddle)
        // game.drawImage(ball)
        //
        // draw blocks
        let blocks = [].concat(e.blocks, [e.tempBlock])
        blocks = blocks.map((data) => Block(game, data))
        // console.log(blocks)
        blocks.forEach((b) => game.drawImage(b))


        // draw labels
        // game.context.fillText('分数: ' + score, 10, 290)
        game.context.fillText('点击空白区域, 创建新砖块', 100, 190)
        game.context.fillText('按数字 0 键开始测试关卡', 100, 210)
    }
    e.addBlock = function() {

    }
    e.update = function() {

    }
    // mouseEvent
    //
    // a following block
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        e.tempBlock = [x, y, 1]
    })
    game.canvas.addEventListener('click', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        e.blocks.push([x, y, 1])
    })
    game.registerAction('0', function(){
        const b = e.blocks.map((data) => Block(game, data))
        var s = Scene(game, {blocks: b})
        game.replaceScene(s)
    })
    return e

}
