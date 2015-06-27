/**
 * Created by wenlf on 14-8-13.
 */
//var documentWidth = window.screen.availWidth < window.screen.availHeight ? window.screen.availWidth:window.screen.availHeight;
var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;


function getPosTop(i, j) {
    return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft(i, j) {
    return cellSpace + j*(cellSpace + cellSideLength);
}

/*
function getPosTop(x, y) {
    return (20 + x*120) + 'px';
}

function getPosLeft(x, y) {
    return (20 + y*120) + 'px';
}
*/

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;
    }

    return 'black';
}

function getNumberColor(number) {
    if( number <= 4 ) {
        return '#776e65';
    }

    return 'white';
}

function getNumberText(number){
    return number.toString();
}

/*
function getNumberText(number){
    switch(number){
        case 2: return "小白"; break;
        case 4: return "部门主管"; break;
        case 8: return "攻城狮"; break;
        case 16: return "程序猿"; break;
        case 32: return "攻城狮"; break;
        case 64: return "项目经理"; break;
        case 128: return "部门主管"; break;
        case 256: return "经理秘书"; break;
        case 512: return "总经理"; break;
        case 1024: return "执行官"; break;
        case 2048: return "董事长"; break;
        case 4096: return "嘉诚女婿"; break;
        case 8192: return "盖茨基友"; break;
        case 16384: return "~神~"; break;
        case 32768: return "~超神~"; break;
    }
    return "~God~";
}
*/

function getNumberFontSize(number) {
    if(getNumberText(number).length >= 4) {
        return (0.4 * cellSideLength) + 'px';
    } else {
        return (0.6 * cellSideLength) + 'px';
    }
}

/*
function getNumberFontSize(number) {
    if(getNumberText(number).length >= 4) {
        return '18px';
    } else {
        return '24px';
    }
}
*/

function noSpace(board) {
    for( var i = 0; i < 4; i++)
        for( var j = 0; j < 4; j++) {
            if(board[i][j] == 0)
                return false;
        }

    return true;
}

function moveLeft () {
    if( !canMoveLeft( board ) ) {
        return false;
    }
    // move left
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                for(var k = 0; k < j; k++) {
                    if( board[i][k] == 0 && noBlockHorizontal(i, k, j, board) ) { // 同行的k为0，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, i,k); // from i,j to i,k
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)
                        && !hasConflicated[i][k]) { // 同行的k相等，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, i,k);

                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicated[i][k] = true; // 标识该位置已经发生碰撞

                        // add score
                        score += board[i][k];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }

    //updateBoardView(); // for循环会很快执行完成， 然后调用updateBoardView，导致showMoveAnimation的效果看不到
    setTimeout('updateBoardView()', 200);

    return true;
}

function moveRight () {
    if( !canMoveRight( board ) ) {
        return false;
    }
    // move right
    for( var i = 0; i < 4; i++)
        for( var j = 2; j >= 0; j--) { // 从最右边开始循环
            if( board[i][j] != 0 ) { // 有数字
                for(var k = 3; k >= j+1; k--) { // 从最右边开始检测
                    if( board[i][k] == 0 && noBlockHorizontal(i, j, k, board) ) { // 同行的k为0，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, i,k); // from i,j to i,k
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)
                        && !hasConflicated[i][k]) { // 同行的k相等，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, i,k);

                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicated[i][k] = true; // 标识该位置已经发生碰撞

                        // add score
                        score += board[i][k];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }

    // updateBoardView(); // for循环会很快执行完成， 然后调用updateBoardView，导致showMoveAnimation的效果看不到
    setTimeout('updateBoardView()', 200);

    return true;
}

function moveUp () {
    if( !canMoveUp( board ) ) {
        return false;
    }
    // move up
    for( var i = 1; i < 4; i++)
        for( var j = 0; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                for(var k = 0; k < i; k++) {
                    if( board[k][j] == 0 && noBlockVertical(j, k, i, board) ) { // 同列的k为0，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, k,j); // from i,j to k,j
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)
                        && !hasConflicated[k][j]) { // 同列的k相等，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, k,j);

                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicated[k][j] = true; // 标识该位置已经发生碰撞

                        // add score
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }

    // updateBoardView(); // for循环会很快执行完成， 然后调用updateBoardView，导致showMoveAnimation的效果看不到
    setTimeout('updateBoardView()', 200);

    return true;
}

function moveDown () {
    if( !canMoveDown( board ) ) {
        return false;
    }
    // move down
    for( var i = 2; i >= 0; i--) // 从最下边开始循环
        for( var j = 0; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                for(var k = 3; k >= i+1; k--) { // 从最下边开始检测
                    if( board[k][j] == 0 && noBlockVertical(j, k, i, board) ) { // 同列的k为0，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, k,j); // from i,j to k,j
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)
                        && !hasConflicated[k][j]) { // 同列的k相等，且它们之间没有障碍
                        // move
                        showMoveAnimation(i,j, k,j);

                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicated[k][j] = true; // 标识该位置已经发生碰撞

                        // add score
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }

    // updateBoardView(); // for循环会很快执行完成， 然后调用updateBoardView，导致showMoveAnimation的效果看不到
    setTimeout('updateBoardView()', 200);

    return true;
}

function canMoveLeft( board ) {
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) { // 左边没有数字 or 左边数字和自己相等
                    return true;
                }
            }
        }

    return false;
}

function canMoveRight( board ) {
    for( var i = 0; i < 4; i++)
        for( var j = 0; j < 3; j++) {
            if( board[i][j] != 0 ) { // 有数字
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) { // 左边没有数字 or 左边数字和自己相等
                    return true;
                }
            }
        }

    return false;
}

function canMoveUp( board ) {
    for( var i = 1; i < 4; i++)
        for( var j = 0; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) { // 上边没有数字 or 上边数字和自己相等
                    return true;
                }
            }
        }

    return false;
}

function canMoveDown( board ) {
    for( var i = 0; i < 3; i++)
        for( var j = 0; j < 4; j++) {
            if( board[i][j] != 0 ) { // 有数字
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) { // 上边没有数字 or 上边数字和自己相等
                    return true;
                }
            }
        }

    return false;
}

function noBlockHorizontal( row, col1, col2, board) { // 在第row行， col1(不含)和col2(不含)之间没有障碍物
    var swap;
    if(col1 > col2) { // 让col1始终小于等于col2
        swap = col1;
        col1 = col2;
        col2 = swap;
    }
    for( var i = col1 + 1; i < col2; i++) {
        if( board[row][i] != 0)
            return false;
    }
    return true;
}

function noBlockVertical( col, row1, row2, board) { // 在第col列， row1(不含)和row2(不含)之间没有障碍物
    var swap;
    if(row1 > row2) { // 让col1始终小于等于col2
        swap = row1;
        row1 = row2;
        row2 = swap;
    }
    for( var i = row1 + 1; i < row2; i++) {
        if( board[i][col] != 0)
            return false;
    }
    return true;
}

function noMove(board) {
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;

    return true;
}