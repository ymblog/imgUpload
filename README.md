## 移动端图片预览压缩
### 关于
移动端图片上传预览压缩插件，通过FileReader生成base64图片资源进行预览，通过canvas进行图片的压缩，将图片url转换成Blob对象上传。
### 注意事项
1、移动端file有兼容上的问题
解决方案:<input type="file" id="upload" class="upload" accept="image/*" multiple />
### 使用说明
本插件基于jquery开发,所以使用前需要引入jquery
```
ImgUpload({
    target:$('#upload'),//file文件
    maxSize:xxx,//上传最大值 单位kb 默认500k
    success:function(data){//预览成功的函数
    }
})
```
### 传送门
[移动端图片预览压缩](http://lktop.coding.me/ymblog/ym/plugin/)
### 特别说明
这个只是一个实现的demo，至于兼容和bug会有的，大家可以自己修改和扩展，可以推荐一个比较成熟的https://github.com/think2011/localResizeIMG
### 感谢
喜欢的同学可以顺手给个star支持一下，谢谢！！

