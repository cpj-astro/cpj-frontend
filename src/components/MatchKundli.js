import React, { useEffect } from "react";

function drawHouse(context, points) {
  context.beginPath();
  points.forEach(([x, y]) => {
    context.lineTo(x * context.canvas.width / 100, y * context.canvas.height / 100);
  });
  context.closePath();
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.stroke();
}

function drawText(context, x, y, maintext, subtext) {
  context.font = "10px Comic Sans MS";
  context.fillStyle = "#00FFFF"; // Change the text color to black
  context.fillText(maintext, x * context.canvas.width / 100, y * context.canvas.height / 100);
}

const MatchKundli = ({ housesData }) => {    
    useEffect(() => {
        const canvas = document.getElementById("match-canvas");
        const ctx = canvas.getContext("2d");

        const houses = [
            { points: [[50, 0], [75, 25], [50, 50], [25, 25]], text: { x: 49, y: 26, main: housesData[0] ? housesData[0] : "", sub: "subtext" } },
            { points: [[0, 0], [50, 0], [25, 25]], text: { x: 24, y: 13, main: housesData[1] ? housesData[1] : "", sub: "subtext" } },
            { points: [[0, 0], [25, 25], [0, 50]], text: { x: 11, y: 26, main: housesData[2] ? housesData[2] : "", sub: "subtext" } },
            { points: [[25, 25], [50, 50], [25, 75], [0, 50]], text: { x: 24, y: 51, main: housesData[3] ? housesData[3] : "", sub: "subtext" } },
            { points: [[0, 50], [25, 75], [0, 100]], text: { x: 11, y: 76, main: housesData[4] ? housesData[4] : "", sub: "subtext" } },
            { points: [[25, 75], [50, 100], [0, 100]], text: { x: 24, y: 89, main: housesData[5] ? housesData[5] : "", sub: "subtext" } },
            { points: [[50, 50], [75, 75], [50, 100], [25, 75]], text: { x: 49, y: 76, main: housesData[6] ? housesData[6] : "", sub: "subtext" } },
            { points: [[75, 75], [100, 100], [50, 100]], text: { x: 74, y: 89, main: housesData[7] ? housesData[7] : "", sub: "subtext" } },
            { points: [[75, 75], [100, 50], [100, 100]], text: { x: 87, y: 76, main: housesData[8] ? housesData[8] : "", sub: "subtext" } },
            { points: [[75, 25], [100, 50], [75, 75], [50, 50]], text: { x: 74, y: 51, main: housesData[9] ? housesData[9] : "", sub: "subtext" } },
            { points: [[100, 0], [100, 50], [75, 25]], text: { x: 87, y: 26, main: housesData[10] ? housesData[10] : "", sub: "subtext" } },
            { points: [[50, 0], [100, 0], [75, 25]], text: { x: 74, y: 13, main: housesData[11] ? housesData[11] : "", sub: "subtext" } },
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
