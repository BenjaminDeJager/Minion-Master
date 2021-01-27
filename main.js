var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/human_regular.png");
ASSET_MANAGER.queueDownload("./sprites/wolfsheet1.png");
ASSET_MANAGER.queueDownload("./sprites/castle.png");
ASSET_MANAGER.queueDownload("./sprites/ground_sprites.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	let castle = new HomeBase(gameEngine, 0, 0);
	let corners = new Grasscorner(gameEngine, 0, 0);
	let vertwalls = new Vertwall(gameEngine, 0, params.TILE_W_H);
	let horiwalls = new Horiwall(gameEngine, params.TILE_W_H, 0);
	let intGrass = new InteriorGrass(gameEngine, params.TILE_W_H, params.TILE_W_H);


	gameEngine.init(ctx, 15, 12, 64);
  ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(corners);
	gameEngine.addEntity(vertwalls);
	gameEngine.addEntity(horiwalls);
	gameEngine.addEntity(intGrass);
	gameEngine.addEntity(castle);

  	//in order:
	//spawn x,y
	//intelligence NOT ACTUALLY IMPLEMENTED!
	//speed
	gameEngine.createANDSpawnMinion(2,2,0,1,"minion"); //muuuhhhhhhh
	gameEngine.createANDSpawnMinion(2,2,0,2,"minion");
	gameEngine.createANDSpawnMinion(2,2,0,4,"minion");
	gameEngine.createANDSpawnMinion(2,2,0,8,"minion");
	gameEngine.createANDSpawnMinion(2,2,0,16,"minion");
	// gameEngine.createANDSpawnMinion(2,2,0,1000,"minion"); //AAAAAAAAAAHHHHHHHHHHHHH
	gameEngine.createANDSpawnMinion(2,2,0,4,"wolf");
	gameEngine.createANDSpawnMinion(2,2,0,2,"wolf");

	gameEngine.start();
});
