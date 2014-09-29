package project.digit.utils.translator;

import java.io.UnsupportedEncodingException;

public class ChineseTranslator {
	
	public static String encodeCharactors(String str) throws UnsupportedEncodingException {
		return java.net.URLEncoder.encode(str, "UTF-8").replaceAll("\\%28", "(")
				.replaceAll("\\%29", ")")
				.replaceAll("\\+", "%20")
				.replaceAll("\\%27", "'")
				.replaceAll("\\%21", "!")
				.replaceAll("\\%7E", "~");
	}
	
	public static String decodeCharactors(String str) throws UnsupportedEncodingException {
		return java.net.URLDecoder.decode(str, "UTF-8");
	}
}
