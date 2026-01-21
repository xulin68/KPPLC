var opa=10
var icon=document.getElementsByClassName('icon')
var dian=document.getElementsByClassName('dian')
var zsd=document.getElementsByClassName('spot')
var onum=document.getElementsByClassName('numcode')
var width=document.documentElement.clientWidth//获取浏览器初始宽度
var nw=''//获取新增浏览器宽度
var wnum=''//计算新增宽度
	var Num='' //下一张正在显示的图片length
	var inum=''//当前正在显示的图片length
var len=icon.length//图片length
//图片检测
function WidthTest(){
    nw=document.documentElement.clientWidth-width
for (var o=0;o<icon.length;o++)
    {
        var iwidth=icon[o].naturalWidth;//获取图片宽度
        var iheight=icon[o].naturalHeight;//获取图片高度  
        var rnum=iwidth-width-nw+18//获取多余浏览器宽度
        //alert(rnum+'next'+iwidth)
        if(iwidth-iheight==0)//判断是不是正方形；正方形=100%width；长方形进入下个循环
        {
            icon[o].style.width='100%'
            icon[o].style.right="0px"
        }
        if(iwidth>600 && iwidth-iheight!=0)//判断长是否大于600，>600修改position居中
        {
            icon[o].style.right=rnum/2+'px'//修改position-left属性=新增的浏览器宽度/2
        }
    }
}
window.addEventListener("resize", WidthTest);
WidthTest();
//指示数字
var s_num=''
setTimeout(function addDiv() { //延时
for (var x=0;x<icon.length;x++)
{
    onum[2].innerHTML=x+1
    onum[0].innerHTML='1'
}
},1)
//展示图轮播控制
setInterval("ImgShow()",5000)

function ImgShow(io){
if(icon.length>1)
{    
	for(var i=0;i<icon.length;i++)
        {
            if (icon[i].style.display=='block')
            {inum=i}
        }
    if(io==0)
    {
        Num=inum-1
        if(Num<0)
        {Num=icon.length-1}
    }
    else
    {
        Num=inum+1
        if (Num==icon.length) 
        {Num=0}
    }
//不透明度设置
var timer=setInterval(function (){
    if(icon[inum].style.opacity>=0)
    {
        opa--
        icon[inum].style.opacity=opa/10
    }
    else
    {
        icon[inum].style.display='none'
        opa++
        onum[0].innerHTML=Num+1
        icon[Num].style.display='block'
        icon[Num].style.opacity=opa/10

        if(icon[Num].style.opacity>=1)
        {
          clearInterval(timer)
        }
        if(opa>10)
        {
            opa=10
        }
    }
//指示点设置

},20)
}
}
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
var none=document.getElementsByClassName('none')
var otitle=document.getElementsByClassName('title')
var otl=otitle.length-1
var width=80*otl

//跳转函数
    var onav=document.getElementsByClassName('title')
    var oxq=document.getElementsByClassName('xiangqing')
    var oload=document.getElementsByClassName('download')
    var ojs=document.getElementsByClassName('jisuan')
    var otr=document.getElementsByClassName('tr')//外框参数
//标题栏跳转
    var vbox=document.getElementsByClassName('video')
    var ol=otr[0].offsetLeft//offsetLeft返回当前元素距离父辈元素左边缘的距离
    function Navshow(num,next,len){ //num传入0，135，270，next传入1，2，3
    var lrn=''
    if(ol<num)
    {
        lrn=5//向右跳转距离,需要被270和135整除
    }
    else
    {
        lrn=-5//向左跳转距离
    }
    var timer=setInterval(function(){  //setInterval是JS内置函数,用于在指定时间间隔内重复执行一段代码
        otr[0].style.left=otr[0].offsetLeft+lrn+'px'
        //document.title='lrn='+lrn+'num='+num
        if(otr[0].offsetLeft==num)//框到了指定位置后下方显示相关内容
        {
            if(next==1)
            {
                oxq[0].style.display='block'
                oload[0].style.display='none'
                //ojs[0].style.display='none'
                vboxIn(1) //视频块
            }
            else
            {
                oxq[0].style.display='none'
                oload[0].style.display='block'
                //ojs[0].style.display='none'
            }
//          else
//          {
//          	oxq[0].style.display='none'
//              oload[0].style.display='none'
//              ojs[0].style.display='block'
//          }
            clearInterval(timer)
        }
    },10)//10是外框移动速度
    if(len==0)
    {
        vboxIn(1)
    }
    else
    {
        for(var x=0;x<vbox.length;x++)
        {
            vbox[x].innerHTML=''
        }
    }
	}
var winwidth=document.body.clientWidth || document.documentElement.clientWidth;
    function vboxIn(num){
        if(num)
    {
        for(var x=0;x<vbox.length;x++)
        {
            var url=vbox[x].getAttribute('src').split('/-/')
            var img=document.createElement("IMG")
            img.setAttribute('src',url[1])
            img.style.position='absolute'
            img.style.margin=0
            vbox[x].appendChild(img)
        }
    }
        for(var i=0;i<vbox.length;i++)
        {
            for(var x=0;x<vbox[i].children.length;x++)
            {
                vbox[i].children[x].style.width=winwidth-20-50+'px'
                vbox[i].children[x].style.height=winwidth-20+'px'
                vbox[i].style.width=winwidth-20-50+'px'
                vbox[i].style.height=winwidth-20+'px'
            }
        }
        
    }
    vboxIn(1)
function video(obj){
    var url=obj.getAttribute('src').split('/-/')
    var f=document.createElement("IFRAME")
    f.setAttribute('src',url[0]+'&autoplay=true')
    f.setAttribute('scrolling','no')
    f.setAttribute('allowFullScreen',"true")
    f.setAttribute('frameborder',"0")
    obj.appendChild(f)
    setTimeout(function(){
        obj.removeChild(obj.children[0])
    },10)
    vboxIn()
}