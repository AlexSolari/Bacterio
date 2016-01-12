function GameManager() {
    this.Interval = 0;
    this.IntervalID = 0;
    this.Scene = new GameScene();
    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.LastSecondFrameNumber = 0;
}

GameManager.prototype.Initialize = function () {
    Global.Points.eco = 0;
    Global.Points.sky = 0;
    Global.Points.deep = 0;
    Global.Points.rose = 0;
    Global.Points.sun = 0;

    this.Scene.Initialize();
}

GameManager.prototype.Start = function (size) {
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
        self.CountPoints();

        self.Scene.Update();
    }, this.Interval);
}

GameManager.prototype.CountFPS = function () {
    if (this.CurrentSecondNumber != new Date().getSeconds()) {
        document.getElementById("fpsMeter").innerHTML = this.CurrentFrameNumber - this.LastSecondFrameNumber + "fps";
        this.LastSecondFrameNumber = this.CurrentFrameNumber;
        this.CurrentSecondNumber = new Date().getSeconds();
    }
    this.CurrentFrameNumber++;
}

GameManager.prototype.CountPoints = function () {
    document.getElementById("sky").innerHTML = Math.floor(Global.Points.sky);
    document.getElementById("eco").innerHTML = Math.floor(Global.Points.eco);
    document.getElementById("sun").innerHTML = Math.floor(Global.Points.sun);
    document.getElementById("deep").innerHTML = Math.floor(Global.Points.deep);
    document.getElementById("rose").innerHTML = Math.floor(Global.Points.rose);
}