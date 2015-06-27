  function printXY(x, y) {
      console.log(x);
      console.log(y);
  }


   //全局常量
  var GRID_ID = "";
  var GRID_W = 400;
  var SPACE = 12;
  var CELL_W = (GRID_W - SPACE) / 4 - SPACE;
  var CELLS = [];



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~公用方法~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


   //cellX定位

  function cellX(i) {
      return i * (CELL_W + SPACE) + SPACE;
  }

   //cellY定位

  function cellY(j) {
      return j * (CELL_W + SPACE) + SPACE;
  }


   //获取随机数

  function getRandomNum(n) {
      return parseInt(Math.round(Math.random() * n));
  }

   //获取数字背景色

  function getNumBgColor(n) {
      switch (n) {
          case 0:
              return "#CDC0B4";
          case 2:
              return "#EEE4DA";
          case 4:
              return "#EDE0C8";
          case 8:
              return "#F2B179";
          case 16:
              return "#F59563";
          case 32:
              return "#F67C5F";
          case 64:
              return "#F65F3B";
          case 128:
              return "#F2DB6B";
          case 256:
              return "#EDCC61";
          case 512:
              return "#EDC850";
          case 1024:
              return "#EDC53F";
          case 2048:
              return "#EEE4DA";
      }
  }



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~视图层~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


   //初始化表格（背景）

  function iniGrid() {
      var num = 4;
      var $grid = $(GRID_ID);

      $grid.css({
          width: GRID_W,
          height: GRID_W
      });

      for (var i = 0; i < num; i++) {
          var _y = cellY(i);
          CELLS[i] = [];
          for (var j = 0; j < num; j++) {
              var _id = i + '-' + j
              var _x = cellX(j);

              var $cell = $('<li id = "cell-' + _id + '" class="cell"></li>');
              $cell.css({
                  left: _x,
                  top: _y,
                  width: CELL_W,
                  height: CELL_W,
                  lineHeight: CELL_W + "px"
              });
              $grid.append($cell);
              CELLS[i][j] = {
                  i: i,
                  j: j,
                  x: _x,
                  y: _y,
                  v: 0,
                  c: $cell
              };
          }
      }
  }


   //根据随机位置生成cell

  function RandomCell() {
      var x = getRandomNum(3);
      var y = getRandomNum(3);
      return CELLS[x][y];
  }

   //随机生成2或4

  function createNum() {
      return Math.random() < 0.5 ? 2 : 4;
  }

   //判断是否可以放入数字

  function canPush() {
      for (var i = 0; i < CELLS.length; i++) {
          for (var j = 0; j < CELLS[i].length; j++) {
              if (CELLS[i][j].v == 0) {
                  return true;
              }
          }
      }
      return false;
  }

   //放入数字 

  function pushNum() {

      if (!canPush()) {
          return false;
      }

      while (true) {
          var cell = RandomCell();
          if (cell.v == 0) {
              var num = createNum();
              setCellVal(cell, num)
              break;
          }
      }

  }

   //设置cell的值

  function setCellVal(cell, val) {
      var $cell = cell.c;
      cell.v = val;
      $cell.html(val == 0 ? "" : val);
      $cell.css("backgroundColor", getNumBgColor(val));
      if (val == 2 || val == 4) {
          $cell.css("color", "#2A2C2E");
      } else {
          $cell.css("color", "#fff");
      }
  }



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~控制层~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
   //初始化键盘事件

  function iniEvent() {
      $(document).keydown(function(e) {
          switch (e.which) {
              case 38: //上
                  // console.log("上");
                  interactive("up");
                  break;
              case 40: //下
                  // console.log("下");
                  interactive("down");
                  break;
              case 37: //左
                  // console.log("左");
                  interactive("left");
                  break;
              case 39: //右
                  // console.log("右");
                  interactive("right");
                  break;
          }

      })
  }

   //游戏交互部分

  function interactive(str) {
      switch (str) {
          case "left":
              leftMove();
              break;
          case "right":
              rightMove();
              break;
          case "up":
              upMove();
              break;
          case "down":
              downMove();
              break;
      }

  }

   //更新一下显示

  function updateView() {
      setTimeout(pushNum, 300);
  }


   //判断中间是否有障碍物（行判断）

  function hasBalk(r, c1, c2) { //r:当前行，c1~c2 检测区间
      for (var i = c1 + 1; i < c2; i++) {
          //console.log(CELLS[r][i].v);
          if (CELLS[r][i].v != 0) {
              return true;
          }
      };
      return false;
  }


   //判断中间是否有障碍物（列判断）

  function hasBalk2(c, r1, r2) { //c:当前列，r1~r2 检测区间
      for (var i = r1 + 1; i < r2; i++) {
          //console.log(CELLS[r][i].v);
          if (CELLS[i][c].v != 0) {
              return true;
          }
      };
      return false;
  }



   //下移动

  function downMove() {
      if (!canMoveDown()) {
          return false;
      }

      var len_r = CELLS.length - 1;
      for (var i = len_r - 1; i >= 0; i--) {
          for (var j = 0; j < CELLS[i].length; j++) {
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  // console.log(currentCell)
                  for (var k = len_r; k > i; k--) { //检测当前列的状态
                      var targetCell = CELLS[k][j]; //目标点
                      if (r_move(targetCell, currentCell, j, i, k)) {
                          continue;
                      }

                  }
              }
          }
      }
      updateView();

  }



   //上移动

  function upMove() {
      if (!canMoveUp()) {
          return false;
      }

      for (var i = 1; i < CELLS.length; i++) {
          for (var j = 0; j < CELLS[i].length; j++) {
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  for (var k = 0; k < i; k++) { //检测当前列的状态
                      var targetCell = CELLS[k][j]; //目标点
                      // console.log(targetCell)
                      if (r_move(targetCell, currentCell, j, k, i)) {
                          continue;
                      }

                  }
              }
          }
      }
      updateView();

  }

   //左移动

  function leftMove() {
      if (!canMoveLeft()) {
          return false;
      }

      for (var i = 0; i < CELLS.length; i++) {
          for (var j = 1; j < CELLS[i].length; j++) {
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  for (var k = 0; k < j; k++) { //检测当前行的状态
                      var targetCell = CELLS[i][k]; //目标点
                      if (c_move(targetCell, currentCell, i, k, j)) {
                          continue;
                      }

                  }
              }
          }
      }
      updateView();

  }



   //右移动

  function rightMove() {
      if (!canMoveRight()) {
          return false;
      }

      for (var i = 0; i < CELLS.length; i++) {
          var len_i = CELLS[i].length - 1;
          for (var j = len_i - 1; j >= 0; j--) {
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  for (var k = len_i; k > j; k--) { //检测当前行的状态                 
                      var targetCell = CELLS[i][k]; //目标点
                      if (c_move(targetCell, currentCell, i, j, k)) {

                          continue;
                      }

                  }
              }
          }
      }
      updateView();

  }

   //左右移动检测

  function c_move(targetCell, currentCell, i, k, j) {


      if (targetCell.v == 0 && !hasBalk(i, k, j)) { //检测k~j区间有没障碍物（非0）
          setCellVal(targetCell, currentCell.v);
          setCellVal(currentCell, 0);
          animateMove(targetCell, currentCell);
          return true;

      } else if (targetCell.v == currentCell.v && !hasBalk(i, k, j)) { //检测k~j区间有没障碍物（非0）
          setCellVal(targetCell, targetCell.v + currentCell.v);
          setCellVal(currentCell, 0);
          animateMove(targetCell, currentCell);
          return true;

      }
      return false;

  }


   //上下移动检测

  function r_move(targetCell, currentCell, i, k, j) {
      if (targetCell.v == 0 && !hasBalk2(i, k, j)) { //检测k~j区间有没障碍物（非0）
          setCellVal(targetCell, currentCell.v);
          setCellVal(currentCell, 0);
          animateMove(targetCell, currentCell);
          return true;

      } else if (targetCell.v == currentCell.v && !hasBalk2(i, k, j)) { //检测k~j区间有没障碍物（非0）
          setCellVal(targetCell, targetCell.v + currentCell.v);
          setCellVal(currentCell, 0);
          animateMove(targetCell, currentCell);
          return true;

      }
      return false;

  }

   //判断右侧是否可移动

  function canMoveRight() {
      for (var i = 0; i < CELLS.length; i++) {
          var len_i = CELLS[i].length - 1;
          for (var j = len_i - 1; j >= 0; j--) {
              var rightCell = CELLS[i][j + 1];
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  if (rightCell.v == 0 || rightCell.v == currentCell.v) {
                      return true;
                  }
              }
          }
      }
      return false;
  }


   //判断左侧是否可移动

  function canMoveLeft() {
      for (var i = 0; i < CELLS.length; i++) {
          for (var j = 1; j < CELLS[i].length; j++) {
              var leftCell = CELLS[i][j - 1];
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  if (leftCell.v == 0 || leftCell.v == currentCell.v) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

   //判断上边是否可移动

  function canMoveUp() {
      for (var i = 1; i < CELLS.length; i++) {
          for (var j = 0; j < CELLS[i].length; j++) {
              var upCell = CELLS[i - 1][j];
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  if (upCell.v == 0 || upCell.v == currentCell.v) {
                      return true;
                  }
              }
          }
      }
      return false;
  }


   //判断下方是否可移动

  function canMoveDown() {
      var len_r = CELLS.length - 1;
      for (var i = len_r - 1; i >= 0; i--) {
          for (var j = 0; j < CELLS[i].length; j++) {
              var downCell = CELLS[i + 1][j];
              var currentCell = CELLS[i][j];
              if (currentCell.v != 0) { //判断当前是否需要移动
                  if (downCell.v == 0 || downCell.v == currentCell.v) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

   //移动动画

  function animateMove(targetCell, currentCell) {
      var $cur = currentCell.c;
      var $tar = targetCell.c;
  }


  /*  {
                  i: i,
                  j: j,
                  x: _x,
                  y: _y,
                  v: 0,
                  c: $cell
  };*/


   //初始化游戏

  function ini() {
      iniGrid();
      iniEvent();
      for (var i = 0; i < 2; i++) {
          pushNum();
      }
  }

   //game2048 

  function game2048(id) {
      GRID_ID = id
      ini();
  }
