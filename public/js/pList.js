define(function(){
	function plist(){
		(function($){
			ajax({
				url:"http://localhost:8686/pList",
				data:{},
				success:function(res){
					
					//列表
					var listTop=$(".listTop");
					//var listTop = document.getElementsByClassName("listTop")[0];
					console.log(listTop);
					res=JSON.parse(res);
					console.log("90909",res);
					for(var i=0;i<res.tips.length;i++){
						var arr=res.tips[i].items.map(function(value){
							return `<span>${value}</span>`
						})
						var spanList=arr.join("");
						
						if(res.tips[i].more){
							var ahtml=`<a href="#" class="more"><b>${res.tips[i].more}</b><i></i></a>`;
						}
						
						var html=`<li><p>${res.tips[i].title}</p><div class="spanlist">${spanList}</div>${ahtml}</li>`;
						listTop.append(html);
					}
					
					$(".listTop li").eq(0).find(".spanlist").addClass("brands");
					$(".listTop li").eq(1).find(".spanlist").addClass("tip");
					$(".listTop li").eq(2).find(".spanlist").addClass("sort");
					
					var n=0;
					$(".more").click(function(){
						n++;
						if(n%2==0){
							$(".listTop li").eq(0).css("height",55).end();
							$(".brands").css({"height":55,"overflow":"hidden"});
							$(".more b").html("更多");
						}else{
							$(".listTop li").eq(0).css("height",200);
							$(".brands").css({"height":200,"overflow":"auto"});
							$(".more b").html("收起");
							$(".more i").css("transform","rotateX(180deg)");
							
						}
					});
	
					var plist=$(".plist");
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].disc){
							var disc = res.data[i].disc;
						}
						var href = `proDetail.html?id=${res.data[i].id}`;
						var oli=`<li>
									<a href="${href}">
										<img src="../images/plist${res.data[i].id}.jpg" alt="" />
										<p>${res.data[i].brand}</p>
										<p>${res.data[i].cname}</p>
										<span>${disc}</span>
										<i>${res.data[i].price}</i>
									</a>
								</li>`;
						plist.append(oli);
					}
	
				},
				error:function(){console.log("error with plist")}
			});
		})(jQuery)
		


	}
	return plist;
	
})
	
	
	
	

