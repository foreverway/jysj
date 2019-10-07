/* eslint disabled */
var ua = window.navigator.userAgent;
var isIE = ("ActiveXObject" in window);
var isChrome = ua.match(/Chrome/i);
var isMobile = !!(ua.match(/(iPhone|iPad|iPod)/i) || ua.match(/Android/i) || ua.match(/Windows Phone/i) || ua.match(/IEMobile/i));
var IEVersion = null;
var isIE8, isIE9, isIE10, isIE11;
isIE8 = isIE9 = isIE10 = isIE11 = false;
var appName = navigator.appName;
if (appName == "Microsoft Internet Explorer" || isIE) {
	var ret = ua.match(/MSIE (\d+[.\d]*)/);
	if (ret) {
		var version = ret[1];
		IEVersion = version;
		var num = parseInt(version, 10);
		isIE8 = num === 8;
		isIE9 = num == 9;
		isIE10 = num == 10;
		isIE11 = num == 11;
	}
}

/**
 * 浏览器环境判断模块
 */
export default {
  isChrome, // 是否Chrome浏览器
  isIE, // 是否IE浏览器
  isMobile, // 是否移动端
  IEVersion,
  isIE8,
  isIE9,
  isIE10,
  isIE11,
  //yidong_url_s: 'http://student.hqjystudio.com', // 正式移动端访问地址student.hqjystudio.com  测试移动端地址http://vue.test.hqjystudio.com
  post_url_s: 'http://personal.hqjystudio.com', // 接口地址http://personal.hqjystudio.com  测试接口地址http://personal.test.hqjystudio.com
  //admin_url_s: 'http://cms.hqjystudio.com/admin/index.php'
}