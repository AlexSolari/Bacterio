function GameManager() {
    this.BlackHoleEnabled = false;
    this.BlackHolePower = 2;

    this.Interval = 0;
    this.IntervalID = 0;

    this.Scene = new GameScene();

    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.LastSecondFrameNumber = 0;

    this.Points = {};
    this.Cursor = {};
}

GameManager.prototype.Restart = function () {
    this.Initialize();
    this.Start();
}

GameManager.prototype.Initialize = function () {
    var self = this;

    this.ScreenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

    this.ScreenHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;

    this.Points.eco = 0;
    this.Points.sky = 0;
    this.Points.deep = 0;
    this.Points.rose = 0;
    this.Points.sun = 0;

    $("body").on("mousemove", function (e) {
        self.Cursor.x = e.clientX;
        self.Cursor.y = e.clientY;
    });

    this.Scene.Initialize();
}

GameManager.prototype.Start = function (size) {
    size = size || 150;

    var self = this;

    this.Scene.Clear();

    for (var i = 0; i < size; i++) {
        this.Scene.Add(new Bacteria());
    }
    this.Scene.InitializeEntitiesDOM();

    clearInterval(this.IntervalID);
    this.IntervalID = setInterval(function () {
        self.CountFPS();

        self.Scene.Update();
        self.Scene.Render();
    }, this.Interval);
}

GameManager.prototype.CountFPS = function () {
    if (this.CurrentSecondNumber != new Date().getSeconds()) {
        $("#fpsMeter").html(this.CurrentFrameNumber - this.LastSecondFrameNumber + "fps");
        this.LastSecondFrameNumber = this.CurrentFrameNumber;
        this.CurrentSecondNumber = new Date().getSeconds();
    }
    this.CurrentFrameNumber++;
}

GameManager.prototype.AddPoints = function (classname, points) {
    this.Points[classname] += points;
    $("#"+classname).html(Math.floor(this.Points[classname]));
}

GameManager.prototype.ToggleBlackHole = function () {
    this.BlackHoleEnabled = !this.BlackHoleEnabled;
}