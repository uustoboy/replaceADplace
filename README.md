# node 替换公司广告位文字

## 公司广告位文字是手动改JS，根据之前开发的 [《TxtReplace》](https://github.com/uustoboy/TxtReplace) 改了改,自动更新SVN->替换文字->自动提交SVN,不过node自动提交SVN经常不太好使....当然公司的信息已经抹去了~
<br/>
<br/>
后记：<br/>
这个更新SVN其实异步，替换文件文字也是异步，最后提交SVN也是异步迫不得已选择了一个是俄罗斯套娃的Promise暂停5秒的设计（不是很完美，但是能用....）；
