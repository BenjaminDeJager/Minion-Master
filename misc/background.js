class InteriorGrass {
    constructor(theGame, x, y) {
        Object.assign(this, { theGame, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ground_sprites.png");
        this.interiorX = Create2DArray(params.PLAY_HEIGHT / params.TILE_W_H - 2);
        this.interiorY = Create2DArray(params.PLAY_HEIGHT / params.TILE_W_H - 2);
        this.buildInterior();
    };

    updateMe() {
    };

    // drawImage(spritesheet, sx, sy, sw, sh, dx, dy, dw, dh)
    drawMe(ctx) {
      var sx, sy, dx, dy;
      for (var i = 0; i < params.PLAY_HEIGHT / params.TILE_W_H - 2; i++) {
        for (var j = 0; j < params.PLAY_WIDTH / params.TILE_W_H - 2; j++) {
          sx = this.interiorX[i][j];
          sy = this.interiorY[i][j];
          dx = this.x + j * params.TILE_W_H;
          dy = this.y + i * params.TILE_W_H;
          ctx.drawImage(this.spritesheet, sx, sy, params.TILE_W_H, params.TILE_W_H, dx - this.theGame.theCamera.x, dy - this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
        }
      }
    };

    buildInterior() {
      const intGrassX = [46, 110, 174, 110];
      const intGrassY = [1250, 1250, 1250, 1314];
      var intGrassSelection = randomInt(4);
      for (var i = 0; i < params.PLAY_HEIGHT / params.TILE_W_H - 2; i++) {
        for (var j = 0; j < params.PLAY_WIDTH / params.TILE_W_H - 2; j++) {
          this.interiorX[i][j] = intGrassX[intGrassSelection];
          this.interiorY[i][j] = intGrassY[intGrassSelection];
          intGrassSelection = randomInt(4);
        }
      }
    };
};

// This class draws the corners of the canvas for the theGame map.
// theGame: the current iteration of the GameEngine
// x: the origin point of the x (horizontal) cardinal direction for drawing
// y: the origin point of the y (vertical) cardinal direction for drawing
class Grasscorner {
    constructor(theGame, x, y) {
        Object.assign(this, { theGame, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ground_sprites.png");
    };

    updateMe() {

    };

    // drawImage(spritesheet, sx, sy, sw, sh, dx, dy, dw, dh)
    drawMe(ctx) {
        //top left corner
        ctx.drawImage(this.spritesheet, 0, 1216, params.TILE_W_H, params.TILE_W_H, 0 - this.theGame.theCamera.x, 0 - this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
        let yCanvasOrigin = params.PLAY_HEIGHT - params.TILE_W_H;
        let xCanvasOrigin = params.PLAY_WIDTH - params.TILE_W_H;

        //bottom left corner
        ctx.save();
        ctx.scale(1,-1);
        ctx.drawImage(this.spritesheet, 0, 1216, params.TILE_W_H, params.TILE_W_H, 0 - this.theGame.theCamera.x, -yCanvasOrigin - params.TILE_W_H + this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
        ctx.restore();

        //top right corner
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(this.spritesheet, 0, 1216, params.TILE_W_H, params.TILE_W_H, -xCanvasOrigin - params.TILE_W_H + this.theGame.theCamera.x, 0 - this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
        ctx.restore();

        //bottom right corner
        ctx.save();
        ctx.scale(-1,-1);
        ctx.drawImage(this.spritesheet, 0, 1216, params.TILE_W_H, params.TILE_W_H, -xCanvasOrigin - params.TILE_W_H + this.theGame.theCamera.x, -yCanvasOrigin - params.TILE_W_H + this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
        ctx.restore();
    };
};

// This class draws the along the walls of the canvas for the theGame map.
// theGame: the current iteration of the GameEngine
// x: the origin point of the x (horizontal) cardinal direction for drawing
// y: the origin point of the y (vertical) cardinal direction for drawing
class Vertwall {
    constructor(theGame, x, y) {
        Object.assign(this, { theGame, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ground_sprites.png");
    };

    updateMe() {

    };

    // drawImage(spritesheet, sx, sy, sw, sh, dx, dy, dw, dh)
    drawMe(ctx) {
      for (var i = 0; i < (params.PLAY_HEIGHT / params.TILE_W_H - 2); i++) {
          ctx.drawImage(this.spritesheet, 0, 1247, params.TILE_W_H, params.TILE_W_H, this.x - this.theGame.theCamera.x, this.y + i * params.TILE_W_H - this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);

          ctx.save();
          ctx.scale(-1,1);
          // The dx here is a copy of the one in Grasscorner above.
          // -(this.x + (params.CANVAS_WIDTH - params.TILE_W_H)) = -(0 + (1024 - 64)) - 64
          // First it flips the original image and puts it off the canvas. The -params.TILE_W_H(64px) shifts it left to be visible once more.
          ctx.drawImage(this.spritesheet, 0, 1247, params.TILE_W_H, params.TILE_W_H, -(this.x + (params.PLAY_WIDTH - params.TILE_W_H)) - params.TILE_W_H + this.theGame.theCamera.x,
                        this.y + i * params.TILE_W_H - this.theGame.theCamera.y, params.TILE_W_H, params.TILE_W_H);
          ctx.restore();
      }
    };
};

// This class draws the along the walls of the canvas for the theGame map.
// theGame: the current iteration of the GameEngine
// x: the origin point of the x (horizontal) cardinal direction for drawing
// y: the origin point of the y (vertical) cardinal direction for drawing
class Horiwall {
    constructor(theGame, x, y) {
        Object.assign(this, { theGame, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ground_sprites.png");
    };

    updateMe() {

    };

    // drawImage(spritesheet, sx, sy, sw, sh, dx, dy, dw, dh)
    // Top Wall
    drawMe(ctx) {
      for (var i = 0; i < params.PLAY_WIDTH / params.TILE_W_H - 2; i++) {
        ctx.save();
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(this.spritesheet, 0, 1247, params.TILE_W_H, params.TILE_W_H,
                      this.x - params.TILE_W_H - this.theGame.theCamera.y, //dx
                      (this.y - params.TILE_W_H * 2) - i * params.TILE_W_H + this.theGame.theCamera.x, //dy
                      params.TILE_W_H, params.TILE_W_H);

        // The dx here is a copy of the one in Grasscorner above.
        // -(this.x + (params.CANVAS_WIDTH - params.TILE_W_H)) = -(0 + (1024 - 64)) - 64
        // First it flips the original image and puts it off the canvas. The -64 shifts it left to be visible once more.
        // ctx.drawImage(this.spritesheet, 0, 1247, params.TILE_W_H, params.TILE_W_H, -(this.x - params.TILE_W_H) - params.TILE_W_H, params.CANVAS_HEIGHT + i * params.TILE_W_H, params.TILE_W_H, params.TILE_W_H);
        ctx.restore();
      }

      // Bottom Wall
      for (var i = 0; i < params.PLAY_WIDTH / params.TILE_W_H - 2; i++) {
        ctx.save();
        ctx.translate(params.TILE_W_H, params.PLAY_HEIGHT - params.TILE_W_H);
        ctx.rotate(3 * (Math.PI / 2));
        ctx.drawImage(this.spritesheet, 0, 1247, params.TILE_W_H, params.TILE_W_H, 0 - params.TILE_W_H + this.theGame.theCamera.y, 0 + i * params.TILE_W_H - this.theGame.theCamera.x, params.TILE_W_H, params.TILE_W_H);
        ctx.restore();
      }
    };

};
