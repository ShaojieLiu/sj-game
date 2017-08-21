class GuaImage {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.w
        this.h = this.texture.h
    }
    static new(game, name) {
        return new this(game, name)
    }
    draw() {

    }
    update() {

    }
}

class Player extends GuaImage {
    constructor(game, name) {
        super(game, name)

    }
}
