function Vector(x1, y1, x2, y2, limit) {
    limit = limit || 1;

    this.DistanceFromEnd = function (x1, y1) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    this.dX = x2 - x1;
    this.dY = y2 - y1;

    var EPSILON = 0.001;
    while ((this.dX * this.dX + this.dY * this.dY) > limit * limit) {
        this.dX *= 0.9;
        this.dY *= 0.9;
    }
    if (Math.abs(this.dX) < EPSILON) this.dX = 0;
    if (Math.abs(this.dY) < EPSILON) this.dY = 0;
}