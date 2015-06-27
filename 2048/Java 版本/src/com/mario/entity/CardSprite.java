package com.mario.entity;

import com.mario.res.Res;
import com.orange.entity.sprite.AnimatedSprite;
import com.orange.opengl.vbo.VertexBufferObjectManager;

/**
 * 卡片精灵
 * @author Mario
 *
 */
public class CardSprite extends AnimatedSprite {

	public CardSprite(VertexBufferObjectManager pVertexBufferObjectManager) {
		super(0, 0, Res.GAME_ROUNDRECT,
				pVertexBufferObjectManager);
	}

/**
 * 设置RGB 0 - 255	
 * @param pRed
 * @param pGreen
 * @param pBlue
 */
	public void setRGB(float pRed,float pGreen, float pBlue){
		this.setColor(pRed / 255, pGreen / 255, pBlue / 255);
	}
	/**
	 * 设置数组的RGB 0 - 255
	 * @param pRGBs
	 */
	public void setRGB(float[] pRGBs){
		this.setColor(pRGBs[0]/255, pRGBs[1]/255, pRGBs[2]/255);
	}
}
