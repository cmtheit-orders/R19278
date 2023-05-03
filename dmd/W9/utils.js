'use strict'; // <-- see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

// A utility function for creating a square to be added to an SVG
function square(x, y, size, colour) {
    // Use a rect element with identical width and height
    let square = document.createElementNS("http://www.w3.org/2000/svg", 'rect')

    // Set the attributes of the new square
    square.setAttribute('x', x)
    square.setAttribute('y', y)
    square.setAttribute('width', size)
    square.setAttribute('height', size)
    square.setAttribute('fill', colour)

    return square
}