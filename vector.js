function Vector(x1, y1, x2, y2, limit) {
    limit = limit || 1;

    this.dX = x2 - x1;
    this.dY = y2 - y1;

    var max = Math.max(Math.abs(this.dX), Math.abs(this.dY));

    this.dX = this.dX * limit / max;
    this.dY = this.dY * limit / max;
}