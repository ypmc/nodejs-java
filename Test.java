package net.cq.test;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
public class Test {

	public static void main(String[] args) throws UnsupportedEncodingException {
		if(args!=null&&args.length == 1){
			System.out.print(toParse(args[0]));
		}else{
			System.out.print("Wrong Args");
		}
	}
	
	static String toParse(String str){		
		return Base64.getUrlEncoder().encodeToString(str.getBytes());
	}

}
