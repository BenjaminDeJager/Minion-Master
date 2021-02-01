class Player{
  constructor(startFood, startRock, trickleFood, trickleRock, posX, posY) {

    this.myFood = startFood;
    this.myRock = startRock;
    this.foodIncome = trickleFood;
    this.rockIncome = trickleRock;

    console.log("startFood: "+startFood);
    console.log("startRock: "+startRock);
    console.log("trickleFood: "+trickleFood);
    console.log("trickleRock: "+trickleRock);

    this.timeBetweenUpdates = 1;
    this.timer = new Timer();
    this.timeSinceUpdate = 0;

    this.camX = posX;
    this.camY = posY;
    this.width = 1024;
    this.height = 768;

    this.selected = null;
    this.myName = "thePlayer";
  }

  updateMe() {
    this.timeSinceUpdate += this.timer.tick();

    //this is NOT the best implmentation of making the player not increment.
    if(this.timeSinceUpdate < this.timeBetweenUpdates) {
      //if its not been long enough since the last update
      //do nothing.
      return;
    } else {
      //if it HAS, then allow update and reset timeSinceUpdate.
      this.myFood += this.foodIncome * (this.timeSinceUpdate/this.timeBetweenUpdates);
      this.myRock += this.rockIncome * (this.timeSinceUpdate/this.timeBetweenUpdates);
      this.timeSinceUpdate = 0;
      //we need to make it so that the player's resource increment
      //gets multiplied by how much time has passed.
    }
  }

  drawMe(ctx) {
    //this can be where we update the resources displayed
    //make sure to round to integer.
    ctx.font = params.TILE_W_H/4 + 'px "test TEXT"';
    ctx.fillStyle = "White";
    ctx.fillText(("Food: " + Math.round(this.myFood) + " + "
      + Math.round(this.foodIncome) + " food/second"), params.TILE_W_H/4, params.TILE_W_H/4);
    ctx.fillText(("Rock: " + Math.round(this.myRock) + " + "
      + Math.round(this.rockIncome) + " rock/second"), params.TILE_W_H/4, params.TILE_W_H/4*2);

    ctx.fillText(("Selected: " + this.selected), params.TILE_W_H/4, params.TILE_W_H/4*3);
  }
}
