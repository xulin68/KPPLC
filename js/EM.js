var currentModelList = [''] //当前型号列表
	function depCoy(obj){
		var objClone = Array.isArray(obj)?[]:{}; //判断obj是否为数组，若为数组，则objclone为[]，若不为数组，则objclone为{}
		if(obj && typeof obj==="object"){ //若obj为真且类型为object（typeof数组为object）
			for(var key in obj){ //key为数组obj下标
				if(obj.hasOwnProperty(key)){ //X.hasOwnProperty(Y)方法，检测一个对象(X)是否含有指定名称的属性(Y)
					if(obj[key]&&typeof obj[key] ==="object") //若obj数组中第key个元素为数组
					{
						objClone[key] = depCoy(obj[key]);
					}
					else
					{
						objClone[key] = obj[key]; 
					}
				}
			}
		}
		return objClone;
	}//
	
	function css_analysis(css){ //window.onload传入css为view_css页面样式
		var hd=document.getElementsByTagName('head')[0] //head为html文件里的head.document方法，getElementsByTagName为返回带有指定标签名称的对象集合
		var st=document.createElement('style') //创建style标签.document.createElement是在对象中创建一个对象
		st.setAttribute('type','text/css') //添加属性type和值text/css.setAttribute(X,Y)方法，用于在请求范围内设置属性,X为属性名，Y为属性值
		var data=''
		for (var key in css) {
			var str=key+'{'
			for(var nkey in view_css[key])//view_css是页面样式
			{
				var strr
				strr=nkey+':'+view_css[key][nkey]+';'
				str=str+strr
			}
			str=str+'}\n'
			data=data+str+'\n'
	   }
	   st.innerHTML=data //改变st节点style内容为data
	   hd.appendChild(st) //appendChild方法在节点的子节点列表末添加新的子节点
    }
   function children_inset(par,ch){ //子类集合
	if(ch.length) //若ch存在
	{ 
		for(var i=0;i<ch.length;i++) //i从0到ch.length
		{
			par.appendChild(ch[i]) //appendChild方法在节点的子节点列表末添加新的子节点
		}
		return 'success' //都添加完成后，返回success
	}
	par.appendChild(ch)
	}
   function jsn_init(arr){ //jsn初始化
		var arr=arr
		var par=['NotRoot']
		if(!arr.length) //如果arr数组不存在
		{
			alert('ERROR:Z_Core初始化失败！请传入数组对象')  //alert弹窗
			return false
		}
		for(var i=0; i < arr.length; i++){
			arr[i].dom = document.createElement(arr[i].tagname); //document.createElement是在对象中创建一个对象
			if(arr[i].pid=='/'||arr[i].pid=='#/')
			{
				par[0]=arr[i]
				par.push(i) //push是在尾部增加，即将i追加到par尾部
			}
			if(arr[i].attr)
			{
				for(var key in arr[i].attr)
				{
					arr[i].dom.setAttribute(key,arr[i].attr[key])   //setAttribute(X,Y)方法，用于在请求范围内设置属性,X为属性名，Y为属性值
				}
			}
			if(arr[i].innerHTML)
			{
				arr[i].dom.innerHTML=arr[i].innerHTML  //innerHTML属性，用于设置或获取位于对象起始和结束标签内的HTML（包括标签和内容文字）
			}
			if(arr[i].children)
			{
				children_inset(arr[i].dom,arr[i].children) //children_inset函数
			}
		}
		arr.splice(par[1],1)
		arr.unshift(par[0])
		return arr
	}
   function html_anlysis(jsn,par){
		var res=jsn_init(jsn)  //jsn传入jsn_init函数，返回到res
		var current_obj=[]
		current_obj.push(res[0])  //push是在尾部增加，即将res[0]追加到current_obj尾部
		while(current_obj.length > 0){
			var node = current_obj.pop()  //pop为从数组末尾删除并返回最后一个元素
			for(var i=0;i<res.length;i++)
			{
				if(res[i].pid === node.nid){
					node.dom.appendChild(res[i].dom);
					current_obj.push(res[i])
				}
			}
		}
		var node_list=[]
		if(res[0].pid=='#/')
		{
			for(var i=0;i<res[0].dom.children.length;i++)
			{
				node_list.push(res[0].dom.children[i])
			}
			if(par)
			{
				for(var x=0;x<node_list.length;x++)
				{
					par.appendChild(node_list[x])
				}
				return 'success'
			}
			return node_list
		}
		if(par)
		{
			par.appendChild(res[0].dom)
			return 'success'
		}
		return res[0].dom
	}
	function query_modular_list(name){ //查询模块列表
		for (var i = 0; i < all_modular_list.length; i++) { //all_modular_list为模块数据表
			if (all_modular_list[i].name == name) { //查找模块型号
				var arr=all_modular_list[i] //传输该模块所有数据
				return arr
			}
		}
		return false
	}
	function WriteData(num,name,iv,ov,index){
		var copy_dom=depCoy(control_dom) //depCoy函数，传入control_dom数组，模块7及以后的
		var iv=iv||'-'  //||操作符，若||前表达式为真，则运行，反之运行||后表达式
		var ov=ov||'-' //即ov为真，则ov=ov，否则ov=‘—’
		var name=name||''
		var select=name.substr(0,7)||'-'
		if(select=='EM DE32'||select=='EM QR32'||select=='EM QT32'||select=='EM AE16'||select=='EM AE32'||select=='EM AQ08'||select=='EM AM12'||select=='EM AM16'||select=='EM EN88'||select=='EM EN4C'||select=='EM AN16'||select=='EM AW04')
		{
			select='EM DP01'
		}
		if(select=='EM AR08'||select=='EM AT08'||select=='EM AN08')
		{
			select='EM AE08'
		}
		if(select=='EM AN04')
		{
			select='EM AE04'
		}
		var inum=parseInt(num)-1 //parseInt函数为解析一个字符串，并返回一个整数。即将字符串num转换为整数，赋值给inum
		copy_dom[3].innerHTML=select
		copy_dom[4].innerHTML=iv //设置copy_dom[3]节点内容为iv
		copy_dom[5].innerHTML=ov
		copy_dom[6].attr.value=name
		copy_dom[6].attr.id='sel_'+inum
		for(var x=-1;x<all_modular_list.length;x++)
		{
			var opt=document.createElement('option') //生成元素节点option，并返回到opt
			if(x==-1)
			{
				//opt=<option value：''></option>
				opt.setAttribute('value','') //setAttribute(X,Y)方法，用于在请求范围内设置属性,X为属性名，Y为属性值
				opt.innerHTML='请选择模块型号' //选择框展示文字
				copy_dom[6].children.push(opt) //children初始为空数组
				if(index)
				{
					copy_dom[1].innerHTML='EM'+(index-1)
				}
				else
				{
					copy_dom[1].innerHTML='EM'+(num-1)
				}
				continue
			}
			if(all_modular_list[x].name==name)
			{
				opt.selected=true
			}
			opt.setAttribute('value',all_modular_list[x].name)//setAttribute(X,Y)方法，用于在请求范围内设置属性,X为属性名，Y为属性值
			opt.innerHTML=all_modular_list[x].name //输入框显示模块型号
			copy_dom[6].children.push(opt)
		}
		return copy_dom
	}
	function SetData(type,jsn_1,jsn_2){ //type为类型SR/ST，CR/CRs，GB三种；
		var Mark={
			'DD':{
				sin: ['V' ,''],
				sout:['V' ,''],
				min: ['VW',''],
				mout:['VW','']
			},
			'BZ':{
				sin: ['I' ,''],
				sout:['Q' ,''],
				min: ['IW',''],
				mout:['QW','']
			},
//			'GB':{
//				sin: ['I' ,''],
//				sout:['Q' ,''],
//				min: ['IW',''],
//				mout:['QW','']
//			}
	} 
		var obj={
			'name':jsn_1['name'],
			'input':'',
			'output':''
		}
		if(Number(jsn_1['s_input'])<700||Number(jsn_1['m_input'])<700)
		{
			if(jsn_1['s_input']) //如果jsn_1模块型号数组数据中有s_input（数字量输入）数据，则执行	
			{
				if((jsn_2.s_input)>0) //数字量输入
				{
					obj['input']=Mark[type].sin[0]+jsn_1['s_input']+Mark[type].sin[1]
				}
				if((jsn_2.s_output)>0)//数字量输出
				{
					obj['output']=Mark[type].sout[0]+jsn_1['s_output']+Mark[type].sout[1]
				}
			}
			else  //如果jsn_1模块型号数组数据中没有s_input（数字量输入）数据，即有模拟量数据，则执行
			{
				if((jsn_2.m_input)>0)//模拟量输入
				{
					obj['input']='AIW'+jsn_1['m_input']+Mark[type].min[1]
				}
				if((jsn_2.m_output)>0) //模拟量输出
				{
					obj['output']='AQW'+jsn_1['m_output']+Mark[type].mout[1]
				}
			}	
		}
		else
		{
			if(jsn_1['s_input']) //如果jsn_1模块型号数组数据中有s_input（数字量输入）数据，则执行	
			{
				if((jsn_2.s_input)>0) //数字量输入
				{
					obj['input']=Mark[type].sin[0]+jsn_1['s_input']+Mark[type].sin[1]
				}
				if((jsn_2.s_output)>0)//数字量输出
				{
					obj['output']=Mark[type].sout[0]+jsn_1['s_output']+Mark[type].sout[1]
				}
			}
			else  //如果jsn_1模块型号数组数据中没有s_input（数字量输入）数据，即有模拟量数据，则执行
			{
				if((jsn_2.m_input)>0)//模拟量输入
				{
					obj['input']=Mark[type].min[0]+jsn_1['m_input']+Mark[type].min[1]
				}
				if((jsn_2.m_output)>0) //模拟量输出
				{
					obj['output']=Mark[type].mout[0]+jsn_1['m_output']+Mark[type].mout[1]
				}
			}
		}
		
		return obj  //整理数字量模拟量资源数据后，返回模块对象obj
	}
	function Count(val){ //val是传入的类型，SR/ST，CR/CRs，GB三种。count函数计算6个模块之后的地址
		var bitList=[[5600,5600,800,800],[7000,7064,7000,7064],[64,64,128,128]] //bitList[0]是SR/T系列，bitList[1]是CR系列，4个值分别为I,Q,AI,AQ
		var control_list=[]
		var bitList1=bitList[0]
		var bitList2=bitList[1]
		var bitList3=bitList[2]
		//val=='SR/ST'?bitList=bitList[0]:bitList=bitList[1]	//若val为SR/ST,则	bitList=bitList[0]，否则bitList=bitList[1]		
		for(var i=0;i<currentModelList.length;i++)	//currentModelList为当前型号列表，初始为空			
		{
			//currentModelList[i].flag=='0'?bitListA=bitList[0]:bitListB=bitList[1]//若val为SR/ST,则	bitList=bitList[0]，否则bitList=bitList[1]
			//alert(i)
			if(i<=5)
			{
				if(currentModelList[i]=='')
				{
					var page=WriteData(i+1)								
					control_list[i]=page								
					break;
				}
				var item=depCoy(currentModelList[i])//depCoy函数返回currentModelList[i]的各数据，返回[object，object]
				//alert(currentModelList[i].flag)
				if (Number(currentModelList[i].flag)==0)//flag=1为大点数模块，nmmber函数将字符串转为数字
				{
					if(item.s_input==0||item.s_input>0)	//数字量输入等于或大于0，
					{
						bitList3[0] = 8+(i*4)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						bitList3[1] = 8+(i*4)//currentModelList[i].s_output//bitList[1]为数字量输出数量总数
						//bitList3[2] = 64+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList3[3] = 64+(i*128)
						var in_sum2=parseInt(bitList3[0]) //数字量输入总数，转换字符串bitList[0]为整数，再除8
						var out_sum2=parseInt(bitList3[1])//数字量输出总数
						item.s_input=in_sum2.toFixed(1) //toFixed方法是将数字转换为字符串，并指定小数点后保留几位
						item.s_output=out_sum2.toFixed(1)
					}
					else //模拟量运算
					{
						//bitList2[0] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList2[1] = 7064+(i*128)
						bitList3[2] = 16+(i*16)//parseInt(currentModelList[i].m_input)*2
						bitList3[3] = 16+(i*16)//parseInt(currentModelList[i].m_output)*2
						item.m_input=bitList3[2]
						item.m_output=bitList3[3]
					}
					val='BZ'
				}
				else
				{
					if(item.s_input==0||item.s_input>0)	//数字量输入等于或大于0，
					{
						bitList2[0] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						bitList2[1] = 7064+(i*128)//currentModelList[i].s_output//bitList[1]为数字量输出数量总数
						//bitList2[2] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList2[3] = 7064+(i*128)
						var in_sum2=parseInt(bitList2[0]) //数字量输入总数，转换字符串bitList[0]为整数，再除8
						var out_sum2=parseInt(bitList2[1])//数字量输出总数
						item.s_input=in_sum2.toFixed(1) //toFixed方法是将数字转换为字符串，并指定小数点后保留几位
						item.s_output=out_sum2.toFixed(1)
					}
					else //模拟量运算
					{
						//bitList2[0] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList2[1] = 7064+(i*128)
						bitList2[2] = 7000+(i*128)//parseInt(currentModelList[i].m_input)*2
						bitList2[3] = 7064+(i*128)//parseInt(currentModelList[i].m_output)*2
						item.m_input=bitList2[2]
						item.m_output=bitList2[3]
					}
					val='DD'
				}
			}
			else
			{
				if(currentModelList[i]=='')
				{
					var page=WriteData(i+1)								
					control_list[i]=page								
					break;
				}
				var item=depCoy(currentModelList[i])//depCoy函数返回currentModelList[i]的各数据，返回[object，object]
				//alert(currentModelList[i].flag)
				if (Number(currentModelList[i].flag)==0)//flag=1为大点数模块，nmmber函数将字符串转为数字
				{
					if(item.s_input==0||item.s_input>0)	//数字量输入等于或大于0，
					{
					var in_sum=parseInt(bitList1[0])/8 //数字量输入总数，转换字符串bitList[0]为整数，再除8
					var out_sum=parseInt(bitList1[1])/8//数字量输出总数
					item.s_input=in_sum.toFixed(1) //toFixed方法是将数字转换为字符串，并指定小数点后保留几位
					item.s_output=out_sum.toFixed(1)
					bitList1[0] += currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
					bitList1[1] += currentModelList[i].s_output//bitList[1]为数字量输出数量总数
					}
					else //模拟量运算
					{
					item.m_input=bitList1[2]
					item.m_output=bitList1[3]
					bitList1[2] += parseInt(currentModelList[i].m_input)*2
					bitList1[3] += parseInt(currentModelList[i].m_output)*2
					}
					val='BZ'
				}
				else
				{
					if(item.s_input==0||item.s_input>0)	//数字量输入等于或大于0，
					{
						bitList2[0] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						bitList2[1] = 7064+(i*128)//currentModelList[i].s_output//bitList[1]为数字量输出数量总数
						//bitList2[2] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList2[3] = 7064+(i*128)
						var in_sum2=parseInt(bitList2[0]) //数字量输入总数，转换字符串bitList[0]为整数，再除8
						var out_sum2=parseInt(bitList2[1])//数字量输出总数
						item.s_input=in_sum2.toFixed(1) //toFixed方法是将数字转换为字符串，并指定小数点后保留几位
						item.s_output=out_sum2.toFixed(1)
					}
					else //模拟量运算
					{
						//bitList2[0] = 7000+(i*128)//currentModelList[i].s_input //currentModelList[i].s_input为当前模块的数字量输入数量
						//bitList2[1] = 7064+(i*128)
						bitList2[2] = 7000+(i*128)//parseInt(currentModelList[i].m_input)*2
						bitList2[3] = 7064+(i*128)//parseInt(currentModelList[i].m_output)*2
						item.m_input=bitList2[2]
						item.m_output=bitList2[3]
					}
					val='DD'
				}
			}
			
			var PageData=SetData(val,item,currentModelList[i])
			var page=WriteData(i+1,PageData.name,PageData.input,PageData.output)
			control_list.push(page)
		}
		return control_list
	}
	function DeleteControl(v){
		var item=depCoy(currentModelList)	
		var len=currentModelList.length
		currentModelList.splice(v,len) //splice(X,Y,Z)方法，X为起始位置，Y为要删除的元素个数，Z为要添加的元素（可选）
		currentModelList.push('')
		return 'ok'
	}
	function init(){ //window.onload调用了
		html_anlysis(container_dom,document.getElementById('app')) //container_dom表格数组
		html_anlysis(WriteData(1,'','','',1),document.getElementById('mtb'))
	}
