/**
 * Created by Cheese on 13.05.2015.
 */

var limit = 2000;

function Bacteria()
{
    this.id = Math.random() * 100000000000000000;
    this.x = Math.floor(Math.random() * limit*2);
    this.y = Math.floor(Math.random() * limit);
    this.r = 5;
    this.speed = 5/Math.sqrt(this.r);

    this.target = {};
    this.target.x = Math.floor(Math.random() * limit*2);
    this.target.y = Math.floor(Math.random() * limit);

    var c = Math.floor(Math.random() * 50);
    this.className = "";
    if (c < 10) this.className = "sun";
    else if (c < 20) this.className = "eco";
    else if (c < 30) this.className = "sky";
    else if (c < 40) this.className = "rose";
    else this.className = "deep";

    this.xCenter = function() {return this.x+Math.sqrt(this.r);};
    this.yCenter = function() {return this.y-Math.sqrt(this.r);};

    this.GetAttributes = function(){
        return 'left: '+ this.x +'px; top: ' + this.y + 'px; position: absolute; width: ' + this.r + 'px; height: ' + this.r + 'px; border-radius: ' + this.r + 'px';
    };

    document.getElementById("canvas").innerHTML += '<div class="'+this.className+'" id = "'+this.id+'" style ="' + this.GetAttributes() + '"/>';

    this.Update = function(){
        if ((this.xCenter()+this.speed < this.target.x) || (this.xCenter()-this.speed > this.target.x) || (this.yCenter()-this.speed > this.target.y) || (this.yCenter()+this.speed < this.target.y))
        {
            if (this.xCenter()+this.speed < this.target.x) this.x+=this.speed;
            if (this.xCenter()-this.speed > this.target.x) this.x-=this.speed;
            if (this.yCenter()-this.speed > this.target.y) this.y-=this.speed;
            if (this.yCenter()+this.speed < this.target.y) this.y+=this.speed;
        }
        else
        {
            this.target.x = Math.floor(Math.random() * limit*2);
            this.target.y = Math.floor(Math.random() * limit);
        }



        for(var i = 0; i < Global.size; i++)
        {
            if (Global.arr[i].id == this.id) continue;
            var dist = Math.sqrt((this.xCenter() - Global.arr[i].xCenter())*(this.xCenter() - Global.arr[i].xCenter()) + (this.yCenter() - Global.arr[i].yCenter())*(this.yCenter() - Global.arr[i].yCenter()));
            if (dist < this.r + Global.arr[i].r && this.r >= Global.arr[i].r)
            {
                if (this.className == "sky") {Global.Points.Sky += 5*Global.arr[i].r/this.r;}
                else if (this.className == "eco") {Global.Points.Eco += 5*Global.arr[i].r/this.r;}
                else if (this.className == "rose") {Global.Points.Rose += 5*Global.arr[i].r/this.r;}
                else if (this.className == "deep") {Global.Points.Deep += 5*Global.arr[i].r/this.r;}
                else if (this.className == "sun") {Global.Points.Sun += 5*Global.arr[i].r/this.r;}

                this.r += 5*Global.arr[i].r/this.r;
                this.speed = 5/Math.sqrt(this.r);


                Global.arr[i].x = Math.floor(Math.random() * limit*2);
                Global.arr[i].y = Math.floor(Math.random() * limit);
                Global.arr[i].speed = 5;

                Global.arr[i].target = {};
                Global.arr[i].target.x = Math.floor(Math.random() * limit*2);
                Global.arr[i].target.y = Math.floor(Math.random() * limit);
            }
        }

        //if (this.r > 500)
        //{
        //    this.r = 50;
        //
        //    this.target = {};
        //    this.target.x = Math.floor(Math.random() * limit*2);
        //    this.target.y = Math.floor(Math.random() * limit);
        //
        //
        //    for(var c = Global.size; c < Global.size+9; c++)
        //    {
        //        Global.arr[c] =  new Bacteria();
        //        Global.arr[c].id = Math.random() * 100000000000000000;
        //        Global.arr[c].x = this.xCenter() + Math.floor(Math.random() * this.r) - this.r/2;
        //        Global.arr[c].y = this.yCenter() + Math.floor(Math.random() * this.r) - this.r/2;
        //        Global.arr[c].r = 50;
        //
        //        Global.arr[c].target = {};
        //        Global.arr[c].target.x = Math.floor(Math.random() * limit*2);
        //        Global.arr[c].target.y = Math.floor(Math.random() * limit);
        //        Global.arr[c].fill = this.fill;
        //    }
        //    Global.size+=9;
        //}

        var DOMelement = document.getElementById(this.id);
        if (DOMelement != null)
        {
            DOMelement.style.top = this.y-this.r + "px";
            DOMelement.style.left = this.x-this.r + "px";
            DOMelement.style.height = this.r*2 + "px";
            DOMelement.style.width = this.r*2 + "px";
            DOMelement.style.borderRadius = this.r*2 + "px";
        } //else alert(this.id + " @ " + this.r);
        
    }
}