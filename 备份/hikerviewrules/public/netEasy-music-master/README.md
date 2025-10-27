# 移动端网易云音乐

### JavaScript + jQuery + LeanCloud仿移动端网易云音乐

### 链接二维码

![](https://i.loli.net/2018/01/18/5a605e4728bb4.png)

**Notice:** _请使用**手机浏览器扫一扫** 或 **电脑开启device mode**浏览_

## 页面构成

### 1. 首页

+ 推荐音乐
+ 热歌榜
+ 歌曲搜索

### 2. 歌单详情页

+ 歌单简介
+ 歌单歌曲列表

### 3. 歌曲播放页

+ 歌曲唱片动画
+ 歌词滚动高亮


- 百分百像素级还原
- flex布局
- 原生js实现
- 模拟数据

## 问题

- **防止margin合并**

```
.noCollapse::after{
  content:'';
  display:table;
}
.noCollapse::before{
  content:'';
  display:table;
}
```

- **背景模糊 变暗**

```
filter: blur(100px) brightness(.2);
```

- **多行文字的ellipsis效果**实现：

```
	element {
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient: vertical; 
		overflow:hidden;
	}
```

遇到问题解决方法:

1. 网速慢时图片闪烁
2. 搜索网络请求过多,使用函数节流,减少搜索时请求次数
3. transform动画是否会覆盖以前的transform
4. git问题

```
$ git pull

Pull is not possible because you have unmerged files.
Please, fix them up in the work tree, and then use 'git add/rm <file>'
as appropriate to mark resolution, or use 'git commit -a'

应该是因为local文件冲突了

解决方法：
1.pull会使用git merge导致冲突，需要将冲突的文件resolve掉 git add -u, git commit之后才能成功pull.
2.如果想放弃本地的文件修改，可以使用git reset --hard FETCH_HEAD，FETCH_HEAD表示上一次成功git pull之后形成的commit点。然后git pull.
注意：
git merge会形成MERGE-HEAD(FETCH-HEAD) 。git push会形成HEAD这样的引用。HEAD代表本地最近成功push后形成的引用。
```

5. 填数据时js里a的链接相对于html写的,没有考虑是填充后的路径
6. 背景图片写在了伪类,添加动态数据问题,
7. 歌词lyric 需要回车,去掉\n
8. ~~ 去掉小数部分,保留整数部分 把小数变成整数
9. 歌词滚动问题css写好不做动画,解决方法是细节问题

### 歌曲播放页

1. **歌曲播放页disc唱片部分的播放/暂停动画**，主要使用了CSS3的`animation`实现，特别是`animation-play-state`的使用。不过，*
   *这里有一个小bug**,即**在ios上的webkit内核浏览器中(例如：safari,chrome)，`-webkit-animation-play-state:paused`不起作用
   **，也就是说，动画会一直进行下去，即使按了暂停按钮。当然，可以用jQuery的addClass/removeClass方法配合CSS3的
   `.no-animation{-webkit-animation:none!important;}`
   样式解决这个bug,但是这又会产生新的问题，即点击暂停，动画此时可以暂停；但是当再次点击播放时，动画就会重新开始，而不是接着之前的状态继续。所以这两种方法都不太完美。这里我选用了第一种方法。
2. **歌曲播放页disc指针部分的播放/暂停动画**，主要使用了CSS3的`transform`实现，特别是`transform：rotate()`
   的使用。但是transform属性默认是以`transform-origin:50% 50%`为固定点进行旋转。而这里**需要以disc指针的顶部为固定点进行旋转
   **，所以应设置其样式为`transform-origin:left top;`。

## 性能优化

### HTML

1. **尽量避免了使用多层标签嵌套**，同时选择`::before`和`::after`**伪元素减少html标签的使用**。
2. 用link标签引入外部css样式表，放入&lt;head&gt;标签内的最底部，用script标签引入外部JavaScript脚本放入&lt;body&gt;标签内的最底部。

### CSS

1. **选择器层级嵌套匹配尽量不要超过4层**。
2. **需要经常复用的样式尽量写在一个className上**，然后在html中相应的元素上添加className。
3. **尽量使用简写/复合样式**，比如，`background,animation`等简写属性。

### JavaScript

1. 使用了立即执行函数（IIFE）把代码封闭。
2. 主要代码使用了构造函数和原型对象进行了封装。
3. 将固定不变的节点保存到变量，减少重复调用。

### Gulp

1. 对图片压缩(使用了[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin))。
2. 给CSS自动补全前缀并压缩（使用了[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer),[gulp-cssnano]()）。
3. 对HTML压缩(使用了[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin))。

### Webpack

1. 使用了`UglifyJsPlugin()`方法对JavaScript文件压缩。
