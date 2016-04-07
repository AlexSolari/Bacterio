function GameScene(width, height)
{
    this.Entities = [];
    var canvas = $("#canvas");
    canvas[0].width = width;
    canvas[0].height = height;
    this.Screen = canvas[0].getContext("2d");
    this.Screen.width = width;
    this.Screen.height = height;
}

GameScene.prototype.Add = function Add(entity) {
    this.Entities.push(entity);
}

GameScene.prototype.Clear = function Clear() {
    this.Entities = [];
    this.Screen.clearRect(0, 0, Game.ScreenWidth, Game.ScreenHeight);
}

GameScene.prototype.Update = function Update() {
    this.Entities.forEach(function EntityUpdate(entity) {
        entity.Update();
    });
}

GameScene.prototype.Render = function Render() {
    this.Screen.clearRect(0, 0, this.Screen.width, this.Screen.height);
    this.Entities.forEach(function EntityRender(entity) {
        entity.Render();
    });
}