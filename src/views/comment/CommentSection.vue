<template>
	<div id="search">
		
	<!-- 空页面 
	<div v-if="allOrder.length == 0">
		<van-empty description="暂无评论" />
	</div>
	<div v-else></div v-else>
	-->	



		<van-divider
 			 :style="{ color: '#323233', borderColor: '#ee0a24', padding: '0 16px' }">
  			电影评论区
		</van-divider>
		
		<my-title color="blue" title="评论列表"/>
		
		<!-- 评论块1-->
		<div id="div1">
			<div id="left">
				<!-- 头像图标-->
				<van-icon name="smile-o" size="50" />
			</div>
			
			<div id="right">八一   
				<!-- 评分 -->
				<div id="score">
					<van-rate v-model="value"   readonly/>
				</div>
			</div>
			
			<div id="down">
				一部震撼人心的电影。
			</div>
			<van-divider />
		</div>
		
		<!-- 评论块2 -->
		<div id="div1">
			<div id="left">
				<van-icon name="smile-o" size="50" />
			</div>
			<div id="right">九四          
				<!-- 评分 -->
				<div id="score">
					<van-rate v-model="value"   readonly/>
				</div>
			</div>
			<div id="down">
				这是我今年看过最好看的一部电影
			</div>
			<van-divider />
		</div>
		
		
		
	</div>
</template>

<script>
	


	export default {
		name: "CommentSection",
		
		data() {
    			return {
      				value: 5,
    			};
  		},
		
		methods: {
		    	
		      	toCinema() {
		      		//返回电影详情页面
				this.$router.push("/cinema");
			},  			
   			toComment() {
   				//进入写入评论界面
				this.$router.push("/search/comment");

			},
  		},
  	
					
				
			
	}
</script>

<style scoped>
	#div1{ 		
		background-color:null;	
		overflow:hidden;/*清除浮动塌陷*/		
	      }
	
	#left {	
		margin-top:13px;
		margin-left:10px;
		width:50px;/*将较窄的盒子设定固定宽度*/	
		float:left;/*设置盒子向左浮动*/	
		height:50px;
		background-color:null;	
		}
	
	#right {/*较宽的列不设置宽度，让其自适应宽度*/	
		margin-top:13px;
		margin-left:75px;/*设置盒子左外边距110px=左侧盒子的宽度+适当的边距*/
		margin-right:10px;
		height:40px;	
		background-color:null;
	}	
	
	#down {/*较宽的列不设置宽度，让其自适应宽度*/	
		margin-left:70px;/*设置盒子左外边距110px=左侧盒子的宽度+适当的边距*/
		margin-right:10px;
		margin-top:-5px;
		margin-bottom:10px;
		height:100px;	
		background-color:white;
	}
	#score{ 		
		float:right;	
	      }	
</style>