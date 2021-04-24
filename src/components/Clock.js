import React from "react";

class Clock extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        var radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;
        this.drawClock(ctx,radius);
    }

    drawClock = (ctx,radius) => {
        ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
        ctx.fillStyle = "#282c34";
        ctx.fill();
        this.drawFace(ctx, radius);
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