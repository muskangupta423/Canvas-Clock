import React from "react";

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {currentCount: 1}
    }
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        var radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;  
        this.timer(ctx,radius);
    }
   
    timer(ctx,radius) {
        setInterval(this.drawClock(ctx,radius) , 1000);
    }
    
    drawClock = (ctx,radius) => {
        // console.log("inside draw clock")
        ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
        ctx.fillStyle = "#282c34";
        ctx.fill();
        this.drawFace(ctx, radius); 
        this.drawNumbers(ctx,radius);
        this.drawTime(ctx,radius);
    }

    drawFace = (ctx,radius) => {
        var grad;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#282c34';
        ctx.fill();

        grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, 'white');
        grad.addColorStop(0.5, '#282c34');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius*0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    drawNumbers = (ctx,radius) => {
        var angle, number;
        
        ctx.font = radius * 0.14 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for(number = 1; number < 13; number++){
            angle = number * Math.PI / 6;
            ctx.rotate(angle);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-angle);
            ctx.fillText(number.toString(), 0, 0);
            ctx.rotate(angle);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-angle);
        }
    }

    drawTime(ctx, radius){
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour = hour%12;
        hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
        this.drawHand(ctx, hour, radius*0.4, radius*0.07);
        //minute
        minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
        this.drawHand(ctx, minute, radius*0.6, radius*0.07);
        // second
        second = (second*Math.PI/30);
        this.drawHand(ctx, second, radius*0.8, radius*0.02);
    }

    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Canvas Clock using React JS</h1>
                <div className="clockCanvas">
                    <canvas ref="canvas" width={350} height={350} />
                </div>

            </React.Fragment>
        )
    }
}

export default Clock
