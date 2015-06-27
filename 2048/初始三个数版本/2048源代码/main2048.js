/**
 * Created by wenlf on 14-8-13.
 */
var board = new Array();
var score = 0;
var hasConflicated = new Array(); // 控制每个格子在一次移动时，只能叠加一次，防止2,2,4,8左移时直接变成16

var startX, startY, endX, endY;

$(document).ready( function() {
	prepareForMobile();
    newGame();
});

function prepareForMobile(){
	
	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	
//	cellSpace = 10;
//	cellSideLength = 60;
//	gridContainerWidth = 4*cellSideLength + 5*cellSpace;
	
	$("#grid-container").css("width", (gridContainerWidth - 2*cellSpace) + 'px');
	$("#grid-container").css("height", (gridContainerWidth - 2*cellSpace) + 'px');
	$("#grid-container").css("padding", cellSpace + 'px');
	$("#grid-container").css("border-radius", (0.01*gridContainerWidth) + 'px');
	
	$("#grid-mask").css("width", (gridContainerWidth - 2*cellSpace) + 'px');
	$("#grid-mask").css("height", (gridContainerWidth - 2*cellSpace) + 'px');
	$("#grid-mask").css("padding", cellSpace + 'px');
	$("#grid-mask").css("border-radius", (0.01*gridContainerWidth) + 'px');
	
	$(".grid-cell").css("width", cellSideLength + 'px');
	$(".grid-cell").css("height", cellSideLength + 'px');
	$(".grid-cell").css("border-radius", (0.01*cellSideLength)  + 'px');
}

function newGame () {
    // 隐藏游戏结束提示
    $('#grid-mask').hide();

    // 重置分数
    resetScore();

    // 初始化棋盘格
    init();

    // 在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    generateOneNumber();
    debugBoard();
}

function init () {
    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4; j++ ) {
            var gridCell = $( '#grid-cell-' + i + '-' + j );
            gridCell.css( 'top', getPosTop(i, j) );
            gridCell.css( 'left', getPosLeft(i, j) );
        }

    for( var i = 0; i < 4; i++ ) {
        board[i] = new Array();
        for ( var j = 0; j < 4; j++ ) {
            board[i][j] = 0;
        }
    }

    for( var i = 0; i < 4; i++ ) {
        hasConflicated[i] = new Array();
        for ( var j = 0; j < 4; j++ ) {
            hasConflicated[i][j] = false;
        }
    }

    updateBoardView();
}


function updateBoardView () {
    $('.number-cell').remove();

    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4; j++ ) {
            $('#grid-container').append( '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>' );
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if(board[i][j] == 0) {
                theNumberCell.css( 'width', '0px' );
                theNumberCell.css( 'height', '0px' );
                theNumberCell.css( 'top', getPosTop(i, j) + cellSideLength/2 );
                theNumberCell.css( 'left', getPosLeft(i, j) + cellSideLength/2 );
            }
            else {
                theNumberCell.css( 'width', cellSideLength + 'px' );
                theNumberCell.css( 'height', cellSideLength + 'px' );
                theNumberCell.css( 'top', getPosTop(i, j) );
                theNumberCell.css( 'left', getPosLeft(i, j) );
                theNumberCell.css( 'background-color', getNumberBackgroundColor(board[i][j]) );
                theNumberCell.css( 'color', getNumberColor(board[i][j]) );
                theNumberCell.text( getNumberText(board[i][j]) );

                /*if(board[i][j] > 2 ) {
                    theNumberCell.css('font-size', '40px');
                } else {
                    theNumberCell.css('font-size', '60px');
                }*/
                theNumberCell.css('font-size', getNumberFontSize(board[i][j]));
            }

            if(hasConflicated[i][j])
                showAddAnimation(i, j);
        }

    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4; j++ ) {
            hasConflicated[i][j] = false;
        }
    
    $(".number-cell").css("line-height", cellSideLength + "px");
}