window.onload=function(){ //window.onload方法用于在网页加载完毕后立即执行的操作
	css_analysis(view_css) //函数从上到下依次执行
	init()
	html_anlysis(html,document.getElementById('app')) //传入特殊寄存器地址表结构html数组
	html_anlysis(register_SRST1,document.getElementById('tips_list')) //传入SRST特殊寄存器地址表register_SRST数组
}
function operation(id,val){  //操作函数
	var tb=document.getElementById('mtb')
	var cpu_name=document.getElementById('cpu_sel').value //SR/ST，CR/CRs，GB三种
	var tips=document.getElementById('tips_list')
	var tb_children_len=tb.children.length
	var otr=document.getElementsByClassName('tb_tr')
	var add=[12,12]		//可添加最大模块数量,请添加相同数值
	if (cpu_name=='SR/ST')
	{
		add=[6,6]
	}
//	if(cpu_name=='GB')
//	{
//		if(add[0]-6<0)
//		{
//			alert('请不要将模块数量限制到6以下!')
//		}
//		else
//		{
//			add[0]=add[1]-6
//		}
//	}
	if(!val) //!为取反,若val为0,空,false等,则!取反,!val为true,则运行代码内容	
	{
		tb.innerHTML=''
		if(DeleteControl(id)=='ok')
		{
			var data=Count(cpu_name)
			for(var key in data)
			{
				html_anlysis(data[key],tb)
			}
		}
		else
		{
			alert('删除错误')
		}
	}
	if(val)	//若val为真
	{
		var this_modular=query_modular_list(val) //query_modular_list函数，返回值为val模块型号数据
		if(val=='GB'||val=='SR/ST')//if(val=='CR/CRs'||val=='SR/ST'||val=='GB')
		{
			currentModelList=[]
			add[0]=add[1]
			//document.getElementById('sub_tr').style.display="none"
			tips.innerHTML=''	 
			//html_anlysis(register_SRST,tips)  //特殊寄存器地址表展示
			if(val=='SR/ST')	//选择机头				
			{
				html_anlysis(register_SRST1,tips)  //特殊寄存器地址表展示
			}
			else
			{
				html_anlysis(register_SRST,tips) 
			}
			if(currentModelList[currentModelList.length-1]!='') //currentModelList为当前型号数组
			{
				currentModelList.push('') 
			}
		}
//		if(val=='GB')
//		{
//			add[0]=add[1]-6
//			document.getElementById('sub_tr').style.display=''
//			if(tb_children_len-1>=add[0])
//			{
//				var item_list=[]
//				for(i=0;i<10;i++)
//				{
//					item_list.push(currentModelList[i])
//				}
//				currentModelList=item_list
//			}
//		}
		if(val!='GB'&&val!='SR/ST')//if(val!='GB'&&val!='SR/ST')
		{
			currentModelList[id]=this_modular
			if((id==tb_children_len-1)&&(tb_children_len<add[0]))
			{
				currentModelList.push('')
			}
		}
		var name
//		if(cpu_name=='GB')
//		{
//			name='SR/ST'
//		}
	    if(cpu_name=='SR/ST')
		{
			name='SR/ST'
		}
		else if(cpu_name=='GB')
		{
			name='GB'
		}
		else
		{
			return false
		}
		var data=Count(name) //计算拓展模块数据，count
		tb.innerHTML=''
		for(var i=0;i<data.length;i++)
		{
			html_anlysis(data[i],tb)
		}
//		if(cpu_name=='GB')
//		{
//			for(var i=0;i<otr.length;i++)
//			{
//				otr[i].children[0].innerHTML='模块'+(7+i)//从模块1开始
//			}
//		}
	}
}
function log(){
	console.log('Welcome to GongBei electron Official website')
	console.log('This website is developed by ZYS')
	console.log('Welcome to my home page:https://zys.wjfx.net')
}
//页面样式
var view_css={
	'body':{
		'margin': '0',
		'padding': '0'
	},
	'.header_web':{
		'width': '100%',
		'height': '60px',
		'color': '#ffffff',
		'font-weight': 'bold',
		'background': '#2A2828',
		'box-shadow': '0px 0px 10px #ccc',
		'cursor': 'default'
	},
	'.left_web':{
		'height': '60px',
		'width': '100px',
		'float': 'left',
		'line-height': '75px',
		'text-align': 'center',
		'margin-right': '30px'
	},
	'.title_web':{
		'float': 'left',
		'height': '10px',
		'width': 'auto',
		'line-height': '60px'
	},
	'.right_web':{
		'width': '110px',
		'height': '50px',
		'margin-top': '5px',
		'margin-right': '50px',
		'line-height': '60px',
		'background': '#1F7BD0',
		'float': 'right',
		'text-align': 'center'
	},
	'#app':{ //计算表app的样式
		'width':'550px',
		'margin':'0 auto',
		'box-shadow':'0px 0px 10px #ccc',
		'border-radius':'10px',
		'margin-top':'20px',
		'margin-bottom':'20px',
		'border':'solid 1px #ccc',
		'display':'block',
		'padding-bottom':'20px'
	},
	'select':{
		'background':'#fff', //计算表app里的选择框的样式
		'border':'1px solid #ccc',
		'display':'inline-block',
		'height':'25px',
		'padding':'4px 6px',
		'font-size':'14px',
		'outline':'none',
		'color':'#555',
		'vertical-align':'middle',
		'border-radius':'4px',
		'cursor':'pointer'
	},
	'.add':{
		'padding':'6px 12px',
		'margin-bottom':'0',
		'font-size':'14px',
		'font-weight':'600',
		'text-align':'center',
		'white-space':'nowrap',
		'touch-action':'manipulation',
		'cursor':'pointer',
		'border':'1px solid transparent',
		'border-radius':'4px',
		'color':'#333',
		'background': '#fff',
		'border-color': '#ccc'
	},
	'#tips':{  //特殊寄存器地址表文字格式
		'width':'420px',
		'max-height':'30px',
		'margin':'0 auto',
		'margin-top':'10px',
		'padding-bottom':'15px',
		'overflow':'hidden',
		'transition': 'max-height 2s'
	},
	'#tips:focus':{
		'max-height':'5000px'
	},
	'#tips_title':{ //特殊寄存器地址表标题格式
		'width':'100%',
		'height':'30px',
		'text-align':'center',
		'line-height':'20px',
		'font-size':'18px',
		'padding-top':'10px',
		'cursor':'pointer',
		'color': '#888888'
	},
	'#tips_list':{ //特殊寄存器地址表展开后的格式
		'width': '100%',
		'margin-top': '10px',
		'display': 'inline-block',
	},
	'#tips_list div':{ //特殊寄存器地址表展开后的格式
		'margin-left': '4%',
		'width': '180px',
		'height': '35px', //两行间隔
		'float': 'left',
		'color': '#888888',
		'cursor': 'default'
	},
	'tr':{
		'height':'45px'//模块选项行宽
	}
}
//dom结构
var html=[ //特殊寄存器地址表结构
	{
		'tagname':'div',
		'attr':{'id':'tips_title'},
		'innerHTML':'特殊寄存器地址表V',
		'pid':'01'
	},
	{
		'tagname':'div',
		'attr':{'id':'tips_list'},
		'pid':'01'
	},
	{
		'tagname':'div',
		'attr':{
			'onclick':"style.maxHeight='900px'",
			'id':'tips'
		},
		'nid':'01',
		'pid':'app'
	},
	{
		'tagname':'div',
		'nid':'app',
		'pid':'#/'
	},
]
var register_SRST=[ //特殊寄存器地址表
	{
		'tagname':'div',
		'nid':'tips_list',
		'pid':'#/'
	},
	{
		'tagname':'div',
		'innerHTML':'IW630:预留',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'IW632:诊断报警代码',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'IB634:诊断报警设备ID',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'IB635:断线错误设备ID',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID636:模块7型号(数据类型ASCII）',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID640:模块8型号',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID644:模块9型号',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID648:模块10型号',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID652:模块11型号',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
	{
		'tagname':'div',
		'innerHTML':'ID656:模块12型号',
		'attr':{'onclick':'link(" ")'},
		'pid':'tips_list'
	},
]
var register_SRST1=[ //特殊寄存器地址表
	{
		'tagname':'div',
		'nid':'tips_list',
		'pid':'#/'
	},
]
//所有模块数据数组
var all_modular_list = [
	{
		name: 'EM DE08-8DI',
		s_input: 8,
		s_output: 0,
		flag:0,      //flag：0是标准模块，flag：1是大点数模块
	},
	{
		name: 'EM DE16-16DI',
		s_input: 16,
		s_output: 0,
		flag:0,
	},
	{
		name: 'EM DE32-32DI',
		s_input: 32,
		s_output: 0,
		flag:1,
	},
	{
		name: 'EM DR08-8DQ',
		s_input: 0,
		s_output: 8,
		flag:0,
	},
	{
		name: 'EM QR16-16DQ',
		s_input: 0,
		s_output: 16,
		flag:0,
	},
	{
		name: 'EM QR32-32DQ',
		s_input: 0,
		s_output: 32,
		flag:1,
	},
	{
		name: 'EM DT08-8DQ',
		s_input: 0,
		s_output: 8,
		flag:0,
	},
	{
		name: 'EM QT16-16DQ',
		s_input: 0,
		s_output: 16,
		flag:0,
	},
	{
		name: 'EM QT32-32DQ',
		s_input: 0,
		s_output: 32,
		flag:1,
	},
	{
		name: 'EM DR16-8DI8DQ',
		s_input: 8,
		s_output: 8,
		flag:0,
	},
	{
		name: 'EM DR32-16DI16DQ',
		s_input: 16,
		s_output: 16,
		flag:0,
	},
	{
		name: 'EM DT16-8DI8DQ',
		s_input: 8,
		s_output: 8,
		flag:0,
	},
	{
		name: 'EM DT32-16DI16DQ',
		s_input: 16,
		s_output: 16,
		flag:0,
	},
	{
		name: 'EM AE04-4AI',
		m_input: 4,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AE08-8AI',
		m_input: 8,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AE16-16AI',
		m_input: 16,
		m_output: 0,
		flag:1,
	},
	{
		name: 'EM AE32-32AI',
		m_input: 32,
		m_output: 0,
		flag:1,
	},
	{
		name: 'EM AQ02-2AQ',
		m_input: 0,
		m_output: 2,
		flag:0,
	},
	{
		name: 'EM AQ04-4AQ',
		m_input: 0,
		m_output: 4,
		flag:0,
	},
	{
		name: 'EM AQ08-8AQ',
		m_input: 0,
		m_output: 8,
		flag:1,
	},
	{
		name: 'EM AM03-2AI1AQ',
		m_input: 2,
		m_output: 1,
		flag:0,
	},
	{
		name: 'EM AM06-4AI2AQ',
		m_input: 4,
		m_output: 2,
		flag:0,
	},
	{
		name: 'EM AM12-8AI4AQ',
		m_input: 8,
		m_output: 4,
		flag:1,
	},
	{
		name: 'EM AM16-8AI8AQ',
		m_input: 8,
		m_output: 8,
		flag:1,
	},
	{
		name: 'EM AR02-2PT100',
		m_input: 2,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AR04-4PT100',
		m_input: 4,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AR08-8PT100',
		m_input: 8,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AT04-4TC',
		m_input: 4,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AT08-8TC',
		m_input: 8,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AN04-4NTC',
		m_input: 4,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AN08-8NTC',
		m_input: 8,
		m_output: 0,
		flag:0,
	},
	{
		name: 'EM AN16-16NTC',
		m_input: 16,
		m_output: 0,
		flag:1,
	},
	{
		name: 'EM EN88-8NTC8AI',
		m_input: 16,
		m_output: 0,
		flag:1,
	},
	{
		name: 'EM EN4C-12NTC4AI',
		m_input: 16,
		m_output: 0,
		flag:1,
	},
	{
		name: 'EM AW04',
		m_input: 4,
		m_output: 0,
		flag:1,
	}
]
var container_dom =[
	{
		'tagname':'table',
		'attr':{
			'id':'m_table',
			'style':'width:100%;'
		},
		'nid':'m_table',
		'pid':'#/'
	}, //整个表的格式 
	{
		'tagname':'thead',
		'attr':{
			'id':'mth'
		},
		'nid':'mth',
		'pid':'m_table'
	}, //模块之前的格式
	{
		'tagname':'tr',
		'attr':{
			'id':'mth_tr',
			'style':'height: 40px;'
		},
		'nid':'mth_tr',
		'pid':'mth'
	}, //顶部标题格式
	{
		'tagname':'th',
		'attr':{
			'style':'width:10px;'//5px
		},
		'pid':'mth_tr'
	}, //顶部标题格式
	{
		'tagname':'th',
		'attr':{
			'style':'width: 210px;'
		},
		'innerHTML':'Smart标准型PLC-扩展模块起始地址表',
		'pid':'mth_tr'
	},
	{
		'tagname':'tbody',
		'attr':{
			'id':'mtb'
		},
		'nid':'mtb',
		'pid':'m_table'
	},
	/*cpu */
	{
		'tagname':'tr',
		'nid':'mtb_htr1',
		'pid':'mth'
	},
	{
		'tagname':'td',
		'attr':{
			'style':'text-align:center',
		},
		'innerHTML':'CPU',
		'nid':'htd_1',
		'pid':'mtb_htr1'
	},
	{
		'tagname':'td',
		'attr':{
			'colspan':'1'
		},
		'nid':'htd_2',
		'pid':'mtb_htr1'
	},
	{  //CPU选择
		'tagname':'select',
		'attr':{
			'onchange':'operation(this,value)', //this指向attr,使用value
			'style':"width:auto;margin-left: 5px;",
			'value':'SR/ST',
			'id':'cpu_sel'
		},
		'nid':'cpu_sel',
		'pid':'htd_2',
	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'GB'
//		},
//		'innerHTML':'后6个模块',
//		'pid':'cpu_sel',
//	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'SR/ST'
//		},
//	    'innerHTML':'原厂Smart SR/ST系列',
//		'pid':'cpu_sel',
//	},
	{
		'tagname':'option',
		'attr':{
			'value':'GB'
		},
		'innerHTML':'工贝Smart SR/ST系列',
		'pid':'cpu_sel',
	},
	{
		'tagname':'th',
		'innerHTML':'组态选择',
		'pid':'mtb_htr1'
	},
	{
		'tagname':'th',
		'innerHTML':'输入',
		'pid':'mtb_htr1'
	},
	{
		'tagname':'th',
		'innerHTML':'输出',
		'pid':'mtb_htr1'
	},
	/*cpu */
//	{
//		'tagname':'tr',
//		'nid':'mtb_htr2',
//		'pid':'mth'
//	},
//	{
//		'tagname':'td',
//		'attr':{
//			'style':'text-align:center',
//		},
//		'innerHTML':'机头',
//		'nid':'htd_3',
//		'pid':'mtb_htr2'
//	},
//	{
//		'tagname':'td',
//		'attr':{
//			'colspan':'3'
//		},
//		'nid':'htd_4',
//		'pid':'mtb_htr2'
//	},
//	{
//		'tagname':'select',
//		'attr':{
//			'onchange':'operation(this,value)', //this指向attr,使用value,即01
//			'style':"width:auto;margin-left: 6px;",
//			'disabled':'disabled',
//			'value':'01',
//			'id':'chead_sel'
//		},
//		'nid':'chead_sel',
//		'pid':'htd_4',
//	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'01'
//		},
//		'innerHTML':'不使用，模块直接插在后面扩展口处',
//		'pid':'chead_sel',
//	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'SB PLINK'
//		},
//		'innerHTML':'SB PLINK',
//		'pid':'chead_sel',
//	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'DP PLINK'
//		},
//		'innerHTML':'DP PLINK',
//		'pid':'chead_sel',
//	},
//	/*附属 */
//	{ //间隔
//		'tagname':'tr',
//		'nid':'mtb_htr3',
//		'attr':{
//			'id':'sub_tr'
//		},
//		'pid':'mth'
//	},
//	{
//		'tagname':'td',
//		'innerHTML':'注意',
//		'attr':{
//			'style':'text-align: center;'
//		},
//		'nid':'htd_5',
//		'pid':'mtb_htr3'
//	},
//	{
//		'tagname':'td',
//		'attr':{
//			'colspan':'10'
//		},
//		'nid':'htd_6',
//		'pid':'mtb_htr3'
//	},
//	{ //1~6模块选择
//		'tagname':'select',
//		'attr':{
//			'onchange':'operation(this,value)', //this指向attr,使用value,即SR/ST
//			'style':"width:auto;margin-left: 6px;",
//			'value':'SR/ST',
//			'id':'GB_sel',
//			'disabled':'disabled'
//		},
//		'nid':'cGB_Model_sel',
//		'pid':'htd_6',
//	},
//	{
//		'tagname':'option',
//		'attr':{
//			'value':'原厂主机最多扩展6个模块'
//		},
//		'innerHTML':'原厂主机最多扩展6个模块',
//		'pid':'cGB_Model_sel',
//	},
]
var control_dom=[  //模块7及以后的控制数组
	{
		'tagname':'tr',
		'attr':{
			'style':'height: 30px;', //与上行的距离
			'class':'tb_tr'
		},
		'nid':'tb_tr',
		'pid':'mtb'
	},
	{  //左侧显示的模块数
		'tagname':'td',
		'attr':{
			'style':'width: 60px; text-align: center;' //左侧离地址表左侧的距离
		},
		'pid':'tb_tr'
	},
	{ //选择型号框格式
		'tagname':'td',
		'attr':{
			'style':'text-align: center;', 
			'id':'m_td2'
		},
		'nid':'m_td2',
		'pid':'tb_tr'
	},
	{
		'tagname':'td',
		'attr':{
			'style':'width: 80px; text-align: center;'
		},
		'pid':'tb_tr'
	},
	{
		'tagname':'td',
		'attr':{
			'style':'width: 70px; text-align: center;'
		},
		'pid':'tb_tr'
	},
	{
		'tagname':'td',
		'attr':{
			'style':'width: 70px; text-align: center;'
		},
		'pid':'tb_tr'
	},
	{
		'tagname':'select',
		'attr':{
			'onchange':'operation(id.split("sel_")[1],value)'
		},
		'pid':'m_td2',
		'children':[]
	},
	{
		'tagname':'div',
		'nid':'mtb',
		'pid':'#/'
	},
]