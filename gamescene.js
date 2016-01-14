function GameScene()
{
    this.Entities = [];
    this.Screen = $("#canvas");
}

GameScene.prototype.Add = function(entity) {
    this.Entities.push(entity);
}

GameScene.prototype.Clear = function () {
    this.Entities = [];
}

GameScene.prototype.Update = function() {
    this.Entities.forEach(function (entity) {
        entity.Update();
    });
}

GameScene.prototype.Render = function () {
    this.Entities.forEach(function (entity) {
        entity.Render();
    });
}

GameScene.prototype.Initialize = function () {
    this.Screen.html('<div id="fpsMeter"></div>\
                      <div class="skyLabel">Team SKY: <span id="sky">0</span></div>\
                      <div class="ecoLabel">Team ECO: <span id="eco">0</span></div>\
                      <div class="sunLabel">Team SUN: <span id="sun">0</span></div>\
                      <div class="deepLabel">Team DEEP: <span id="deep">0</span></div>\
                      <div class="roseLabel">Team ROSE: <span id="rose">0</span></div>');
}

GameScene.prototype.InitializeEntitiesDOM = function () {
    this.Entities.forEach(function (entity) {
        entity.InitDOM();
    });
}