function generateOneNumber() {
    if( noSpace( board )) {
        return false;
    }

    /*
    // 随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    while( true ) { // 直到产生位置为空的坐标
        if( board[randX][randY] == 0 )
            break;
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
    }
    */

    /*
    // 随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while( times < 50 ) { // 最多让计算机随机50次
        if( board[randX][randY] == 0 )
            break;
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if(times == 50) { // 50次以后还没有产生符合条件的随机数，则手动找一个空位置
        for( var i = 0; i < 4; i++ )
            for( var j = 0; j < 4; j++ ) {
                if( board[i][j] == 0 ) {
                    randX = i;
                    randY = j;
                }
            }
    }
    */

    // 随机一个位置
    var vacantCount = 0;
    var vacantSpace = new Array();
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
        {
            if(board[i][j] == 0)
            {
                vacantSpace[vacantCount++]= i*4 + j;
            }
        }
    var randomIndex = parseInt(Math.floor(Math.random()  * vacantCount ));

    var randX = Math.floor(vacantSpace[randomIndex] / 4);
    var randY = Math.floor(vacantSpace[randomIndex] % 4);


    // 随机一个数字
    var randSeed = parseInt(Math.floor(Math.random()  * 100 ));
    var randNumber = (randSeed % 10 == 0) ? 4 : 2; // 以10:1的概率生成4/2

    // 在随机位置显示随机数字
    board[randX][randY] = randNumber;
    showNumberWithAnimation( randX, randY, randNumber );

    debugBoard();
    return true;
}

$(document).keydown( function (event){
	//event.preventDefault(); // 防止按上下时滚动条滚动
    switch( event.keyCode ) {
        case 37:case 65: // left
        	doMove(1);
            break;
        case 38:case 87:// up
        	doMove(2);
            break;
        case 39:case 68:// right
        	doMove(3);
            break;
        case 40:case 83:// down
        	doMove(4);
            break;
        default: // default
            break;
    }
    debugBoard();
    $('#debugKey').html(event.keyCode);
});

document.addEventListener('touchstart',function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});

// 阻止Android4.0的touch bug
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	
	var deltaX = endX-startX;
	var deltaY = endY-startY;
	
	if(Math.abs(deltaX)<0.3*documentWidth && Math.abs(deltaY)<0.3*documentWidth)
		return;
	
	if(Math.abs(deltaX) >= Math.abs(deltaY)) { // x轴进行滑动
		if(deltaX > 0) {
			//move right
			doMove(3);
		} else {
			//move left	
			doMove(1);
		}
	}
	else { // y轴进行滑动
		if(deltaY > 0) {
			//move down
			doMove(4);
		} else {
			//move up
			doMove(2);
		}	
	}
})

function doMove(dir) {
	switch(dir) {
		case 1: // left
			if( moveLeft() ){
	            //generateOneNumber();
	            //isGameOver();
	            setTimeout('generateOneNumber()', 210);
	            setTimeout('isGameOver()', 300);
	        }
			break;
		case 2: // up
			if( moveUp() ){
	            //generateOneNumber();
	            //isGameOver();
	            setTimeout('generateOneNumber()', 210);
	            setTimeout('isGameOver()', 300);
	        }
			break;
		case 3: // right
			if( moveRight() ){
	            //generateOneNumber();
	            //isGameOver();
	            setTimeout('generateOneNumber()', 210);
	            setTimeout('isGameOver()', 300);
	        }
			break;
		case 4: // down
			if( moveDown() ){
	            //generateOneNumber();
	            //isGameOver();
	            setTimeout('generateOneNumber()', 210);
	            setTimeout('isGameOver()', 300);
	        }
			break;
		default: break;
	}
}

function isGameOver () {
    if( noSpace(board) && noMove(board) ) {
        setTimeout('gameOver()', 1000); // 给动画预留时间
    }
}

function gameOver() {
    // alert('Game Over!');
    $('#grid-mask').show();
}

function debugBoard() {
    var text = '';
    for( var i = 0; i < 4; i++ ) {
        for (var j = 0; j < 4; j++) {
            text += board[i][j] + ', ';
        }
        text += '<br/>';
    }

    $('#debugDiv').html(text);
}
