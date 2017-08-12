/**
 * [previewImg 预览图片]
 * @param  {[type]} input [文件上传input]
 * @param  {[type]} obj   [description]
 * @return {[type]}       [description]
 */
function previewImg(input,imgObj) {
    var maxsize = 300 * 1024;//超过300k进行压缩
    //是否支持
    if (typeof FileReader === 'undefined') {
        alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
        input.setAttribute('disabled','disabled');
    }
    if(input.files && input.files[0]){
        var file = input.files[0],
            reader = new FileReader();
        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            alert('不是有效的图片文件!');
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = function(e){
            var result =　this.result;//获取到base64的图片
            //大于300k图片进行压缩
            if(result.length >= maxsize){
                var img = new Image();
                img.src = result;
                img.onload = function(){
                    compressSrc = compress(img,0.8,100);
                    $(imgObj).setAttribute('src',compressSrc);
                    //ajax dataURLtoBlob(compressSrc);
                }
            }else{
                $(imgObj).setAttribute('src',result);
                //ajax dataURLtoBlob(result);
            }
        }
    }
}
/**
 * [compress 压缩图片]
 * @param  {[dom]} sourceImg [图片dom]
 * @param  {[int]0-1} scale     [缩小的尺寸比例]
 * @param  {[int]0-100} quality   [清晰质量]
 * @return {[object]}           [图片源]
 */
function compress(sourceImg,scale,quality){
    var area = sourceImg.width * sourceImg.height,//源图片的总大小
        height = sourceImg.height * scale,
        width = sourceImg.width * scale,
        compressCvs = document.createElement('canvas');//压缩的图片画布
    //压缩的图片配置宽高
    compressCvs.width = width;
    compressCvs.height = height;
    var compressCtx = compressCvs.getContext("2d");
    //解决ios 图片大于2000000像素无法用drawImage的bug
    if(area > 2000000 && navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        //瓦片绘制
        var smallCvs = document.createElement("canvas"),
            smallCtx = smallCvs.getContext("2d"),
            count = Math.ceil(area / 1000000),//分割的数量
            cvsWidth = width / count,//每个小canvas的宽度
            picWidth = sourceImg.width / count;//分割成小图片的宽度
        smallCvs.height = compressCvs.height;
        smallCvs.width =  width / count;
        //拼凑成大的canvas
        for(var i = 0;i < count;i ++){
            smallCtx.drawImage(sourceImg,i*picWidth,0,picWidth,sourceImg.height,0,0,cvsWidth,height);
            compressCtx.drawImage(smallCvs,i*cvsWidth,0,cvsWidth,height);
        }
    }else{
        compressCtx.drawImage(sourceImg,0,0,sourceImg.width,sourceImg.height,0,0,width,height);
    }
    //将canvas转换成base64
    return compressCvs.toDataURL('image/jpeg',quality/100);
}
/**
 * [dataURLtoBlob 将base64转换为blob对象]
 * @param  {[type]} dataurl [图片源base64]
 * @return {[object]}         [图片源blob对象]
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
//获取dom
function $(id){
    return document.getElementById(id);
}   