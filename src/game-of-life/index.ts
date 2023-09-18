const GameOfLife = (width: number, height: number) => {
  let cells: Array<number> = Array(width * height).fill(0);

  const next = () => {
    const nextCells = cells.slice()
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col)
        const neighbors_count = live_neighbor_count(row, col)

        let next_value = 0
        if (cells[idx] === 1 && neighbors_count < 2) {
          next_value = 0
        } else if (cells[idx] === 1 && (neighbors_count === 2 || neighbors_count === 3)) {
          next_value = 1
        } else if (cells[idx] === 1 && neighbors_count > 3) {
          next_value = 0
        } else if (cells[idx] === 0 && neighbors_count === 3) {
          next_value = 1
        } else {
          next_value = cells[idx]
        }

        nextCells[idx] = next_value
      }
    }
    cells = nextCells
  }

  const toggleCell = (row: number, col: number) => {
    const idx = getIndex(row, col)
    cells[idx] = cells[idx] === 0 ? 1 : 0;
  }

  const getIndex = (row: number, col: number) => {
    return row * width + col
  }

  const live_neighbor_count = (row: number, col: number): number => {
    let count = 0

    const ranges = [-1, 0, 1]
    ranges.forEach((deltaRow: number) => {
      ranges.forEach((deltaCol: number) => {
        if (deltaRow !== 0 || deltaCol !== 0) {
          let neighborRow = (row + deltaRow + height) % height
          if (neighborRow < 0) {
            neighborRow = height - 1
          }

          let neighborCol = (col + deltaCol + width) % width
          if (neighborCol < 0) {
            neighborCol = width - 1
          }

          const idx = getIndex(neighborRow, neighborCol)
          count += cells[idx]
        }
      })
    })

    return count
  }

  const random = () => {
    cells = Array(width * height).fill(0).map((_, i) => {
      if (Math.random() < 0.2) {
        return 1;
      }
  
      return 0;
    });
  };

  const clear = () => {
    cells = Array(width * height).fill(0)
  }

  return {
    cells: () => cells,
    clear,
    random,
    toggleCell,
    next
  }
}

export default GameOfLife
