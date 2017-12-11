define(function(){
	function add(){
		(function($){
			ajax({
				url:"http://localhost:8686/shopcart",
				data:{},
				success:function(res){
					res=JSON.parse(res);
					var keyarr=[];   //用于存放加入购物车的商品id/key,进行删除或加减操作时，根据id/key删除其在json对象中的值，再设置cookie
					// if(getCookie("idNum")){
					if(localStorage.idNum){
						// var idCookie=getCookie("idNum");
						var idCookie=localStorage.idNum;
						//var str=idCookie.split(":");
						//将字符串转换为对象 
						var obj2=JSON.parse(idCookie);
						var table=$("table");
						var tr1=`<tr>
									<td><input type="checkbox" id="selectAll"/></td>
									<td colspan="2">全选<span class="manjian">满99享包邮</span></td>
									<td>单价</td>
									<td style="text-align: center;">件数</td>
									<td>小计</td>
									<td>操作</td>
								</tr>`;
						table.append(tr1);
						
						for(var i=0;i<res.data.length;i++){
							for(var key in obj2){	
								if(res.data[i].id==key){
									//总价
									keyarr.push(key);
									var totalPrice=getPrice(res.data[i].price)*obj2[key];
									var href=`proDetail.html?id=${res.data[i].id}`;
									var trx=`<tr>
												<td><input type="checkbox" class="check"  /></td>
												<td><a href="${href}" class="imgshow"><img src="${res.data[i].imgArr[0]}" /></a></td>
												<td><a href="#"><p class="brand">${res.data[i].brand}</p><p class="info">${res.data[i].cname}</p></a></td>
												<td><p class="price">${res.data[i].price}</p></td>
												<td><div class="p-num clear">
													<span class="reduce">-</span>
													<span class="pnum">${obj2[key]}</span>
													<span class="add">+</span>
												</div></td>
												<td><p class="total">¥${totalPrice}.00</p></td>
												<td><p class="del">删除</p></td>
											</tr>`;
									table.append(trx);
								}
							}
							
						}
						
						//点击全选,所有单选被选中，总价累加
						//单选
						var check = $(".check");
						//console.log(check.length);
						//控制全选
						var clickTime=0;
						var sum=0;
						//全选
						$("#selectAll").click(function(){
							clickTime++;
							if(clickTime%2==0){
								//var checkArr=$("#check");
								$("#selectAll").removeAttr("checked");
								for(var j=0;j<check.length;j++){
									$(".check").eq(j).removeAttr("checked");
								}
								sum=0;
								$(".totalM").text("￥0.00");
								clickTime=0;	
							}else if(clickTime==1){
								$("#selectAll").attr("checked","checked");
								$(".check").attr("checked","checked");
								//每个商品总价
								var total = $(".total");
								//var nums = $(".pnum");
								for(var i=0;i<total.length;i++){
									//console.log(total[i].innerHTML);
									var temp=total[i].innerHTML;
									sum+=Number(getPrice(temp));
								}
								//console.log(sum);
								$(".totalM").text("￥"+sum+".00");
								
							}
						});
						//全选checked为true/false时，点击单选,计算结算总价+-
						//控制单选
						$(".check").click(function(){
							var index=$(this).parent().parent().index()-1;
							var total = $(".total").eq(index).text();
							sum=Number(getPrice($(".totalM").eq(0).text()));
							if(!$("#selectAll")[0].checked){
								//console.log($(this).prop('checked'));						
								if($(this).prop('checked')){
									sum+=Number(getPrice(total));
								}else{
									sum-=Number(getPrice(total));
								}
							}else{
								//console.log($(this).prop('checked'));	
								if($(this).prop('checked')){
									sum+=Number(getPrice(total));
								}else{
									sum-=Number(getPrice(total));
								}
							}
							$(".totalM").text("￥"+sum+".00");
							
						});
		
						//--
						$(".reduce").click(function(){
							var indexr = $(this).parent().parent().parent().index()-1;
							//console.log(indexr);
							//console.log($(this).parent().parent().parent());
							var value=parseInt($(".pnum").eq(indexr).text()); //数量
							//console.log(value);
							if($(".check")[indexr].checked){
								//单价
								var price = getPrice($(".price").eq(indexr).text());
								//原先的结算总价
								var preTotalM=getPrice($(".totalM").eq(0).text());
								//var y=preTotalM-price;
								//console.log(price,preTotalM);
								if(value==1){
									price=0;
								}
								var y=preTotalM-price;
								$(".totalM").eq(0).text("￥"+y+".00");
							}
							if(value==1){
								$(".pnum").eq(indexr).css("border-color","#f00");
								setTimeout(function(){
									$(".pnum").eq(indexr).css("border-color","#e1e1e1");
								},1000);
								$(".pnum").eq(indexr).text("1");
							}else{
								value--;
								$(".pnum").eq(indexr).text(value);
							}
							//当前的商品总价
							var x = getPrice($(".price").eq(indexr).text())*value;
							$(".total").eq(indexr).text("￥"+x+".00");
							//如果当前商品时选中状态，总的结算价减减
							
						});
						//+
						$(".add").click(function(){
							var index = $(this).parent().parent().parent().index()-1;
							//console.log(index);
							//console.log($(".p-num").eq(j).find(".pnum").text());
							var value=parseInt($(".pnum").eq(index).text());
							//console.log(value);
							value++;
							$(".pnum").eq(index).text(value);
							
							var x = getPrice($(".price").eq(index).text())*value;
							$(".total").eq(index).text("￥"+x+".00");
					
							if($(".check")[index].checked){
								//单价
								var price= getPrice($(".price").eq(index).text());
								//原先的结算总价
								var preTotalM=getPrice($(".totalM").eq(0).text());
								var y=preTotalM+price;
								//console.log(y);
								$(".totalM").eq(0).text("￥"+y+".00");
							}
								
						});	
		
						//点击删除操作
						$(".del").click(function(){
							//console.log($(this).parent().parent())
							//获取当前删除的这个下标
							var index = $(this).parent().parent().index()-1;
							//结算总价中减去删除的商品价格
							if($(".check")[index].checked){
								var p=Number(getPrice($(".total").eq(index).text()));
								var s=Number(getPrice($(".totalM").text()));
								$(".totalM").text("￥"+(s-p)+".00");
							}
							
							$(this).parent().parent().remove();
							/*console.log(index);
							console.log(obj2);
							console.log(narr[index]);*/
							//找到数组narr的该下标处的id/key,删除json对象中的这个键值
							delete obj2[keyarr[index]];
							keyarr.splice(index,0);
							//console.log(keyarr);
							//console.log(obj2);
							//var temp=obj2)
							//res.data[index].id
							var str=JSON.stringify(obj2);
							//setCookie("idNum",str);
							localStorage.setItem("idNum",str);
							if($(".del").size()==0){
								//console.log(44);
								$("table")[0].innerHTML="您还没有商品!";
								$("table").css({"height":50,"font-size":30,"color":"#000"});
							}
							
						});
						//点击删除所有勾选的
						 $(".confirm span").click(function(){
							var del=$("table input");
							for(var i=0;i<del.length;i++){
								//console.log(33);
								if(del[i].checked){
									//$(this).prop('checked');
									//console.log(del[i]);
									//console.log(i);
									//结算总价中减去删除的商品价格
									$(".totalM").text("￥0.00");
									delete obj2[keyarr[i-1]];
									keyarr.splice(i-1,0);
									//console.log(obj2,keyarr);
									var str=JSON.stringify(obj2);
									//setCookie("idNum",str);
									localStorage.setItem("idNum",str);
									$("table input").eq(i).parent().parent().remove();
								}
							}	
							
							if($("table tr").size()==0){
								//console.log(44);
								$("table")[0].innerHTML="您还没有商品!";
								$("table").css({"height":50,"font-size":30,"color":"#000"});
							}
						});	
						
						
						//结算，使结算价格为勾选的商品单价乘以数量之和
						$(".count").click(function(){
							var check = $(".check");
							var all=0;
							for(var i=0;i<check.length;i++){
								if(check[i].checked){
									var x=parseInt(keyarr[i])-1;
									var p=Number(getPrice(res.data[x].price));
									//console.log(res.data[x].price);					
									var n=Number($(".pnum").eq(i).text());
									all+=p*n;
									console.log(p,n,all);
								}
							}
							$(".totalM").text("￥"+all+".00");
							alert("您需要支付￥"+all+".00元");
						});
					}
				},
				error:function(){console.log("购物车请求错误！")}
			});
		})(jQuery)
	}
	
	function getPrice(str){
		return Number(str.slice(1));
	}
	
	return add;
})
