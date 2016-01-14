function GameManager() {
    this.BlackHoleEnabled = false;
    this.BlackHolePower = 15;

    this.Interval = 0;
    this.IntervalID = 0;

    this.Scene = new GameScene();

    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.LastSecondFrameNumber = 0;

    this.Points = {};
}

GameManager.prototype.Initialize = function () {
    this.Points.eco = 0;
    this.Points.sky = 0;
    this.Points.deep = 0;
    this.Points.rose = 0;
    this.Points.sun = 0;

    this.Scene.Initialize();
}

GameManager.prototype.Start = function (size) {
    size = size || 150;

    var self = this;

    this.Scene.Clear();
    this.Initialize();

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
    document.getElementById(classname).innerHTML = Math.floor(this.Points[classname]);
}

GameManager.prototype.ToggleBlackHole = function () {
    this.BlackHoleEnabled = !this.BlackHoleEnabled;
}