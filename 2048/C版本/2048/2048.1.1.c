/*************************************************************************
    > File Name: 2048.1.1.c
    > Author: 逍遥De仔
    > Mail: fadpoo@163.com 
    > QQ : 326460645		
    > Created Time: 2014年08月08日 星期五 15时52分34秒
 ************************************************************************/
#include<stdio.h>
#include<time.h>
#include<stdlib.h>

int GAMEOVER = 1;//游戏结束标志 

/**************************************/
/************初始化函数****************/
/**************************************/
void init(int num[][4])
{
	int line_num[4], column_num[4];
	int i, j; 

	for(i=0;i<4;i++){
again:  line_num[i] = rand()%4; 
		column_num[i] = rand()%4; 
		for(j=0;j<i;j++)
			if(line_num[i]==line_num[j]&&column_num[i]==column_num[j]) 
				goto again; 
		num[line_num[i]][column_num[i]] = 2; 
		
	}
	return ; 
}

/************************************/
/**************死亡判定**************/
void Death_decision(int num[][4])
{
	int i, j;
	int full, *last_change;

	full = 0, last_change = 0;
	for(i=0;i<4;i++)
		for(j=0;j<4;j++)
			if(num[i][j]!=0)
				full++;
	if(full==16){
		for(i=0;i<4;i++)
			for(j=0;j<4;j++)
				if((num[i][j]==num[i-1][j]&&i>0) ||
					(num[i][j]==num[i][j-1]&&j>0)||
					(num[i][j]==num[i+1][j]&&i<3)||
					(num[i][j]==num[i][j+1]&&j<3))
					return;
	GAMEOVER = 0;
	}

}
/************************************/
/***************制表*****************/
/************************************/
void form(int num[][4])
{	int i,j;
	int line, column;
	
	for(i=0,line=-1;i<=20;i++){
/*-------------print form of '——'-----------*/
		if(i%5==2&&line<4)
			line++;
		if(i%5==0){
			for(j=0;j<=20;j++){
				if(j%5==0)
					printf(" ");
				if(j%5!=0)
					printf("——");
			}
			printf("\n");
		}
				
/*-------------print form of '|' and number-----------*/
		if(i%5!=1&&i!=20){
			for(j=0,column=-1;j<=20;j++){
				if(j%5==2&&column<4)
					column++;
				if(j%5==0)
					if(i%5==2&&num[line][column+1]!=0)
						printf("| ");
					else{
						printf("|        ");
					}
				if(j%5==2&&i%5==2)
					if(num[line][column]!=0){
						printf("\033[31m\033[1m"); 
						printf("%-6.d ",num[line][column]);
						printf("\033[0m"); 
					}
			}
			printf("\n");
		}
	}

	
}

/************************************在空格中插入随机数************************
 *  输入 ： 数组阵列
 *  功能 ： 在阵列中大小为0的地方插入随机数2或4
 *  输出 ： 无
 ****************************************************************************/
void randon(int num[][4])
{
	int loop_line[4]={0}, loop_col[4]={0};
	int i, j, count;
	
	count = 0;
	for(i=0;i<4;i++)
		for(j=0;j<4;j++)
			if(num[i][j]!=0)
				count++;
	if(count>=16)
		GAMEOVER = 0;

	for(i=0;i<1;i++){
again: 	loop_line[i] = rand()%4;
	 	loop_col[i] = rand()%4;
		if(num[loop_line[i]][loop_col[i]]!=0)
			goto again;
		if(i==1&&loop_line[0]==loop_line[1]&&loop_col[0]==loop_col[1])
			goto again;
		num[loop_line[i]][loop_col[i]] =(rand()%2+1)*2;
	}

}
/**************************向左移动的判断******************************
 *  输入 ： 数组阵列
 *  功能 ： 向左合并且压缩阵列
 *  输出 ： 无
 *
 *********************************************************************/
void L_move(int num[][4])
{ 
	int i, j, flag, *temp, count_i, count_j, count[4]={0};
	count_i =0; 
/*****************合并*****************/
	for(i=0;i<4;i++){
		flag = 0;
		for(j=0;j<4;j++){
			if(num[i][j]!=0&&flag==0){
				temp = &num[i][j];
				flag = 1; 
				continue; 
			}
			if(num[i][j]!=0&&flag==1){
				if(num[i][j]==*temp){
					*temp = *temp+num[i][j]; 
					num[i][j] = 0;
					flag = 0; 
				}else{
					temp = &num[i][j];
				}
			}
		}

	}

/***************移动*****************/
	for(i=0;i<4;i++){
		count_j = 0;
		for(j=0;j<4;j++){ 
			if(num[i][j]!=0){
				count[count_j] = num[i][j];
				num[i][j] = 0; 
				count_j++;
			}
		}
		if(count_j==0){
			count_i++;
			continue; 
		}
		count_j;
		for(j=0;j<count_j;j++){
			num[i][j] = count[j];
		}

	
		} 
	randon(num);
	return ; 
}

