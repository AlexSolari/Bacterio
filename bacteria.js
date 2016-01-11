function Direction(x1,y1,x2,y2, limit){
    limit = limit || 1;

    this.Distance = function (x1, y1) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    this.dX = x2 - x1;
    this.dY = y2 - y1;

    var EPSILON = 0.001;
    while ((this.dX * this.dX + this.dY * this.dY) > limit*limit)
    {
        this.dX *= 0.9;
        this.dY *= 0.9;
    }
    if (Math.abs(this.dX) < EPSILON) this.dX = 0;
    if (Math.abs(this.dY) < EPSILON) this.dY = 0;
}

function getColor(classname) {
    switch (classname)
    {
        case "sun":
            return "#ffe029";
        case "sky":
            return "#7adfff";
        case "eco":
            return "#4aff60";
        case "rose":
            return "#ff4143";
        case "deep":
            return "#ff4de6";
    }
}

function ping(id) {
    var cell = Global.arr.filter(function (x) { return x.id == id })[0];
    cell.additionalRadius = -cell.r;
}

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

function Bacteria(team)
{
    this.additionalRadius = 0;
    this.id = Math.random() * 100000000000000000;
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.r = width/(height*2);
    this.speed = width/(height*2)/Math.sqrt(this.r);

    this.target = {};
    this.target.x = this.x;
    this.target.y = this.y;
    this.vector = new Direction(this.x, this.y, this.target.x, this.target.y);
    
    this.className = team;

    this.GetAttributes = function(){
        return 'left: '+ this.x +'px; top: ' + this.y + 'px; position: absolute; width: ' + this.r + 'px; height: ' + this.r + 'px; border-radius: ' + this.r + 'px';
    };

    document.getElementById("canvas").innerHTML += '<div class="' + this.className + '" id = "' + this.id + '" style ="' + this.GetAttributes() + '" onclick="ping(' + this.id + ')"/>';

    this.DOM = {};

    this.Update = function () {

        var outOfScreen = (this.x >= width - this.r) || (this.y >= height - this.r) || (this.x <= this.r) || (this.y <= this.r);
        var targetReached = this.vector.Distance(this.x, this.y) < 1;

        if (outOfScreen || targetReached) {
            this.target.x = Math.random() * (width - this.r * 2) + this.r;
            this.target.y = Math.random() * (height - this.r * 2) + this.r;
            this.vector = new Direction(this.x, this.y, this.target.x, this.target.y);
        }

        this.x += this.vector.dX * this.speed;
        this.y += this.vector.dY * this.speed;

        this.DOM.style.top = this.y - this.r + "px";
        this.DOM.style.left = this.x - this.r + "px";
        this.DOM.style.height = Math.floor(this.r * 2) + "px";
        this.DOM.style.width = Math.floor(this.r * 2) + "px";
        this.DOM.style.borderRadius = Math.floor(this.r * 2) + "px";
        this.DOM.style.boxShadow = "0 0 " + (this.r*2+this.additionalRadius) + "px " + getColor(this.className);

        var xC = this.x;
        var yC = this.y;

        var self = this;

        var Intersected = Global.arr.filter(function (x) {
            var GxC = x.x;
            var GyC = x.y;
            var distSq = (xC - GxC) * (xC - GxC) + (yC - GyC) * (yC - GyC);
            return distSq < (self.r + x.r) * (self.r + x.r) && self.r >= x.r && x.id != self.id && self.className != x.className;
        });

        for(var i = 0; i < Intersected.length; i++)
        {
            Global.Points[this.className] += Math.floor(Intersected[i].r);
            var growthCount = Intersected[i].r / this.r;
            this.r += growthCount;
            this.speed = width/(height*2)/Math.sqrt(this.r);

            Intersected[i].r = width/(height*2);
            Intersected[i].x = Math.floor(Math.random() * width);
            Intersected[i].y = Math.floor(Math.random() * height);
            Intersected[i].speed = Intersected[i].r;

            Intersected[i].target = {};
            Intersected[i].target.x = Intersected[i].x;
            Intersected[i].target.y = Intersected[i].y;
        }

        if (this.additionalRadius < 0)
            this.additionalRadius++;
    }
}