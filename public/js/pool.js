//1、获取函数参数的最大值
function getMax(){
	var max=arguments[0];
	for(var i=0;i<arguments.length;i++){
		if(max<=arguments[i]){
			max=arguments[i];
		}
	}
	return max;
}
//var num=getMax(4,5,6,7,4,67);
//console.log(num);

//2、获取函数参数的最小值
function getMin(){
	var min=arguments[0];
	for(var i=0;i<arguments.length;i++){
		if(min>=arguments[i]){
			min=arguments[i];
		}
	}
	return min;
}
//var num=getMin(4,5,6,7,4,67);
//console.log(num);



//3、随机数 默认n < m
function ran1Dom(n,m){
	var num=parseInt(n+Math.random()*(m-n+1));
	return num;
}

//4、数组的随机排序
function arrRandom(arr){
	arr.sort(function(){
		return 0.5-Math.random();
	})
}


//5、求数组的最大数
function getMax(arr){
	var max=arr[0];
	for(var i in arr){
		if(max<arr[i]){
			max=arr[i];
		}
	}
	return max;
}
// var x=getMax(arr);
// console.log(x);


//6、求数组的最小数
function getMin(arr){
	var min=arr[0]; 
	for(var i in arr){
		if(min>=arr[i]){ //如果初始min不是从arr[0]开始，必须加=号
			min=arr[i];
		}
	}
	return min;
}
// var x=getMin(arr);
// console.log(x);


//8、求数组的最大数的下标
function getMaxIndex(arr){
	var max=arr[0];
	var index="";   //计算下标，最小数不知止一个时，使用字符串拼接
	for(var i in arr){
		if(max<=arr[i]){
			max=arr[i];
			index+=i;  
		}
	}
	return index;
}
// var x=getMaxIndex(arr);
// console.log(x);



//8、求数组的最小数的下标
function getMinIndex(arr){
	var min=arr[0];
	var index="";   //计算下标，最小数不知止一个时，使用字符串拼接
	for(var i in arr){
		if(min>=arr[i]){
			min=arr[i];
			index+=i;  
		}
	}
	return index;
}
// var x=getMinIndex(arr);
// console.log(x);



// 9、 冒泡排序
// 规律: 从第一个数开始，依次两两进行比较，总的比较 数组.length-1 个轮回，每个轮回比较 数组.length-1-i 次
function bubbling(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>=arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
		
		return arr;
}

// var arr1=bubbling(arr);
// console.log(arr1);


//10、选择排序
// 规律:第一个数字与后面的数依次进行比较，总的比较 数组.length 个轮回，每一轮中比较的规律是i+1;
function selectSort(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}
//console.log(selectSort(arr));

//11、判断数组中是否存在某个元素，
//传入的值是一个数组  num是一个字符
function has(arr,num){
	for(var i in arr){
		if(arr[i]===num){
			return true;
		}
	}
	return false;
}


//12、数组去重
function norepeat(arr){
	var arr1=[];
	for(var i=0;i<arr.length;i++){
		if(!has(arr1,arr[i])){
			arr1.push(arr[i]);
		}
	}
	return arr1;
}

//13、数组插入一个数，按原来大小顺序重排
function sort1Arr(arr,n){			
	for(var i=0;i<arr.length;i++){
		if(arr[arr.length-1]<n){
			arr.push(n);
		}else if(arr[i]>n){
			arr.splice(i,0,n);
			break;
		}
	}
	return arr;
}

//14、不足两位时补一个零
function addZero(num){
	num=""+num;
	return num.length<2?"0"+num:num;
}

//不足两位时补一个零，不足三位时补两个零
//用于倒计时计算毫秒位数
function add2Zero(num){
	var str=""+num;
	switch(str.length){
		case 1:
			return "00"+str;
			break;
		case 2: 
			return "0"+str;
			break;
		case 3:
			return str;
			break;
		default:
			break;
	}
}



