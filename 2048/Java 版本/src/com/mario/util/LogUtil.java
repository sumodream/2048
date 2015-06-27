package com.mario.util;

import android.util.Log;

/**
 * 
 * @author Mario
 *
 */
public class LogUtil {
	
	private static final String TAG = "OG";
	private static boolean showLogEnabled = true;

	public static void out(String msg){
		if(showLogEnabled ){
			System.out.println(msg);
		}
	}
	public static void d(String msg){
		if(showLogEnabled ){
			Log.d(TAG,msg);
		}
	}
	public static void i(String msg){
		if(showLogEnabled ){
			Log.i(TAG,msg);
		}
	}
	public static void v(String msg){
		if(showLogEnabled ){
			Log.v(TAG,msg);
		}
	}
	public static void w(String msg){
		if(showLogEnabled ){
			Log.w(TAG,msg);
		}
	}
	public static void e(String msg){
		if(showLogEnabled ){
			Log.e(TAG,msg);
		}
	}
}
