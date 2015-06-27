/**
 * Created by wenlf on 14-8-13.
 */
function showNumberWithAnimation( i, j, number ) {
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css( 'background-color', getNumberBackgroundColor(number) );
    numberCell.css( 'color', getNumberColor(number) );
    numberCell.text( getNumberText(number) );
    numberCell.css( 'font-size', getNumberFontSize(number));

    /*
    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(i,j),
        left: getPosLeft(i, j)
    }, 50);
    */

    numberCell.animate({
        width: cellSideLength + 'px',
        height: cellSideLength + 'px',
        top: getPosTop(i,j),
        left: getPosLeft(i, j)
    }, 200);


    $('#debugGen').html( (i+1) + ',' + (j+1) + ' : ' + number);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}

function showAddAnimation(i, j) {
    var numberCell = $('#number-cell-' + i + '-' + j);

     numberCell.css({
     width: '0px',
     height: '0px',
     top: getPosTop(i,j) + cellSideLength/2,
     left: getPosLeft(i, j) + cellSideLength/2
     });

    numberCell.animate({
        width: cellSideLength + 'px',
        height: cellSideLength + 'px',
        top: getPosTop(i,j),
        left: getPosLeft(i, j)
    }, 150);
}

function updateScore(score) {
    $('#score').text(score);
}

function resetScore() {
    score = 0;
    updateScore(score);
}