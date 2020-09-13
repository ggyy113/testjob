<template>

	<h3 align="center">
		 <font :color="color">{{title}}</font>
	</h3>
			
</template>

<script>
	
export default {
	
  name: 'MyTitle',    //组件的名称
  
  props: {             //组件的属性
    title: String,
	color: String
  }
}
</script>

