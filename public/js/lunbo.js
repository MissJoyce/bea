define(function(){
	function lunbo(){
		(function($){
			ajax({
				url:"http://localhost:8686/proDetail",
				data:{},
				success:function(res){
					res=JSON.parse(res);
					console.log(res);
					var arr = res.data.map(function(value){
						var href=`proDetail.html?id=${value.id}`;
						var preprice=" ";
						var desc="";
						if(value.preprice){
							preprice=`<i>${value.preprice}</i>`;
						}
						if(value.desc){
							desc=`<span>${value.desc}</span>`;
						}
						var n = Number(`${value.id}`);
						return `<li>
									<a href="${href}">
										<img src="images/lun${n}.jpg"/>
										${desc}
										<p>${value.brand}</p>
										<p>${value.cname}</p>
										<p class="price">${value.price}${preprice}</p>
									</a>
								</li>`
					});
					var listr=arr.join("");
					$(".lunbo").append(listr);
					//
					var index=0;
					var size=$(".lunbo").find("li").size();
					//console.log($(".lunbo li"));
					//console.log(size);
					function move(){
						if(index>size-4){
							index=0;
						}else if(index<0){
							index=size-4;
						}
						var l = -index*225;
						$(".lunbo").css("left",l);
						//console.log(index);
					}
					
					$(".leftBtn").click(function(){
						index--;
						move();
					})
					$(".rightBtn").click(function(){
						index++;
						move();
					});
					
					var timer=null;
					autoPlay();
					
					function autoPlay(){
						timer=setInterval(function(){
							$(".rightBtn").eq(0).trigger("click");
						},2000);
					}
		
					//console.log($(".others").eq(0));
		
					$(".others").eq(0).mouseover(function(){
						clearInterval(timer);
						//console.log(33);
					});
					$(".others").eq(0).mouseout(function(){
						autoPlay();
					});
		
				},
				error:function(){console.log("详情lunbo请求错误！")}
			});

		/* 	ajax({
				url:"http://localhost:8686/shopcart",
				data:{},
				success:function(res){
					res=JSON.parse(res);
					console.log(res);
					var arr = res.data.map(function(value){
						var href=`proDetail.html?id=${value.id}`;
						var preprice=" ";
						var desc="";
						if(value.preprice){
							preprice=`<i>${value.preprice}</i>`;
						}
						if(value.desc){
							desc=`<span>${value.desc}</span>`;
						}
						var n = Number(`${value.id}`);
						return `<li>
									<a href="${href}">
										<img src="images/lun${n}.jpg"/>
										${desc}
										<p>${value.brand}</p>
										<p>${value.cname}</p>
										<p class="price">${value.price}${preprice}</p>
									</a>
								</li>`
					});
					var listr=arr.join("");
					$(".lunbo").append(listr);
					//
					var index=0;
					var size=$(".lunbo").find("li").size();
					//console.log($(".lunbo li"));
					//console.log(size);
					function move(){
						if(index>size-4){
							index=0;
						}else if(index<0){
							index=size-4;
						}
						var l = -index*225;
						$(".lunbo").css("left",l);
						//console.log(index);
					}
					
					$(".leftBtn").click(function(){
						index--;
						move();
					})
					$(".rightBtn").click(function(){
						index++;
						move();
					});
					
					var timer=null;
					autoPlay();
					
					function autoPlay(){
						timer=setInterval(function(){
							$(".rightBtn").eq(0).trigger("click");
						},2000);
					}
		
					//console.log($(".others").eq(0));
		
					$(".others").eq(0).mouseover(function(){
						clearInterval(timer);
						//console.log(33);
					});
					$(".others").eq(0).mouseout(function(){
						autoPlay();
					});
		
				},
				error:function(){console.log("购物车lunbo请求错误！")}
			}); */

		})(jQuery)
	}
	return lunbo;
})