//15、数字字母混合验证码(6位)

function authCode(){
	var str="";
	for(var i=0;i<6;i++){
		var num=ran1Dom(48,122);
		while((num>57&&num<65)||(num>90&&num<97)){
			num=ran1Dom(48,122);
		}
		//将ASCII码转换成字符
		str+=String.fromCharCode(num);
	}

	/*

	while(str.length<6){
		var num = randomNum(48,122)
		if((num>57&&num<65)||(num>90&&num<97)){
			num = randomNum(48,122)
		}else{
			//将ASCII码转换成字符
			str+=String.fromCharCode(num)
		}
	}
*/
	return str;
}

//16、将当前的时间对象转换成字符串输出
//2017-10-11 19:12:20
//var d=new Date();
function dateString(d,sign){
	if(sign==undefined){
		sign="/";
	}
	return d.getFullYear()+sign+addZero((d.getMonth()+1))+sign+addZero(d.getDate())+" "+addZero(d.getHours())+":"+addZero(d.getMinutes())+":"+addZero(d.getSeconds());
}

function date2String(d,sign){
	if(sign==undefined){
		sign="/";
	}
	return d.getFullYear()+sign+addZero((d.getMonth()+1))+sign+addZero(d.getDate())+" "+addZero(d.getHours())+":"+addZero(d.getMinutes())+":"+addZero(d.getSeconds());
}
//获取动态时间
/*
var timer=null;
 timer=setInterval(function(){
	var d = new Date();
	var time=dateString(d,"-");
	document.body.innerHTML=time;
},1000);
*/

//17、随机颜色
function randomColor(){
	var R=ran1Dom(0,255);
	var G=ran1Dom(0,255);
	var B=ran1Dom(0,255);
	return "#"+stringRgb(R,G,B);
}

function stringRgb(r,g,b){
	r=r.toString(16).length<2?"0"+r.toString(16):r.toString(16);
	g=g.toString(16).length<2?"0"+g.toString(16):g.toString(16);
	b=b.toString(16).length<2?"0"+b.toString(16):b.toString(16);
	return r+g+b;
}

//18、获取非行间样式
function getStyle(ele,attr){
	if(ele.currentStyle){
		//兼容IE8（包括）以下
		return ele.currentStyle[attr];
	}else{

		return getComputedStyle(ele,false)[attr];
	}
}

//19、获取、设置，自定义属性
function attr(ele,attrType,val){
	if(arguments.length<2){
		return;
	}else if(arguments.length==2){
		//传入两个值时，获取该属性
		return ele.getAttribute(attrType);
	}else{
		//传入三个值，设置自定义属性
		return ele.setAttribute(attrType,val);
	}
}
/*attr(oBox,"title","盒子");
console.log(attr(oBox,"title"));*/

//20、获取当前元素相对html窗口的offsetLeft和offsetTop
function offset(ele){
	var obj={};
	obj.L=ele.offsetLeft;
	obj.T=ele.offsetTop;
	while(ele.offsetParent){
		ele=ele.offsetParent;
		obj.L+=ele.offsetLeft;
		obj.T+=ele.offsetTop;
	}
	return obj;
}


//21、获取id元素
function $(id){
	var id = id.slice(1,id.length)
   return document.getElementById(id)
}

//22、隐藏
function hide(ele){
	ele.style.display="none";
}
//23、显示
function show(ele){
	ele.style.display="block";
}
//24、获取前一个兄弟元素节点
function prevChild(ele) {
	 return ele.previousElementSibling;
}


//25、组织浏览器默认行为
function stopDefault( e ){
 if ( e && e.preventDefault ){
 	e.preventDefault();
 }else{
 	 window.event.returnValue = false;
  } 
 return false; 
}


//阻止右键菜单
document.oncontextmenu=function(e){
	//事件对象的兼容问题
	//var e=e||event;
	e.preventDefault?e.preventDefault():e.returnValue=false;
}


