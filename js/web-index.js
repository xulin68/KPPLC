//var isrc=["image/200CPU/CPU224XP_001.jpg","image/200CPU/CPU224XP-ETH_001.jpg","image/200CPU/CPU226_001.jpg","image/200CPU/CPU226_003.jpg","image/200CPU/CPU228_001.jpg","image/EM2XX/EM221_001.jpg","image/EM2XX/EM222_001.jpg","image/EM2XX/EM223_001.jpg","image/EM2XX/EM231_001.jpg","image/EM2XX/EM232_001.jpg","image/EM2XX/EM235_001.jpg","image/EM2XX/EM231-RTD_001.jpg","image/EM2XX/EM231-TC_001.jpg","image/MPU222XP/MPU222XP_001.jpg","image/GPU222XP/GPU222XP_001.jpg","image/GPU223XP/GPU223XP_001.jpg","image/GPU224XP/GPU224XP_001.jpg","image/GPU224XP-ETH/GPU224XP-ETH_001.jpg","image/GPU226/GPU226_001.jpg","image/GPU226/GPU226-ETH_001.jpg","image/GPU228/GPU226XP_001.jpg","image/GM2XX/GM223-I8RQ8_001.jpg","image/GM2XX/GM223-I16RQ16_001.jpg","image/GM2XX/GM231_001.jpg","image/GM2XX/GM235-AI4AQ2_001.jpg","image/GM2XX/GM235-AI8AQ4_001.jpg","image/GM2XX/GM231-N8_001.jpg","image/GM2XX/GM235-N8AQ4_001.jpg","image/USB-PPI/PPI-CH340_001.jpg","image/USB-PPI/PPI-FT232_001.jpg","image/USB-PPI/PPI-MianQu_001.jpg","image/USB-PPI/PPI-GeLi_001.jpg","image/Sensor/T100_001.jpg","image/GS700/0012.jpg"]

//var t1=["200标准型PLC CPU224XP","200标准型PLC CPU224XP-ETH","200标准型PLC CPU226","200标准型PLC CPU226-ETH","200标准型PLC CPU228","数字量输入模块","数字量输出模块","数字量组合模块","模拟量输入模块","模拟量输出模块","模拟量混合模块","温度测量（热电阻）模块","温度测量（热电偶）模块","迷你型PLC MPU222XP","经济型PLC GPU222XP","经济型PLC GPU223XP","经济型PLC GPU224XP","经济型PLC GPU224XP-ETH","经济型PLC GPU226","经济型PLC GPU226-ETH","PLC系列 GB GPU228","经济型GM223-I8RQ8","经济型GM223-I16RQ16","经济型GM231-AI8","经济型GM235-AI4AQ2","经济型GM235-AI8AQ4","经济型GM231-N8","经济型GM235-N8AQ4","经济型-编程电缆","稳定型-编程电缆","免驱型-编程电缆","免驱、隔离型-编程电缆","智能温度变送器 GB-T100","供水一体机 GB GS700",]

//var t3=["498.00","898.00","798.00","998.00","998.00","328.00","418.00","488.00","448.00","398.00","548.00","698.00","698.00","178.00","248.00","348.00","358.00","728.00","678.00","998.00","498.00","368.00","468.00","428.00","398.00","498.00","588.00","788.00","68.00","98.00","198.00","398.00","99.00","1299.00",]

//var t4=["MPU222XP","GPU222XP","GPU223XP","GPU224XP","GPU224XP-ETH","GPU226","GPU226-ETH","GPU228","GM223-I8RQ8","GM223-I16RQ16","GM231-AI8","GM235-AI4AQ2","GM235-AI8AQ4","GM231-N8","GM235-N8AQ4","经济款","稳定款","免驱动款","免驱隔离","智能温度变送器",]

