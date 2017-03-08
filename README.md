# jquery.scrolling
自定义滚动条
####dom结构
````html
<div id="box">
  <div class="content">
    //列表
  </div>
</div>
````
####js
````javascript
//$('#box').scrolling();
//or
$('#box').scrolling({ 
  backgroundColor: '#0a3f5e', 
  width: '0.02rem', 
  borderRadius: '0.03rem', 
  height: '1.3rem', 
  right: '0.04rem'
  }, { 
  backgroundColor: '#0396c2', 
  borderRadius: '0.03rem', 
  width: '0.06rem', 
  marginLeft: '-0.02rem' 
  });
//or
$('#box').scrolling({ 
backgroundColor: '#0a3f5e', 
width: '0.02rem'
}, { 
backgroundColor: '#0396c2'
},true);
````
####参数说明
scrolling 可接受三个参数，第一个参数为track样式类型json对象，第二个参数为thumb样式类型json对象，第三个参数指定横向纵向，类型布尔值，false为纵向，true为横向，可省略，默认false。
列表长度改变必须执行$('#box').scrollingOff();并重新引用$('#box').scrolling();
