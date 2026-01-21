$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}
	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();
		$next.slideToggle();
		$this.parent().toggleClass('open');
		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	
	var accordion = new Accordion($('#accordion'), false);
});
var icon=document.getElementsByClassName('icon')
var dian=document.getElementsByClassName('dian')
var zsd=document.getElementsByClassName('spot')
var width=document.documentElement.clientWidth//获取浏览器初始宽度
var nw=''//获取新增浏览器宽度
var wnum=''//更新后的宽度
//图片检测

//window.addEventListener("resize", WidthTest);
//WidthTest();

//回到顶部
    $(function () {
        $(window).scroll(function(){   
            if ($(window).scrollTop()>100){ 
                $(".box").fadeIn(700); 
            }
            else                           
            {
                $(".box").fadeOut(700); 
            }
        });
        
        $(".box").click(function(){   
            $('body,html').animate({ 
                scrollTop:0 
            },700);
            return false; //防止冒泡
        }); 
    });
var vbox=document.getElementsByClassName('video')
var winwidth=document.body.clientWidth || document.documentElement.clientWidth;
function videoIn(num){
    for(var i=0;i<vbox.length;i++)
    {
        for(var x=0;x<vbox[i].children.length;x++)
        {
            vbox[i].children[x].style.width=winwidth-20-47+'px'
            vbox[i].children[x].style.height=winwidth-20-47+'px'
            vbox[i].style.height=winwidth-20-47+'px'
        }
    }
}
videoIn()
function video(obj){
    var url=obj.getAttribute('src') //getAttribute获取属性
    var f=document.createElement("IFRAME")//createElement创建元素，内联框架
    f.setAttribute('src',url+'&autoplay=true')//创建属性
    f.setAttribute('scrolling','no')
    f.setAttribute('allowFullScreen',"true")
    f.setAttribute('frameborder',"0")
    obj.appendChild(f)//将内容f放入容器obj中
    setTimeout(function(){
        obj.removeChild(obj.children[0])
    },500)
    videoIn()
}