/*** CONSTAND ***/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow", //Mỗi viên gạch sẽ có 1 màu
  "white", // Khi không có 1 viên gạch nào trên board này thì mình cho nó màu trắng.
];

// Tạo các layout gạch
const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const KEY_CODES = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

// Tạo 1 biến để check khi không có viên gạch nào trên board
const WHITE_COLOR_ID = 7;

// Tạo 1 canvas để vẽ
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Tính size board
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Tạo 1 class Board
class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    document.getElementById("score").innerHTML = 0;
    this.drawBoard();
  }
  // Sử dụng 1 mảng 2 chiều để lưu giá trị các ô trong Board.
  // Default: khi không có viên gạch nào thì nó màu trắng.

  // Tạo method generateWhiteBoard
  generateWhiteBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    // Board gồm 20 rows và 10 cols
  }

  // Tạo 1 method để vẽ các cell trên Board
  // Method drawCell nhận 3 tham số: trục X, trục Y và màu gạch
  // dùng 1 API vẽ hình vuông: fillRect -> gồm 4 tham số: trục X, Y và Size cell
  // border cell dùng strokeRect
  drawCell(xAxis, yAxis, colorId) {
    this.ctx.fillStyle =
      COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }

  // Tọa method drawBoard
  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        //lấy 1 row bất kì để check số lượng cols
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  handleCompleteRows() {
    const latestGrid = board.grid.filter((row) => {
      //row => [10 cols]
      return row.some((col) => col === WHITE_COLOR_ID);
    });
    const newScore = ROWS - latestGrid.length; //Tỏng ROWS - các row màu trắng ở trên ra các row hoàn thành
    const newRows = Array.from({ length: newScore }, () =>
      Array(COLS).fill(WHITE_COLOR_ID)
    );

    if (newScore) {
      board.grid = [...newRows, ...latestGrid];
      this.handleScore(newScore);
    }
  }

  handleScore(newScore) {
    this.score += newScore;
    document.getElementById("score").innerHTML = this.score;
  }

  handleGameOver() {
    this.gameOver = true;
    alert("GAME OVER!!!");
  }
}

// Tạo class gạch
class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0; //hướng gạch: trái phải trên dưới dựa theo index khởi tạo ở BRICK_LAYOUT
    // ví trí gạch
    this.rowPos = -2;
    this.colPos = 4;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        // Kiểm tra brick != color white mới draw
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        // Kiểm tra brick != color white mới draw
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
        }
      }
    }
  }

  moveLeft() {
    if (
      !this.checkCollision(
        this.colPos - 1,
        this.rowPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if (
      !this.checkCollision(
        this.colPos + 1,
        this.rowPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if (
      !this.checkCollision(
        this.colPos,
        this.rowPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();

      return;
    }

    this.handleLanded();
    if (!board.gameOver) {
      generateNewBrick();
    }
  }

  rotate() {
    if (
      !this.checkCollision(
        this.colPos,
        this.rowPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      /**
       * activeIndex = 0;
       * 0 + 1 = 1 % 4 dư 1
       * 1 + 1 = 2 % 4 dư 2
       * 2 + 1 = 3 % 4 dư 3
       * 3 + 1 = 4 % 4 dư 0
       */
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }

  // Method check va chạm
  checkCollision(nextCol, nextRow, nextLayout) {
    // if (nextCol < 0) return true;

    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          )
            return true;
        }
      }
    }
  }

  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        // Kiểm tra lại brick khác màu trắng thì vẽ lại grid
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id; //update grid = id của brick
        }
      }
    }
    // Vẽ lại board
    board.handleCompleteRows();
    board.drawBoard();
  }
}

function generateNewBrick() {
  // Tạo ra 1 dãy số random từ 0 - 6
  brick = new Brick(Math.floor(Math.random() * 8) % BRICK_LAYOUT.length);
}

board = new Board(ctx);
board.drawBoard();

document.getElementById("play").addEventListener("click", () => {
  board.reset();

  generateNewBrick();

  const refresh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, 1000);
});
document.addEventListener("keydown", (e) => {
  if (!board.gameOver) {
    console.log(e);
    switch (e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;

      default:
        break;
    }
  }
});