//var title=["主机CPU","数字量扩展","模拟量扩展","温度扩展","主机CPU","数字量扩展","模拟量扩展","温度测量模块","编程线缆","温度变送器",]
var url=["web-CPU224.html","web-CPU224XP-ETH.html","web-CPU226.html","web-CPU226.html","web-CPU228.html","web-EM221.html","web-EM222.html","web-EM223.html","web-EM231.html","web-EM232.html","web-EM235.html","web-EM231-RTD.html","web-EM231-TC.html","web-MPU222XP.html","web-GPU222XP.html","web-GPU223XP.html","web-GPU224XP.html","web-GPU224XP-ETH.html","web-GPU226.html","web-GPU226.html","web-GPU228.html","web-GM223.html","web-GM223.html","web-GM231.html","web-GM235.html","web-GM235.html","web-GM231-N8.html","web-GM235-N8AQ4.html","web-PPI-CH340.html","web-PPI-FT232.html","web-PPI-MianQu.html","web-PPI-GeLi.html","web-T100.html","web-GS700.html",]
var owi=document.getElementsByClassName('json')//获取img
var otop=document.getElementsByClassName('top')//获取头部导航栏
var oup=document.getElementsByClassName('up')//获取导航小标
var owt1=document.getElementsByClassName('w-text')//获取大标题
var owt2=document.getElementsByClassName('w-text2')//获取副标题
var owt3=document.getElementsByClassName('w-money')//获取金额
var obar=document.getElementsByClassName('nav-bar')//获取二级菜单
var obimg=document.getElementsByClassName('bar-img')//获取二级菜单图片
var tbar=document.getElementsByClassName('bar-text')//获取二级菜单文字
var nt=document.getElementsByClassName('nav-text')
var gs=document.getElementsByClassName('goods')
function link(data){window.location.href=data}
window.onload=function () { 
var sourceNode=document.getElementById("0"); // 获得被克隆的节点对象
var navbar=document.getElementsByClassName('nav-bar')[0]
for (var i=0;i<isrc.length;i++) 
{ 
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点 
    clonedNode.setAttribute("id",i+1); // 修改一下id 值，避免id 重复
    sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
    owi[i].src=isrc[i]
    owt1[i].innerHTML=t1[i]
    owt2[i].innerHTML=t2[i]
    owt3[i].innerHTML=t3[i]
}
    for(var a=0;a<gs.length;a++)
    {
    	gs[a].style.display='block'
    	gs[34].style.display='none'
    }
}
function mouse(a,b,c,d)
{
	if(a==1)
	{
		window.location.href=url[d];
	}
}
//菜单控制
function showDiv(x,pos)
{
	$(".hiddenDiv").each(function() {
		//alert($(this).attr("id"));
		$(this).css('display','none');
	});
	
	document.getElementById(x+"div").style.display="block";
	
}

function HideDiv(x,z)
{
	document.getElementById(x+"div").style.display="none";
	oup[z].style.display='none'
}
function showMenuPicA(x)
{
	document.getElementById("Menu-A-pic").style.backgroundImage="url(image/"+x+".jpg)";
}

function showMenuPicB(x)
{
	document.getElementById("Menu-B-pic").style.backgroundImage="url(image/"+x+".jpg)";
}

function showMenuPicC(x)
{
	document.getElementById("Menu-C-pic").style.backgroundImage="url(image/"+x+".jpg)";
}

function showMenuPicD(x)
{
	document.getElementById("Menu-D-pic").style.backgroundImage="url(image/"+x+".jpg)";
}

function showMenuPicE(x)
{
	document.getElementById("Menu-E-pic").style.backgroundImage="url(image/"+x+".jpg)";
}

function upshow(voer,out,number){
	if (voer==1) 
	{
		oup[number].style.display='block'
		if(number==0)
		{
		oup[1].style.display=''
		}
		if(number==1)
		{
		oup[0].style.display=''
		oup[2].style.display=''
		}
		if(number==2)
		{
		oup[1].style.display=''	
		oup[3].style.display=''
		}
		if(number==3)
		{
		oup[2].style.display=''
		oup[1].style.display=''
		oup[4].style.display=''
		}
		if(number==4)
		{
		oup[0].style.display=''
		oup[1].style.display=''
		oup[2].style.display=''
		oup[3].style.display=''
		}
		if(number==5)
		{
		oup[0].style.display=''
		oup[1].style.display=''
		oup[2].style.display=''
		oup[3].style.display=''
		oup[4].style.display=''
		}
	}

}