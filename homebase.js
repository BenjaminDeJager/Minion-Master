class HomeBase {
    constructor(game, x, y, w, h) {
        Object.assign(this, {game, x, y, w, h });

        this.game.homebase = this;
        this.myName = "HomeBase";

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/castle.png");

        this.state = 0;  // 0 = idle, 1 = destroyed
        this.health = 200;
        this.defense = 0.0;
        this.dead = false;

        this.removeFromWorld = false;


        this.xOriginLoc = x;
        this.yOriginLoc = y;
        this.baseWidth = w;
        this.baseHeight = h;

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
         // idle animation for state = 0
         this.animations[0] = new Animator(this.spritesheet, 0, 0, this.baseWidth, this.baseHeight, 1, 1, 0, false, true);
         // this.animations[1] = some other sprite that represents a destroyed home base (wreckage)
    }

    updateMe() {

        // add more code here later about speed and physics
    }

    die() {
        this.dead = true;
        this.removeFromWorld = true;
        this.myTile = NULL;
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Red";
        ctx.fillRect(mmX + this.xOriginLoc / params.TILE_W_H, mmY + this.yOriginLoc / params.TILE_W_H,
          params.TILE_W_H / 4, params.TILE_W_H / 4);
    };

    drawMe(ctx) {
        this.drawMinimap(ctx, this.xOriginLoc, this.yOriginLoc);
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.xOriginLoc, this.yOriginLoc, 0.5);
    };

}
