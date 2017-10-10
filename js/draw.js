/**
 * 
 * @authors Wangsan_LoliSuri
 * @date    2017-04-14 18:47:12
 * @version $001$
 */
(function(){
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	let canvas = document.getElementById("paint");
	let ctx = canvas.getContext('2d');
	let circles = new Array();
	/**
	 *canvas.width和canvas.style.width是不一样的。前者是真正的视窗范围,
	 *必须要赋值，不然相当于在css的width基础上做拉伸
	 */
	let w = canvas.width =  canvas.offsetWidth;
	let h = canvas.height = canvas.offsetHeight;
	/**
	 * 绘图类
	 * 属性(5)：x,y,r,rangX,rangY
	 * 方法(3)：drawCircle(ctx),drawLine(ctx,element),move(w,h)
	 */
	class paintElement {
		constructor(x,y){
			this.x = x;	//x坐标
			this.y = y;	//y坐标
			this.r = Math.random()*12;//圆的半径
			this.rangX = (Math.random()*2-1)/4;	//圆的x方向移动范围
			this.rangY = (Math.random()*2-1)/4;	//圆的y方向移动范围
		}
		/**
		 * [drawCircle 在canvas上画圆]
		 * @param  {[object]} ctx [CanvasRenderingContext2D对象]
		 * @return 无
		 */
		drawCircle(ctx){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
			ctx.fillStyle = 'rgba(204, 204, 204, 0.2)';
			ctx.fill();
		}
		/**
		 * [drawLine 在canvas上画两圆之间的连线]
		 * @param  {[object]} ctx     [CanvasRenderingContext2D对象]
		 * @param  {[object]} element [paintElement类的一个对象]
		 * @return 无
		 */
		drawLine(ctx,element){
			let len = Math.sqrt(Math.pow((this.x-element.x),2)+Math.pow((this.y-element.y),2));
			if (len < w/6){//两圆的间距大于一定范围时候不画线
				ctx.beginPath();
				ctx.moveTo(this.x,this.y);
				ctx.lineTo(element.x,element.y);
				ctx.closePath();
				ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)';
				ctx.stroke();  
			}	      
		}
		/**
		 * [move   移动圆的位置，移动范围在canvas范围内]
		 * @param  {[Number]} w [canvas元素的width]
		 * @param  {[Number]} h [canvas元素的height]
		 * @return 无
		 */
		move(w,h){
			this.rangX = (this.x < w && this.x > 0) ? this.rangX: (-this.rangX);
			this.rangY = (this.y < h && this.y > 0) ? this.rangY: (-this.rangY);
			this.x += this.rangX;
			this.y += this.rangY;
		}
	}
	/**
	 * [draw 绘图+动画]
	 * @param  无
	 * @return 无
	 */
	function draw(){
		ctx.clearRect(0, 0, w, h); //清除canvas中的元素
		for (let i = 0; i < circles.length; i++) {
			circles[i].move(w, h);//移动
			circles[i].drawCircle(ctx);//画圆
			for (let j = i + 1; j < circles.length; j++) {
				circles[i].drawLine(ctx, circles[j])//连线
			}
		}  
		requestAnimationFrame(draw);//动画
	}
	/**
	 * [init 初始化canvas上绘制的圆的数量和其位置，并开始绘图]
	 * @param  {[Number(int)]} count [绘制的圆的数量]
	 * @return 无
	 */
	function init (count){
		for(let i = 0; i<count;i++){//初始化circles数组，一个元素存储一个圆的随机x,y坐标
			circles.push(new paintElement(Math.random() * w, Math.random() * h));
		}	   
		draw();//开始绘图
	}
	init(80);
})()