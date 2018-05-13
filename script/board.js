const BOARD_TEMPLATE = `
  <div id="A">
    <div><div id="A1"></div></div>
    <div><div id="A2"></div></div>
    <div><div id="A3"></div></div>
    <div><div id="A4"></div></div>
    <div><div id="A5"></div></div>
    <div><div id="A6"></div></div>
    <div><div id="A7"></div></div>
    <div><div id="A8"></div></div>
  </div>
  <div id="B">
    <div><div id="B1"></div></div>
    <div><div id="B2"></div></div>
    <div><div id="B3"></div></div>
    <div><div id="B4"></div></div>
    <div><div id="B5"></div></div>
    <div><div id="B6"></div></div>
    <div><div id="B7"></div></div>
    <div><div id="B8"></div></div>
  </div>
  <div id="C">
    <div><div id="C1"></div></div>
    <div><div id="C2"></div></div>
    <div><div id="C3"></div></div>
    <div><div id="C4"></div></div>
    <div><div id="C5"></div></div>
    <div><div id="C6"></div></div>
    <div><div id="C7"></div></div>
    <div><div id="C8"></div></div>
  </div>
  <div id="D">
    <div><div id="D1"></div></div>
    <div><div id="D2"></div></div>
    <div><div id="D3"></div></div>
    <div><div id="D4"></div></div>
    <div><div id="D5"></div></div>
    <div><div id="D6"></div></div>
    <div><div id="D7"></div></div>
    <div><div id="D8"></div></div>
  </div>
  <div id="E">
    <div><div id="E1"></div></div>
    <div><div id="E2"></div></div>
    <div><div id="E3"></div></div>
    <div><div id="E4"></div></div>
    <div><div id="E5"></div></div>
    <div><div id="E6"></div></div>
    <div><div id="E7"></div></div>
    <div><div id="E8"></div></div>
  </div>
  <div id="F">
    <div><div id="F1"></div></div>
    <div><div id="F2"></div></div>
    <div><div id="F3"></div></div>
    <div><div id="F4"></div></div>
    <div><div id="F5"></div></div>
    <div><div id="F6"></div></div>
    <div><div id="F7"></div></div>
    <div><div id="F8"></div></div>
  </div>
  <div id="G">
    <div><div id="G1"></div></div>
    <div><div id="G2"></div></div>
    <div><div id="G3"></div></div>
    <div><div id="G4"></div></div>
    <div><div id="G5"></div></div>
    <div><div id="G6"></div></div>
    <div><div id="G7"></div></div>
    <div><div id="G8"></div></div>
  </div>
  <div id="H">
    <div><div id="H1"></div></div>
    <div><div id="H2"></div></div>
    <div><div id="H3"></div></div>
    <div><div id="H4"></div></div>
    <div><div id="H5"></div></div>
    <div><div id="H6"></div></div>
    <div><div id="H7"></div></div>
    <div><div id="H8"></div></div>
  </div>
`;

export class Board {

  constructor(element, CellClass, controller) {
    element.innerHTML = BOARD_TEMPLATE;
    this.grid = []
    for(let x=0;x<8;x++) {
      const column = [];
      for(let y=0;y<8;y++) {
        let idString = String.fromCharCode(65+x,49+y);
        column.push(new CellClass(idString));

        let cellElement = document.getElementById(idString).parentNode;

        cellElement.addEventListener(
          "mouseover",
          () => controller.showMove(this, idString)
        );

        cellElement.addEventListener(
          "mouseleave",
          () => controller.hideMove(this, idString)
        );

        cellElement.addEventListener(
          "click",
          () => controller.playMove(this, idString)
        );
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

  traverse(idString,direction,callback) {
    var coordinates = this.getCoordinate(idString);
    var x = coordinates[0]
    var y = coordinates[1]
    switch (direction) {
      case 'up':
        while (y < 7) {
          y++;
          callback(this.grid[x][y]);
        }
        break;
      case 'upRight':
        while (y < 7 && x < 7) {
          y++;
          x++;
          callback(this.grid[x][y]);
        }
        break;
      case 'right':
        while (x < 7) {
          x++;
          callback(this.grid[x][y])
        }
        break;
      case 'downRight':
        while (x < 7 && y > 0) {
          x++;
          y--;
          callback(this.grid[x][y])
        }
        break;
      case 'down':
        while (y > 0) {
          y--;
          callback(this.grid[x][y])
        }
        break;
      case 'downLeft':
        while (y > 0 && x > 0) {
          x--;
          y--;
          callback(this.grid[x][y])
        }
        break;
      case 'left':
        while (x > 0) {
          x--;
          callback(this.grid[x][y])
        }
        break;
      case 'upLeft':
        while (y < 7 && x > 0) {
          x--;
          y++;
          callback(this.grid[x][y])
        }
        break;
    }
  }
}
