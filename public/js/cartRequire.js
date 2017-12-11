require({
	paths:{
		"jquery":"jquery-1.11.3.min",
		"lunbo":"lunbo",
		"addPro":"shopcart"
	}
})


require(["jquery","lunbo","addPro"],function($,lunbo,addPro){
	//引入头部
	$(function(){
		$(".head").load("head.html",function(){});
		$(".foot").load("foot.html",function(){});
	});
	lunbo();
	addPro();
})
