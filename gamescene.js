function GameScene()
{
    this.Entities = [];
    this.Screen = document.getElementById("canvas");
}

GameScene.prototype.Add = function(entity) {
    this.Entities.push(entity);
}

GameScene.prototype.Clear = function (entity) {
    this.Entities = [];
}

GameScene.prototype.Update = function() {
    this.Entities.forEach(function (entity) {
        entity.Update();
        entity.Render();
    });
}

GameScene.prototype.Initialize = function () {
    this.Screen.innerHTML =
           '<div id="fpsMeter"></div>\
                     <div class="skyLabel">Team SKY: <span id="sky">0</span></div>\
                     <div class="ecoLabel">Team ECO: <span id="eco">0</span></div>\
                     <div class="sunLabel">Team SUN: <span id="sun">0</span></div>\
                     <div class="deepLabel">Team DEEP: <span id="deep">0</span></div>\
                     <div class="roseLabel">Team ROSE: <span id="rose">0</span></div>';
}

GameScene.prototype.InitializeEntitiesDOM = function () {
    this.Entities.forEach(function (entity) {
        entity.InitDOM();
    });
}