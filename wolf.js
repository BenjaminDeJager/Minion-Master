class Wolf {
    constructor(game, speed) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/wolfsheet1.png");
        this.mySearchingAnimator = new Animator(this.spritesheet, 320, 128, 64, 32, 4, 0.1, 0, false, true);
        this.myHuntingAnimator = new Animator(this.spritesheet, 320, 160, 64, 32, 4, 0.1, 0, false, true);
        this.myDeadAnimator = new Animator(this.spritesheet, 512, 202, 64, 32, 1, 0.1, 0, false, true);

        this.myTile = game.theMap.theGrid[1][1];
        //I could just make it so that this creature is only "initalized" when it has a tile....but I'm lazy
        this.theTileSize = game.theMap.tileSize
        this.theGrid = game.theMap.theGrid;
        this.myScale = 1;

        this.health = 100;
        this.defense = 0.0;
        this.attack = 3;
        this.dead = false;
        this.removeFromWorld = false;

        this.myName = "wolf";
        Object.assign(this, this.myName);

        this.timeBetweenUpdates = 1/speed;
        //this gives how long this minion will wait before moving.
        //note that its the inverse of the given speed stat.

        this.n = "n";
        this.e = "e";
        this.w = "w";
        this.s = "s";
        // (n, e, s, w) --> (up, right, down, left, diagonals don't exist)
        this.timer = new Timer();
        this.timeSinceUpdate = 0;
        this.isHunting = false;
        //wolves currently face east by default.
    };

//the move-speed is still staggered a bit, that might be because of async
//with the draw-method being called...may need to make the minion handle its own draw-update.
    updateMe() {
      this.timeSinceUpdate += this.timer.tick();

      //this is NOT the best implmentation of making this minion not move till its ready.
      if (this.timeSinceUpdate < this.timeBetweenUpdates) {
        //if its not been long enough since the last update
        //do nothing.
        return;
      } else {
        //if it HAS, then allow update and reset timeSinceUpdate.
        this.timeSinceUpdate = 0;
      }
      var environment = this.whatISee();
      // var myMove = this.findMyMove(0);
      var myMove = this.findMyMove(environment);
      this.makeMove(myMove, this.myTile);

    };

    //this function determines what this entity "sees"
    whatISee(){
      //wolves just search nearby tiles.
      return this.myTile.myNeighbors;
    }

    //this function determines what this entity does based on what it sees.
    //currently just gets a random Tilefrom the 9 tiles around it including its own.
    //and picks that as its move.
    findMyMove(tiles){
      //we want wolves to move towards any minions they see around themselves.
      var target = null;

      function isPrey(theEntity) {
        return theEntity instanceof Minion;
      }
      //we want to search every neighboring tile for minions.
      if(tiles) {
        tiles.forEach((tile) => {
          if(tile && tile.myEntitys.find(isPrey)) {
            target = tile;
            this.isHunting = true;
            //fight( Put prey entity here );
            //if we found prey, we are going to notate this state
            //by switching directions.

            //we already found our target, so we can stop the search.
            return;
          }
        })
      };

      if (!target) {
        //if we coulden't find a target, then act randomly
        //and switch our state to the default "e" if it is not
        //already that.
        this.isHunting = false;
        //keep randomly selecting values between (-1,0,1) till one doesn't go off the X-axis
        var newXCord = -1;
        var newYCord = -1;
        var changeX;
        var changeY;

        var myX = this.myTile.myX;
        var myY = this.myTile.myY;

        target = this.myTile; //if we somehow fail to randomly
        //pick a valid tile, return our own tile.

        var maxAttempts = 15;

        while(newXCord == -1 && newYCord == -1 && maxAttempts > 0) {
          changeX = Math.floor((Math.random() * 3))-1;
          changeY = Math.floor((Math.random() * 3))-1;
          if (this.myTile.isOnMap(myX+changeX, myY+changeY)==0){
            target = this.theGrid[myX+changeX][myY+changeY];
            break;
          } else {
            maxAttempts -= 1;
          }
        }
      }
      return target;
    };

    makeMove(newMove, oldMove) {
      if(newMove == oldMove) {
        //apparently we chose to do nothing?
      } else if (newMove) {
        //before we swap, we want to change our direction.

        //swap the old tile's reference to this entity to the new one.
        newMove.myEntitys.push(this);
        oldMove.myEntitys.splice(oldMove.myEntitys.indexOf(this), 1);
        //swap this entity's tile from the old one to the new one.
        this.myTile = newMove;
      }
    }

    // Engaging in combat with minions.
    fight(enemy) {
        if (enemy.health != 0 && this.health != 0) {
            enemy.health -= Math.floor(this.attack - (enemy.defense * this.attack));
            this.health -= Math.floor(enemy.attack - (this.defense * enemy.attack));
            if (enemy.health <= 0) {
                enemy.die();
            }
            if (this.health <= 0) {
                die();
            }
        }
    };

    damage(projectile) {
        // this.health -= Math.floor(projectile.attack - (this.defense * projectile.attack));
        // if (this.health <= 0) {
        //    die();
        // }
    };

    die() {
        this.dead = true;
        this.removeFromWorld = true;
        this.myTile = NULL;
    };

    drawMinimap(ctx, mmY, mmX) {
        ctx.fillStyle = "Grey";
        ctx.fillRect(mmX + this.myTile.myX / params.TILE_W_H, mmY + this.myTile.myY / params.TILE_W_H,
          params.TILE_W_H / 8, params.TILE_W_H / 8);
    };

    drawMe(ctx) {
      // console.log(this.one++);
      //use current "direction" to decide how to draw.
      // this.drawMinimap(ctx, this.myTile.myX + 1000, this.myTile.myY + 576);
      if (!this.dead) {
        if (this.isHunting) {
          this.myHuntingAnimator.drawFrame(this.game.clockTick, this.game.ctx,
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myX, //draw myX many Tiles right
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myY, //draw myY tiles down.
            1, this.myDirection);
        } else {
          this.mySearchingAnimator.drawFrame(this.game.clockTick, this.game.ctx,
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myX, //draw myX many Tiles right
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myY, //draw myY tiles down.
            1, this.myDirection);
        }
      } else {
          this.myDeadAnimator.drawFrame(this.game.clockTick, this.game.ctx,
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myX, //draw myX many Tiles right
            params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myY, //draw myY tiles down.
            1, this.myDirection);
      }
      if (this.isHunting) {
        this.myHuntingAnimator.drawFrame(this.game.clockTick, this.game.ctx,
          params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myX, //draw myX many Tiles right
          params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myY, //draw myY tiles down.
          this.myScale, this.myDirection
        );
      } else {
        this.mySearchingAnimator.drawFrame(this.game.clockTick, this.game.ctx,
          params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myX, //draw myX many Tiles right
          params.TILE_W_H*(3/2)+params.TILE_W_H*this.myTile.myY, //draw myY tiles down.
          this.myScale, this.myDirection
        );

      }

    };
}
