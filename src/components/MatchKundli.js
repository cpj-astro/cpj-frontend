import React, { useEffect } from "react";

function drawHouse(context, points) {
  context.beginPath();
  points.forEach(([x, y]) => {
    context.lineTo(x * context.canvas.width / 100, y * context.canvas.height / 100);
  });
  context.closePath();
  context.lineWidth = 1;
  context.strokeStyle = 'red';
  context.stroke();
}

function drawText(context, x, y, maintext, subtext) {
  context.font = "9px Comic Sans MS";
  context.fillStyle = "black"; // Change the text color to black
  context.fillText(maintext, x * context.canvas.width / 100, y * context.canvas.height / 100);
}

const MatchKundli = ({ housesData }) => {
    console.log("MainKeywards", housesData);
    
    useEffect(() => {
        const canvas = document.getElementById("match-canvas");
        const ctx = canvas.getContext("2d");

        const houses = [
            { points: [[50, 0], [75, 25], [50, 50], [25, 25]], text: { x: 50, y: 25, main: housesData[0] ? housesData[0] : "", sub: "subtext" } },
            { points: [[0, 0], [50, 0], [25, 25]], text: { x: 25, y: 12, main: housesData[1] ? housesData[1] : "", sub: "subtext" } },
            { points: [[0, 0], [25, 25], [0, 50]], text: { x: 12, y: 25, main: housesData[2] ? housesData[2] : "", sub: "subtext" } },
            { points: [[25, 25], [50, 50], [25, 75], [0, 50]], text: { x: 25, y: 50, main: housesData[3] ? housesData[3] : "", sub: "subtext" } },
            { points: [[0, 50], [25, 75], [0, 100]], text: { x: 12, y: 75, main: housesData[4] ? housesData[4] : "", sub: "subtext" } },
            { points: [[25, 75], [50, 100], [0, 100]], text: { x: 25, y: 88, main: housesData[5] ? housesData[5] : "", sub: "subtext" } },
            { points: [[50, 50], [75, 75], [50, 100], [25, 75]], text: { x: 50, y: 75, main: housesData[6] ? housesData[6] : "", sub: "subtext" } },
            { points: [[75, 75], [100, 100], [50, 100]], text: { x: 75, y: 88, main: housesData[7] ? housesData[7] : "", sub: "subtext" } },
            { points: [[75, 75], [100, 50], [100, 100]], text: { x: 88, y: 75, main: housesData[8] ? housesData[8] : "", sub: "subtext" } },
            { points: [[75, 25], [100, 50], [75, 75], [50, 50]], text: { x: 75, y: 50, main: housesData[9] ? housesData[9] : "", sub: "subtext" } },
            { points: [[100, 0], [100, 50], [75, 25]], text: { x: 88, y: 25, main: housesData[10] ? housesData[10] : "", sub: "subtext" } },
            { points: [[50, 0], [100, 0], [75, 25]], text: { x: 75, y: 12, main: housesData[11] ? housesData[11] : "", sub: "subtext" } },
        ];

        houses.forEach((house) => {
            drawHouse(ctx, house.points);
            drawText(ctx, house.text.x, house.text.y, house.text.main, house.text.sub);
        });
    }, [housesData]);

    return (
        <canvas id="match-canvas" width={300} height={200}></canvas>
    );
};

export default MatchKundli;
