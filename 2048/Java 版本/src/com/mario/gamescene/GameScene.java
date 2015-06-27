package com.mario.gamescene;

import android.app.AlertDialog;
import android.content.DialogInterface;

import com.mario.entity.GameEntity;
import com.mario.res.Res;
import com.mario.util.ConstantUtil;
import com.mario.util.ShareedUtil;
import com.orange.content.SceneBundle;
import com.orange.entity.scene.Scene;
import com.orange.entity.sprite.AnimatedSprite;
import com.orange.entity.sprite.ButtonSprite;
import com.orange.entity.sprite.ButtonSprite.OnClickListener;
import com.orange.entity.text.Text;
import com.orange.res.FontRes;
import com.orange.res.SoundRes;

public class GameScene extends Scene {

	private AnimatedSprite bestScoreBg;
	private GameEntity mGameGroup;
	private Text tBestScore;
	private AnimatedSprite currScoreBg;
	private ButtonSprite btnExit;
	private Text tCurrScore;
	private int currScore = 0;

	@Override
	public void onSceneCreate(SceneBundle bundle) {
		super.onSceneCreate(bundle);
		initGame();
	}

	private void initGame() {
		// 游戏背景
		AnimatedSprite game_bg = new AnimatedSprite(0, 0, Res.GAME_BG,
				getVertexBufferObjectManager());
		this.attachChild(game_bg);
		// 中间游戏主体部分
		mGameGroup = new GameEntity(this);
		// 设置改group的中心点在镜头的中心点上
		mGameGroup.setCentrePosition(this.getCameraCenterX(),
				this.getCameraCenterY());
		this.attachChild(mGameGroup);
		// 2048LOGO
		AnimatedSprite game_logo = new AnimatedSprite(20, 20, Res.GAME_LOGO,
				getVertexBufferObjectManager());
		this.attachChild(game_logo);
		// 最佳得分背景
		bestScoreBg = new AnimatedSprite(0, 20, Res.GAME_SCORE_BG_BEST,
				getVertexBufferObjectManager());
		// 设置bestScoreBg右边x坐标的位置在镜头的右边减20的位置
		bestScoreBg.setRightPositionX(this.getCameraRightX() - 20);
		this.attachChild(bestScoreBg);
		// 设置 tBestScore 的X坐标上的中点在bestScoreBg的X坐标中点上
		tBestScore = new Text(0, bestScoreBg.getY() + 50,
				FontRes.getFont(ConstantUtil.FONT_SCORE_NUM),
				ShareedUtil.getBestScore(getActivity()) + "", 4,
				getVertexBufferObjectManager());
		tBestScore.setCentrePositionX(bestScoreBg.getCentreX());
		this.attachChild(tBestScore);
		// 当前得分背景
		currScoreBg = new AnimatedSprite(0, bestScoreBg.getY(),
				Res.GAME_SCORE_BG_NOW, getVertexBufferObjectManager());
		// 设置currScoreBg的右边X坐标点在bestScoreBg左边的X坐标减20的位置上
		currScoreBg.setRightPositionX(bestScoreBg.getLeftX() - 20);
		this.attachChild(currScoreBg);
		// 当前得分文本
		tCurrScore = new Text(0, currScoreBg.getY() + 50,
				FontRes.getFont(ConstantUtil.FONT_SCORE_NUM), "0", 4,
				getVertexBufferObjectManager());
		tCurrScore.setCentrePositionX(currScoreBg.getCentreX());
		this.attachChild(tCurrScore);
		// 退出按钮
		btnExit = new ButtonSprite(0, 635, Res.GAME_BTN_EXIT,
				getVertexBufferObjectManager());
		btnExit.setRightPositionX(this.getCameraRightX() - 10);
		btnExit.setIgnoreTouch(false);
		btnExit.setOnClickListener(onClickListener);
		this.attachChild(btnExit);
	}

	/**
	 * 更新最高得分纪录
	 * 
	 * @param pBestScore
	 */
	public void updateBestScore(int pBestScore) {
		tBestScore.setText(pBestScore + "");
		// 设置相对bestScoreBgX坐标居中
		tBestScore.setCentrePositionX(bestScoreBg.getCentreX());
	}

	public void addCurrScore(int pAddScore) {
		if (pAddScore != 0) {
			// 播放音乐
			SoundRes.playSound(ConstantUtil.SOUND_MERGE);
		}
		currScore += pAddScore;
		tCurrScore.setText(currScore + "");
		tCurrScore.setCentrePositionX(currScoreBg.getCentreX());
		// 当前分数大于保存的最佳分数时更新最新最佳分数
		if (currScore > ShareedUtil.getBestScore(getActivity())) {
			ShareedUtil.setBestScore(getActivity(), currScore);
			updateBestScore(currScore);
		}
	}

	/**
	 * 清除当前分数
	 */
	public void clearScore() {
		currScore = 0;
		addCurrScore(0);
	}

	/**
	 * 按钮单机事件
	 */
	private OnClickListener onClickListener = new OnClickListener() {

		@Override
		public void onClick(ButtonSprite pButtonSprite, float pTouchAreaLocalX,
				float pTouchAreaLocalY) {
			showDialog();
		}
	};

	/**
	 * 退出游戏确认框
	 */
	public void showDialog(){
		 getActivity().runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				new AlertDialog.Builder(getActivity())
				.setTitle("退出游戏")
				.setMessage("是否退出游戏？")
				.setPositiveButton("确定", new DialogInterface.OnClickListener() {
					
					@Override
					public void onClick(DialogInterface dialog, int which) {
						getActivity().finish();
					}
				}).setNegativeButton("取消", null).show();
			}
		});
	}
	
	/**
	 * 获取镜头右边坐标
	 */
	public float getCameraRightX(){
		return this.getCameraWidth();
	}
	
	/**
	 * 获取镜头中点x坐标
	 * 
	 */
	
	public float getCameraCenterX(){
		return this.getCameraWidth() * 0.5f;
	}
	
	/**
	 * 获取底部镜头Y坐标 
	 */
	
	public float getCameraBottomY(){
		return this.getCameraHeight();
	}
	
	/**
	 * 获取镜头中心Y坐标
	 * 
	 */
	
	public float getCameraCenterY(){
		return this.getCameraHeight() * 0.5f;
	}
}
