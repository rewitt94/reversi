export class Board {

  constructor(CellClass) {
    this.grid = []
    for(let x=0;x<8;x++) {
      const column = [];
      for(let y=0;y<8;y++) {
        var string = String.fromCharCode(65+x,49+y);
        column.push(new CellClass(string));
      }
      this.grid.push(column);
    }
  }

  getCell(idString) {
    var x = idString.charCodeAt(0) - 65;
    var y = idString.charCodeAt(1) - 49;
    return this.grid[x][y]
  }

  getCoordinate(idString) {
    var x = idString.charCodeAt(0) - 65;
    var y = idString.charCodeAt(1) - 49;
    return [x,y];
  }

  traverse(idString,direction,visitingFunction) {
    var coordinates = this.getCoordinate(idString);
    var x = coordinates[0]
    var y = coordinates[1]
    switch (direction) {
      case 'up':
        while (y < 7) {
          y++;
          visitingFunction(this.grid[x][y]);
        }
        break;
      case 'upRight':
        while (y < 7 && x < 7) {
          y++;
          x++;
          visitingFunction(this.grid[x][y]);
        }
        break;
      case 'right':
        while (x < 7) {
          x++;
          visitingFunction(this.grid[x][y])
        }
        break;
      case 'downRight':
        while (x < 7 && y > 0) {
          x++;
          y--;
          visitingFunction(this.grid[x][y])
        }
        break;
      case 'down':
        while (y > 0) {
          y--;
          visitingFunction(this.grid[x][y])
        }
        break;
      case 'downLeft':
        while (y > 0 && x > 0) {
          x--;
          y--;
          visitingFunction(this.grid[x][y])
        }
        break;
      case 'left':
        while (x > 0) {
          x--;
          visitingFunction(this.grid[x][y])
        }
        break;
      case 'upLeft':
        while (y < 7 && x > 0) {
          x--;
          y++;
          visitingFunction(this.grid[x][y])
        }
        break;
    }
  }
}
