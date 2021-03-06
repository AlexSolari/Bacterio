function Bacteria()
{
    this.id = ("bacterio-" + Math.random()).replace('.', '');
    this.x = Math.random() * Game.ScreenWidth;
    this.y = Math.random() * Game.ScreenHeight;
    this.radius = Game.ScreenWidth/(Game.ScreenHeight*2) + 1;
    this.speed = this.radius * 2;
    this.target = {};
    this.target.x = this.x;
    this.target.y = this.y;
    this.vector = new Vector(this.x, this.y, this.target.x, this.target.y);   
    this.className = (function () {
        var seed = Math.random();
        if (seed < 0.2) return "sun";
        else if (seed < 0.4) return "eco";
        else if (seed < 0.6) return "sky";
        else if (seed < 0.8) return "rose";
        return "deep";
    })();
    this.color = this.GetColor();
}

Bacteria.prototype.GetColor = function GetColor() {
    switch (this.className) {
        case "sun":
            return "#ffe029";
        case "sky":
            return "#36fff3";
        case "eco":
            return "#3dff00";
        case "rose":
            return "#ff0400";
        case "deep":
            return "#ff00e1";
        default:
            return "white";
    }
}

Bacteria.prototype.DistanceToTarget = function DistanceToTarget() {
    return Math.sqrt((this.x - this.target.x) * (this.x - this.target.x) + (this.y - this.target.y) * (this.y - this.target.y));
}

Bacteria.prototype.Render = function Render() {
    Game.Scene.Screen.beginPath();
    Game.Scene.Screen.globalCompositeOperation = 'source-over'
    Game.Scene.Screen.arc(this.x, this.y, this.radius-1, 0, 2 * Math.PI);
    Game.Scene.Screen.fillStyle = this.color;
    Game.Scene.Screen.fill();
    Game.Scene.Screen.closePath();
}

Bacteria.prototype.Update = function Update() {
    var outOfScreen = (this.x >= Game.ScreenWidth - this.radius) || (this.y >= Game.ScreenHeight - this.radius) || (this.x <= this.radius) || (this.y <= this.radius);
    var targetReached = this.DistanceToTarget() < 1;

    if (Game.BlackHoleEnabled) {
        this.target = Game.Cursor;
        this.vector = new Vector(this.x, this.y, this.target.x, this.target.y, Game.BlackHolePower);
    }
    else if (outOfScreen || targetReached) {
        this.target.x = Math.random() * (Game.ScreenWidth - this.radius * 2) + this.radius;
        this.target.y = Math.random() * (Game.ScreenHeight - this.radius * 2) + this.radius;
        this.vector = new Vector(this.x, this.y, this.target.x, this.target.y, this.speed);
    }

    this.x += this.vector.dX;
    this.y += this.vector.dY;

    var self = this;

    var Nearest = Game.Scene.Entities.filter(function FindNearest(another) {
        return self.x * 2 > another.x && self.x / 2 < another.x && self.y * 2 > another.y && self.y / 2 < another.y;
    });

    var Intersected = Nearest.filter(function FindIntersected(another) {
        if (self.radius < another.radius || another.id == self.id || self.className == another.className)
            return false;

        var dx = self.x - another.x;
        var dy = self.y - another.y;
        dx = dx * dx + dy * dy;
        dy = self.radius + another.radius;

        return dx < dy * dy;
    });

    Intersected.forEach(function ProceedIntersected(Entity) {
        Game.AddPoints(self.className, Entity.radius);

        var growthCount = Entity.radius / self.radius;
        self.radius += growthCount;

        if (self.speed > 1)
            self.speed = self.speed - growthCount * growthCount;
        if (self.speed < 1)
            self.speed = 1;

        Entity.radius = Game.ScreenWidth / (Game.ScreenHeight * 2) + 1;
        Entity.x = Math.random() * Game.ScreenWidth;
        Entity.y = Math.random() * Game.ScreenHeight;
        Entity.speed = Entity.radius * 2;

        Entity.target = {};
        Entity.target.x = Entity.x;
        Entity.target.y = Entity.y;

        Entity.Render();
    });
}