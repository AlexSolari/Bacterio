function Bacteria()
{
    this.id = ("bacterio-" + Math.random()).replace('.', '');
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.radius = width/(height*2);
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

    Manager.Scene.Screen.append('<div class="bacteria ' + this.className + '" id = "' + this.id + '"/>');

    this.DOM = {};
}

Bacteria.prototype.InitDOM = function () {
    this.DOM = $("#"+this.id);
}

Bacteria.prototype.Render = function () {
    var doubledRadius = this.radius * 2 + "px";

    var props = {
        "top" : this.y - this.radius + "px",
        "left" : this.x - this.radius + "px",
        "height" : doubledRadius,
        "width" : doubledRadius,
        "border-radius" : doubledRadius,
    };

    this.DOM.css(props);
}

Bacteria.prototype.Update = function () {

    var outOfScreen = (this.x >= width - this.radius) || (this.y >= height - this.radius) || (this.x <= this.radius) || (this.y <= this.radius);
    var targetReached = this.vector.DistanceFromEnd(this.x, this.y) < 1;

    if (Manager.BlackHoleEnabled) {
        this.target.x = Cursor.x;
        this.target.y = Cursor.y;
        this.vector = new Vector(this.x, this.y, this.target.x, this.target.y, Manager.BlackHolePower);
    }
    else if (outOfScreen || targetReached) {
        this.target.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.target.y = Math.random() * (height - this.radius * 2) + this.radius;
        this.vector = new Vector(this.x, this.y, this.target.x, this.target.y);
    }

    this.x += this.vector.dX * this.speed;
    this.y += this.vector.dY * this.speed;

    var self = this;

    var Nearest = Manager.Scene.Entities.filter(function (another) {
        return self.x * 2 > another.x || self.x / 2 < another.x || self.y * 2 > another.y || self.y / 2 < another.y;
    });

    var Intersected = Nearest.filter(function (another) {
        if (self.radius < another.radius || another.id == self.id || self.className == another.className)
            return false;

        var dx = self.x - another.x;
        var dy = self.y - another.y;
        dx = dx * dx + dy * dy;
        dy = self.radius + another.radius;

        return dx < dy * dy;
    });

    for (var index in Intersected) {
        var Entity = Intersected[index];

        Manager.AddPoints(this.className, Entity.radius);

        var growthCount = Entity.radius / this.radius;
        this.radius += growthCount;

        if (this.speed > 1)
            this.speed = this.speed - growthCount * growthCount;
        if (this.speed < 1)
            this.speed = 1;

        Entity.radius = width / (height * 2);
        Entity.x = Math.floor(Math.random() * width);
        Entity.y = Math.floor(Math.random() * height);
        Entity.speed = Entity.radius * 2;

        Entity.target = {};
        Entity.target.x = Entity.x;
        Entity.target.y = Entity.y;
    }
}