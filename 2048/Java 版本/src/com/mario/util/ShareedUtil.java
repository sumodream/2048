package com.mario.util;

import android.content.Context;
import android.content.SharedPreferences.Editor;

/**
 * 保存到sharedpreferences的数据
 * 
 * @author Mario
 *
 */
public class ShareedUtil {

	private static final String Share_System = "Share_og";
	private static final String BEST_SCORE = "best_score";

	public static void setBestScore(Context pContext, int pBestScore) {
		Editor editor = pContext.getSharedPreferences(Share_System,
				Context.MODE_PRIVATE).edit();
		editor.putInt(BEST_SCORE, pBestScore);
		editor.commit();
	}

	public static int getBestScore(Context context) {
		return context.getSharedPreferences(Share_System, Context.MODE_PRIVATE)
				.getInt(BEST_SCORE, 0);
	}
}
