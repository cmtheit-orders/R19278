'use strict';

let cgl = new CGL(
  document.getElementById("display"),
  Number(document.getElementById("d-x").value),
  Number(document.getElementById('d-y').value),
  {
    liveColor: document.getElementById('c-live').value,
    dieColor: document.getElementById('c-die').value
  }
)

const xDim = document.getElementById('d-x')
xDim.addEventListener('input', () => {
  if (xDim.value > cgl.x) {
    for (let i = 0; i < xDim.value - cgl.x; ++i) {
      cgl.addColumn()
    }
  } else {
    for (let i = 0; i < cgl.x - xDim.value; ++i) {
      cgl.minusColumn()
    }
  }
})

const yDim = document.getElementById('d-y')
yDim.addEventListener('input', () => {
  if (yDim.value > cgl.y) {
    for (let i = 0; i < yDim.value - cgl.y; ++i) {
      cgl.addRow()
    }
  } else {
    for (let i = 0; i < cgl.y - yDim.value; ++i) {
      cgl.minusRow()
    }
  }
})

const lC = document.getElementById('c-live')
lC.addEventListener('input', () => {
  cgl.setLiveColor(lC.value)
})

const dC = document.getElementById('c-die')
dC.addEventListener('input', () => {
  cgl.setDieColor(dC.value)
})

let handle;
let sPlay, sPause

const interval = document.getElementById('interval')
interval.addEventListener('input', () => {
  if (sPlay.checked) {
    clearInterval(handle)
    handle = setInterval(everyStep, interval.value)
  }

})
Tone.start()
let loop = [
  ['C4', '4n'],
  ['C5', '2n'],
  ['C3', '3n'],
  ['C6', '4n'],
  ['C3', '5n'],
  ['C4', '6n'],
  ['C5', '7n'],
  ['C8', '8n']
]
function everyStep() {
  cgl.nextStep()
  const synth = new Tone.Synth().toDestination();
  let first = loop.shift()
  synth.triggerAttackRelease(...first);
  loop.push(first)
}

handle = setInterval(everyStep, interval.value)

sPlay = document.getElementById('s-play')
sPlay.addEventListener('change', () => {
  handle = setInterval(everyStep, interval.value)
})

sPause = document.getElementById('s-pause')
sPause.addEventListener('change', () => {
  clearInterval(handle)
})

