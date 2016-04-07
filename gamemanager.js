function GameManager() {
    this.BlackHoleEnabled = false;
    this.BlackHolePower = 2;

    this.IntervalID = 0;

    this.ScreenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

    this.ScreenHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;

    this.Scene = new GameScene(this.ScreenWidth, this.ScreenHeight);

    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.LastSecondFrameNumber = 0;

    this.Points = {};
    this.Cursor = {};
}

GameManager.prototype.Restart = function Restart(size, targetFPS) {
    this.Start(size, targetFPS);
}

GameManager.prototype.Initialize = function Initialize() {
    var self = this;

    this.Points.eco = 0;
    this.Points.sky = 0;
    this.Points.deep = 0;
    this.Points.rose = 0;
    this.Points.sun = 0;

    $("body").on("mousemove", function SaveMousePosition(e) {
        self.Cursor.x = e.clientX;
        self.Cursor.y = e.clientY;
    });
}

GameManager.prototype.Start = function Start(size, targetFPS) {
    size = size || 150;
    targetFPS = targetFPS || 60;

    var self = this;

    this.Scene.Clear();

    for (var i = 0; i < size; i++) {
        this.Scene.Add(new Bacteria());
    }

    clearInterval(this.IntervalID);
    this.IntervalID = setInterval(function GameLoop() {
        self.CountFPS();

        self.Scene.Update();
        self.Scene.Render();
    }, 1000 / targetFPS);
}

GameManager.prototype.CountFPS = function CountFPS() {
    if (this.CurrentSecondNumber != new Date().getSeconds()) {
        $("#fpsMeter").html(this.CurrentFrameNumber - this.LastSecondFrameNumber + "fps");
        this.LastSecondFrameNumber = this.CurrentFrameNumber;
        this.CurrentSecondNumber = new Date().getSeconds();
    }
    this.CurrentFrameNumber++;
}

GameManager.prototype.AddPoints = function AddPoints(classname, points) {
    this.Points[classname] += points;
    $("#"+classname).html(Math.floor(this.Points[classname]));
}

GameManager.prototype.ToggleBlackHole = function ToggleBlackHole() {
    this.BlackHoleEnabled = !this.BlackHoleEnabled;
}