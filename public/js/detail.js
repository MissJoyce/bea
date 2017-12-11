define(function(){
	function detail(){
		(function($){
			var obj={};
			var temp={};
			var num=1;
			ajax({
				url:"http://localhost:8686/proDetail",
				data:{},
				success:function(res){
					res=JSON.parse(res);
					console.log(res);
					//location方法获取商品ID
				var pId=getId(location.search);
				//console.log(pId);
				//var strAll="";
				for(let i=0;i<res.data.length;i++){
					//根据id判断是哪个商品
					if(res.data[i].id==pId){
						//根据数据生成展示图片
						//console.log(res.data[i].id);
						var arr = res.data[i].imgArr.map(function(value){
							return `<img src="${value}" />`;
						});
						var imgHTML=arr.join("");
						var html=`<div class="imgshow">${imgHTML}</div>`;
						$('.detail').append(html);
						//生成价钱等
						var href=`shopcart.html`;
						var text1=`<div class="disc">
										<a href="#" class="brand">${res.data[i].brand}</a>
										<p>${res.data[i].cname}</p>
										<p>${res.data[i].ename}</p>
										<span>${res.data[i].price}</span>
										<a href="#" class="add">加入购物车</a>
										<a href="#" class="like">加入收藏夹</a>
									</div>`;
						//生成描述信息
						var arr2=res.data[i].uList.map(function(value){
							//console.log(value);
							return `<li>
										<h3>${value.c}
											<span>${value.e}</span>
										</h3>
										<p>${value.p}</p>
									</li>`
						});
						var text2=arr2.join("");
						var str=`<div class="text">${text1}<ul class="list">${text2}</ul></div>`;
						$('.detail').append(str);
						
						//生成蒙版信息
						var box=$(".filter");
						var fhtml=`<div class="det">
										<a href="#"><img src="${res.data[i].imgArr[0]}" alt="" /></a>
										<span>${res.data[i].cname}已经加入您的购物车</span>
										<div class="btn clear">
											<a href="#" class="continue left">继续购物</a>
											<a href="#" class="gocart right">查看购物车并结算</a>
										</div>
										<p>你也许会喜欢下面的商品</p>
									</div>`;
						box.append(fhtml);
	
						//点击加入购物车出现蒙版,并根据id生成cookie;
						var timer=null;
						$(".add").click(function(){
							//点击时透明蒙版出现
							//$(".cartMeng").css("display","block");
							$(".cartMeng").show(10);
							//蒙版内部的子元素出现
							$(".filter").children().css("display","block");
							//蒙版出现的位置和宽高还原
							$(".filter").css({"display":"block","left":70,"top":150,"width":515,"height":252});
							//判断页面是否有cookie,即购物车是否有商品
							/* if(getCookie("idNum")){
								var cookie=getCookie("idNum");
								temp=JSON.parse(cookie);
							} */
							if(localStorage.idNum){
								var cookie=localStorage.idNum;
								temp=JSON.parse(cookie);
							}
							//console.log(temp);
							//找到当前点击的商品id,和点击次数
							if(!obj[res.data[i].id]){
								obj[res.data[i].id]=num;
							}else{
								var n=obj[res.data[i].id];
								n++;
								obj[res.data[i].id]=n;
							}
							//console.log(obj);
							//判断先前的cookie当中是否具有当前点击的商品id,如果有，则在原先的基础上加1，否则添加至原先的对象里
							for(var key in obj){ 
								if(!temp[key]){
									temp[key]=obj[key];
									//console.log(temp[key]);
								}else{
									var x=temp[key];
									x++;
									temp[key]=x;
								}
							}
							//console.log(temp);
							//每次根据对比得出的对象生成cookie
							var str=JSON.stringify(temp);
							localStorage.setItem("idNum",str);
							// setCookie("idNum",str);
							//设置定时器使蒙版自动消失
							timer=setTimeout(function(){
								//蒙版内部的内容宽高move,运动
								move($(".filter")[0],{"width":0,"height":0,"left":921,"top":37});
								//透明蒙版消失
								//$(".cartMeng").css("display","none");
								$(".cartMeng").hide(10);
								//蒙版内部的子元素消失
								$(".filter").children().css("display","none");
								//$(".filter").css("display","none");
							},2000)	
						});
						
						//点击继续
						$(".filter").hover(function(){
							$(".continue").click(function(){
								$(".continue").attr("href","pList.html");
							});
							//点击去购物车
							$(".gocart").click(function(){
								$(".gocart").attr("href","shopcart.html");
							});
							//点击关闭
							$(".close").click(function(){
								$(".cartMeng").css("display","none");
								$(".filter").css("display","none");
								clearTimeout(timer);
							});	
						},function(){});
					}			
				}
	
				},
				error:function(){
					console.log("详情请求错误！");
				}
			});
		})(jQuery)
	}
	
	//console.log(location.search);
	function getId(search){
		var str = search.slice(1);
		var arr=str.split("=");
		var k=arr[0];
		var v=arr[1];
		var res="";
		if(k=="id"){
			res=v;
		}
		return res;
	}
	return detail;
})
