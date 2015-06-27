package com.mario.entity;

import com.mario.util.ConstantUtil;
import com.orange.entity.group.EntityGroup;
import com.orange.entity.scene.Scene;
import com.orange.entity.text.Text;
import com.orange.res.FontRes;

public class CardEntity extends EntityGroup {

	private int number = 0;
	private CardSprite cardSprite;
	private Text tNum;

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
		onDrawNum(number);
	}

	public CardEntity(float pX, float pY, Scene pScene) {
		super(pX, pY, 90, 90, pScene);
		// 初始化View
		initView();
		// 自动计算自适应宽高
		this.setWrapSize();
	}

	private void initView() {
		// 创建卡片精灵
		cardSprite = new CardSprite(this.getVertexBufferObjectManager());
		this.attachChild(cardSprite);
		// 创建文本实体用于显示卡片上的数字
		tNum = new Text(0, 0, FontRes.getFont(ConstantUtil.FONT_CARD_NUM), "",
				4, this.getVertexBufferObjectManager());
		// 设置文本的中心坐标
		tNum.setCentrePositionY(cardSprite.getCentreY());
		this.attachChild(tNum);
		// 话卡片上的颜色并根据颜色显示（默认值为0）
		onDrawNum(0);
	}

	// 话卡片上的颜色并根据颜色显示
	private void onDrawNum(int number) {
		float[] mRGBs;
		switch (number) {
		case 0:
			mRGBs = ConstantUtil.RGBS_0;
			break;
		case 2:
			mRGBs = ConstantUtil.RGBS_2;
			break;
		case 4:
			mRGBs = ConstantUtil.RGBS_4;
			break;
		case 8:
			mRGBs = ConstantUtil.RGBS_8;
			break;
		case 16:
			mRGBs = ConstantUtil.RGBS_16;
			break;
		case 32:
			mRGBs = ConstantUtil.RGBS_32;
			break;
		case 64:
			mRGBs = ConstantUtil.RGBS_64;
			break;
		case 128:
			mRGBs = ConstantUtil.RGBS_128;
			break;
		case 256:
			mRGBs = ConstantUtil.RGBS_256;
			break;
		case 512:
			mRGBs = ConstantUtil.RGBS_512;
			break;
		case 1024:
			mRGBs = ConstantUtil.RGBS_1024;
			break;
		case 2048:
			mRGBs = ConstantUtil.RGBS_2048;
			break;
		default:
			mRGBs = ConstantUtil.RGBS_0;
			break;
		}
		//设置精灵的颜色
		cardSprite.setRGB(mRGBs);
		
		if(number == 0){
			tNum.setText("");
		}else{
			tNum.setText(number+"");
			tNum.setCentrePositionX(cardSprite.getCentreX());
		}
	}
	
	//对比当前卡片与传进来的卡片是否相等
	public boolean equals(CardEntity pCardGroup){
		return getNumber() == pCardGroup.getNumber();
	}
}
