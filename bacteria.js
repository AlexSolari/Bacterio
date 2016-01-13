function Bacteria()
{
    this.id = Math.random();
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.radius = width/(height*2);
    this.speed = width/(height*2)/Math.sqrt(this.radius);

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

    Manager.Scene.Screen.innerHTML += '<div class="bacteria ' + this.className + '" id = "' + this.id + '"/>';

    this.DOM = {};
}

Bacteria.prototype.InitDOM = function () {
    this.DOM = document.getElementById(this.id);
}

Bacteria.prototype.Render = function () {
    var doubledRadius = this.radius * 2 + "px";

    this.DOM.style.top = this.y - this.radius + "px";
    this.DOM.style.left = this.x - this.radius + "px";
    this.DOM.style.height = doubledRadius;
    this.DOM.style.width = doubledRadius;
    this.DOM.style.borderRadius = doubledRadius;
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

    var Intersected = Manager.Scene.Entities.filter(function (another) {
        if (self.radius < another.radius || another.id == self.id || self.className == another.className)
            return false;

        var dx = self.x - another.x;
        var dy = self.y - another.y;
        dx = dx * dx + dy * dy;
        dy = self.radius + another.radius;

        return dx < dy * dy;
    });

    for (var i = 0; i < Intersected.length; i++) {

        Manager.AddPoints(this.className, Intersected[i].radius);

        var growthCount = Intersected[i].radius / this.radius;
        this.radius += growthCount;
        this.speed = width / (height * 2) / Math.sqrt(this.radius);

        Intersected[i].radius = width / (height * 2);
        Intersected[i].x = Math.floor(Math.random() * width);
        Intersected[i].y = Math.floor(Math.random() * height);
        Intersected[i].speed = Intersected[i].radius;

        Intersected[i].target = {};
        Intersected[i].target.x = Intersected[i].x;
        Intersected[i].target.y = Intersected[i].y;
    }


}