'use strict'; // <-- see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

// Rule set 90 of the 256 possible combinations of Elementary Cellular Automata.
// This rule set is equivalent to applying an XOR (exclusive or) operation to the neighbours of the cell.
let ruleSet = {
    "000": 0,
    "001": 1,
    "010": 0,
    "100": 1,
    "011": 1,
    "101": 0,
    "110": 1,
    "111": 0
}

console.log(ruleSet)

// Create the cellular automata with the rule set and how long to make each row.
let ca = new ECA(ruleSet, 1000)

// Setup SVG
const svg = document.getElementById("display");
// Uncomment if you need to check on your SVG element
// console.log(svg)

const width = window.innerWidth
const height = window.innerHeight

svg.setAttribute("width", width)
svg.setAttribute("height", height)

// Calculate the dimensions of each cell and how many iterations will be required.
let cellSize = width / ca.row.length
let rowLimit = height / cellSize

let rowCount = 0
let intervalHandle = setInterval(() => {
    if (rowCount < rowLimit) { // Consider each cell of the automata and add the alive cells to the SVG.
        ca.row.forEach((cell, i) => { // Only draw alive tiles, keep the number of SVG elements to a minimum, else the browser starts to lag!
            if (cell === 1) {
                let svgCell = square(i * cellSize, // x
                rowCount * cellSize, // y
                cellSize, // size
                        'black' // colour
                )
                svg.appendChild(svgCell)
            }
        });

        // Calculate the next generation of the automata and move the loop ahead one step
        ca.generateNextRow()
        rowCount++
    }
    else {
        // Cancel calling the function once all rows have been drawn
        clearInterval(intervalHandle)
    }
}, 1000 / 30)

