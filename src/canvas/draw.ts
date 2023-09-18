const drawLine = (
  ctx: any,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke = 'black',
  width = 3
) => {
  // start a new path
  ctx.beginPath()

  // place the cursor from the point the line should be started
  ctx.moveTo(x1, y1)

  // draw a line from current cursor position to the provided x,y coordinate
  ctx.lineTo(x2, y2)

  // set strokecolor
  ctx.strokeStyle = stroke

  // set lineWidht
  ctx.lineWidth = width

  // add stroke to the line
  ctx.stroke()
}

export default drawLine
