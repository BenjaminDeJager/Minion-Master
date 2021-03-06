class HomeBase {
  constructor(theGame, x, y) {
      Object.assign(this, {theGame, x, y});

      this.camera = this.theGame.theSM; //theSM is the game's camera.
      this.thePlayer = this.camera.thePlayer;
      this.myType = "HOMEBASE";
      this.myFaction = "friendly";
      this.description = "you will lose if this is destroyed!"

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/castle.png");
      this.castleAnim = new Animator(this.spritesheet, 0, 0, 430, 461, 1, 1, 0, false, true);
      this.state = 1;  // 1 = idle, 0 = destroyed
      this.isSelected = false;

      //Stats
      this.maxHealth = 200;
      this.health = 200;
      this.defense = 12;
      this.attack = 0;
      this.projectileScale = 1;

      this.baseWidth = this.castleAnim.width;
      this.baseHeight = this.castleAnim.height;
      this.scale = 0.4;
      this.radius = Math.floor(this.castleAnim.width*this.scale / 2);
      this.center = {
        x: this.x + this.baseWidth*this.scale/2,
        y: this.y + this.baseHeight*this.scale/2
      }

      this.animations = [];
      this.loadAnimations();
      this.isSelected = false;
      this.myHealthBar = new HealthBar(this.theGame, this);
      this.battle = false;
      this.agility = 1;
  };

  loadAnimations() {
      this.animations[0] = new Animator(this.spritesheet, 0, 0, this.baseWidth, this.baseHeight, 1, 1, 0, false, true);
  };

  updateMe() {
    if (this.health <= 0) {
      this.theGame.theSM.notDead = false;
      this.state = -1;
    }

    this.isSelected = (this.thePlayer.selected == this);

    this.center = {
      x: this.x + this.baseWidth*this.scale/2,
      y: this.y + this.baseHeight*this.scale/2
    }

    for (var i = 0; i < this.theGame.entities.length; i++) {
        var ent = this.theGame.entities[i];
        if ((ent instanceof Wolf || ent instanceof Ogre || ent instanceof Dragon) &&
              canSee(this, ent) && this.elapsedTime > 1 / this.agility && this.battle) {
            this.elapsedTime = 0;
            this.theGame.addEntity(new Projectile(this.theGame, this.x, this.y, ent, this.attack, this.projectileScale));
        }
    }
    // add more code here later about speed and physics
  };

  upgrade() {
      this.maxHealth *= 2;
      this.health = this.maxHealth;
      this.defense *= 2;
      this.attack = 50;
      if (!this.offense) {
        this.offense = true;
      } else {
        this.agility++;
      }
  };

  drawMe(ctx) {
    if(this.state == 1) {

      this.animations[0].drawFrame(this.theGame.clockTick, ctx, this.x - this.camera.x, this.y - this.camera.y, this.scale);

      if(params.DEBUG || this.isSelected) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(this.center.x - this.camera.x, this.center.y - this.camera.y, this.radius, 0, 2*Math.PI);
        ctx.stroke();
      }

      this.myHealthBar.drawMe(ctx, this.health, this.maxHealth, "health");
    }
  };

  drawMinimap(ctx, mmX, mmY, mmW, mmH) {
    let x = mmX + (this.center.x)*(mmW/params.PLAY_WIDTH);
    let y = mmY + (this.center.y)*(mmH/params.PLAY_HEIGHT);
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(x-12.5, y-12.5, 25, 25);
    ctx.restore();
  };
};