/**************************向右移动的判断******************************
 *  输入 ： 数组阵列
 *  功能 ： 向右合并且压缩阵列
 *  输出 ： 无
 *
 *********************************************************************/
void R_move(int num[][4])
{ 
	int i, j, flag, *temp, count_i, count_j, count[4]={0};
/*****************合并*****************/
	for(i=0;i<4;i++){
		flag = 0;
		for(j=3;j>=0;j--){
			if(num[i][j]!=0&&flag==0){
				temp = &num[i][j];
				flag = 1; 
				continue; 
			}
			if(num[i][j]!=0&&flag==1){
				if(num[i][j]==*temp){
					*temp = *temp+num[i][j]; 
					num[i][j] = 0;
					flag = 0; 
				}else{
					temp = &num[i][j];
				}
			}
		}

	}

/***************移动*****************/
	count_i = 0; 
	for(i=0;i<4;i++){
		count_j = 3;
		for(j=3;j>=0;j--){ 
			if(num[i][j]!=0){
				count[count_j] = num[i][j];
				num[i][j] = 0; 
				count_j--;
			}
		}
		if(count_j==3){
			count_i++;
			continue; 
		}
		count_j;
		for(j=3;j>count_j;j--){
			num[i][j] = count[j];
		}

	}
	if(count_i>=4){
		GAMEOVER=0;
		return ;
	} 
	randon(num);
	return ; 
}

/**************************向上移动的判断******************************
 *  输入 ： 数组阵列
 *  功能 ： 向上合并且压缩阵列
 *  输出 ： 无
 *
 *********************************************************************/
void U_move(int num[][4])
{ 
	int i, j, flag, *temp, count_i, count_j, count[4]={0};
/*****************合并*****************/
	for(j=0;j<4;j++){
		flag = 0;
		for(i=0;i<4;i++){
			if(num[i][j]!=0&&flag==0){
				temp = &num[i][j];
				flag = 1; 
				continue; 
			}
			if(num[i][j]!=0&&flag==1){
				if(num[i][j]==*temp){
					*temp = *temp+num[i][j]; 
					num[i][j] = 0;
					flag = 0; 
				}else{
					temp = &num[i][j];
				}
			}
		}

	}

/***************移动*****************/
	count_j = 0; 
	for(j=0;j<4;j++){
		count_i = 0;
		for(i=0;i<4;i++){ 
			if(num[i][j]!=0){
				count[count_i] = num[i][j];
				num[i][j] = 0; 
				count_i++;
			}
		}
		if(count_i==0){
			count_j++;
			continue; 
		}
		count_j;
		for(i=0;i<count_i;i++){
			num[i][j] = count[i];
		}

	}
	if(count_j>=4){
		GAMEOVER=0;
		return ;
	} 
	randon(num);
	return ; 
}
/**************************向下移动的判断******************************
 *  输入 ： 数组阵列
 *  功能 ： 向下合并且压缩阵列
 *  输出 ： 无
 *
 *********************************************************************/
void D_move(int num[][4])
{ 
	int i, j, flag, *temp, count_i, count_j, count[4]={0};
/*****************合并*****************/
	for(j=0;j<4;j++){
		flag = 0;
		for(i=3;i>=0;i--){
			if(num[i][j]!=0&&flag==0){
				temp = &num[i][j];
				flag = 1; 
				continue; 
			}
			if(num[i][j]!=0&&flag==1){
				if(num[i][j]==*temp){
					*temp = *temp+num[i][j]; 
					num[i][j] = 0;
					flag = 0; 
				}else{
					temp = &num[i][j];
				}
			}
		}

	}

/***************移动*****************/
	count_j = 0; 
	for(j=0;j<4;j++){
		count_i = 3;
		for(i=3;i>=0;i--){ 
			if(num[i][j]!=0){
				count[count_i] = num[i][j];
				num[i][j] = 0; 
				count_i--;
			}
		}
		if(count_i==3){
			count_j++;
			continue; 
		}
		count_i;
		for(i=3;i>count_i;i--){
			num[i][j] = count[i];
		}

	}
	if(count_j>=4){
		GAMEOVER=0;
		return ;
	} 
	randon(num);
	return ; 
}

int main(void)
{
	int num[4][4] = {0}; 
	volatile char finger; 

	srand(time(NULL));
	init(num); 
	form(num);

	while(GAMEOVER){
		scanf("%s",&finger); 
		getchar();
		system("clear"); 
		switch(finger){
			case 'w':
				U_move(num);
				form(num);
				break;
			case 's':
				D_move(num);
				form(num);
				break;
			case 'a':
				L_move(num);
				form(num);
				break;
			case 'd':
				R_move(num);
				form(num);
				break;
			default :
				printf("ERROR!"); 
		}
		Death_decision(num); 	
	}
	printf("GAME OVER!\n");
	printf("Thanks you~"); 
	return 0;
}
