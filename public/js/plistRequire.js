require.config({
	
	paths:{
		'jquery':'jquery-1.11.3.min',
		"plist":"pList"
	}
});

require(["jquery","plist"],function($,plist){
	
	$(function(){
		$(".head").load("head.html",function(){});
	
		$(".foot").load("foot.html",function(){});
	})
	
	plist();
	
	//动态显示时间
	var d = new Date();
	//console.log(d);
	function date(d){
		return addZero((d.getMonth()+1))+"月"+addZero(d.getDate())+"日";
	}
	var time=date(d);
	//console.log(time);
	console.log($(".tips .time").find("span")[0]);
	$(".tips .time").find("span")[0].innerHTML=time;
	
})
