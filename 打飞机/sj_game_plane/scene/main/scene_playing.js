class ScenePlaying extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.bg = GuaImage.new(game, 'background')
    }
    // 初始化
    draw() {
        this.game.drawImage(this.bg)
    }
}