//26、事件监听
//参数：对象，事件类型，回调函数，是否捕获 
function attach(ele,type,fn,bool){
	if(!bool){
		bool=false;
	}
	if(ele.addEventListener){
		//事件名称不用加on,按队列执行
		ele.addEventListener(type,fn,bool)
	}else{
		//IE下，事件要加on,没有捕获（网景推出），执行顺序是先进后出
		ele.attachEvent("on"+type,fn)
	}
}


//27、阻止事件的冒泡
function cancel(e){
	var e=e||event;
	//火狐、谷歌   :   IE     
	e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}


//28、cookie 存储的是字符串
//设置cookie,属性 值 过期时间：当前时间加上设置时间
function setCookie(attr,val,expires){
	var d=new Date();
	d.setDate(d.getDate()+expires);
	document.cookie=attr+"="+val+";path=/;expires="+d;
}

//29\获取cookie 中键的值;
function getCookie(attr){
	var cookie=document.cookie;
	//将cookie中的字符串转换为数组，"userName=誉王;path=/;expires="+d;
	var arr=cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split("=");
		if(newArr[0]==attr){
			return newArr[1];
		}
	}
}

//30、删除cookie,将过期时期设置为前一天
function moveCookie(attr,val){
	setCookie(attr,val,-1);
}

//40、通过正则/b 查找class的元素
function getClassName(parent,aClass){
	var aC=parent.querySelectorAll("*");
	var arr=[];
	var reg=/"\b"+aClass+"\b"/;
	for(var i=0;i<aC.length;i++){
		if(reg.test(aC[i].className)){
			arr.push(aC[i]);
		}
	}
	return arr;
}


//41完美运动
function move(obj,json,fn){
	//解决抢定时器的问题
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		//开关门，关闭定时器按钮，
		var bStop=true;
		var iCur=0;
		for(var attr in json){
			//获取到的透明度是opacity,小数形式，我们要用的是filter数字，转换一下
			if(attr=="opacity"){
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}

			var speed=(json[attr]-iCur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			if(iCur!=json[attr]){
					bStop=false;
			}

			if(attr=="opacity"){
				obj.style.opacity=(iCur+speed)/100;
				obj.style.filter="alpha(opacity:"+(iCur+speed)+")";
			}else{
				obj.style[attr]=iCur+speed+"px";
			}
		
		}

		if(bStop){
			clearInterval(obj.timer);
			//判断是否有链式运动，有的话继续执行
			if(fn){
				fn();
			}
		}
			

	},10);

}

//42，根据某个事件计算更新时间
function getUptime(date){
	var now=new Date();
	var time=now.getTime()-date.getTime();
	var min=Math.floor(time/1000/60);
	var relStr="";
	if(min<60){
		relStr=min+"分钟前更新";
	}else if(min<60*24){
		relStr=parseInt(min/60)+"小时前更新";
	}else if(min<60*24*30){
		relStr=parseInt(min/60/24)+"天前更新";
	}
	return relStr;
}


//43、ajax
function ajax(obj) {
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		//判断状态
		if(obj.type){
			if(obj.type.toLowerCase()=="get"){
				xhr.open("get",obj.url,true);
				xhr.send(null);
			}else{
				xhr.open("POST",obj.url,true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var arr=[];
				for(var key in obj.params){
					arr.push(key+"="+encodeURIComponent(obj.params[key]));
					xhr.send(arr.join("&"));
				}
			}
		}else{
			xhr.open("get",obj.url,true);
			xhr.send(null);
		}	

		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					var jsonStr=xhr.responseText;
					var jsonObj=JSON.parse(jsonStr);
					/*if(obj.success){
						obj.success(jsonObj);
					}*/
					resolve(jsonObj);
				}else{
					//请求失败
					/*if(obj.error){
						obj.error(xhr.status);
					}*/
					reject(xhr.status);
				}
			}
		}
		
	});
	
}