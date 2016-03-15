百葉窗
=======


> 文件： 百葉窗 jzShutter<br />
> 作者： RAiww <ra@iww.twbbs.org> (http://ra.iww.twbbs.org/)<br />
> 版本： v0.2.0<br />
> 授權： MIT @license: [ra.iww.twbbs.org/ffish/MIT_License](http://ra.iww.twbbs.org/ffish/MIT_License)



## 簡介

以百葉窗為形象，功能包括各種展示用效果。



## 目錄

 * lib
   * jzShutter.css
   * jzShutter.js



## 使用方法

### 名詞定義

> --定義名稱--

  - move_function： 動畫名稱
  - jVisionFuncName： 主框布置名稱
  - jCueFuncName： 選框布置名稱
  - speed： 設定輪播速度
  - anim： 設定動畫
    - true： 輪播
    - false： 無輪播
    - once： 輪播一次



### 嵌入語法

嵌入檔案：

```html
<link href="jzShutter.css" rel="stylesheet" type="text/css" />
<script src="jzShutter.js" type="text/javascript"></script>
```


HTML：

```html
<div data-jz-shutter="--jVisionFuncName--"
    data-jzy-cue="--jCueFuncName--"
    data-jzy-speed="--speed--"
    data-jzy-anim="--anim--">
    <!-- 主框 -->
    <div class="cJzVision">
        <!-- 輪播項目... -->
    </div>
    <!-- 選框 -->
    <div class="cJzCue"></div>
</div>
```


JavaScript：

```js
jzTell(function( jz ){"use strict";
    jz.shutter();
});
```


CSS：

```css
.cJzVision.--jVisionFuncName-- {
    ...
}
.cJzCue.--jCueFuncName-- {
    ...
}
```


設計自己的輪播：

```js
//移動方法函數
jz.shutter.move.myMoveFuncName = function(){...};

//主框布置
jz.shutter.vision.myVisionFuncName = function(){...};

//選框布置
jz.shutter.cue.myCueFuncName = function(){...};
```



### 共同開發

JavaScript：

```js
//>> 移動方法函數 -----

    ion_move.--move_function-- = function( jArgu ){...};

//>> 主框布置 -----

    ion_vision.--jVisionFuncName-- = function( jArgu ){
        ...
        jArgu.moveFunc.push( ion_move.--move_function-- );
    };

//>> 選框布置 -----

    ion_cue.--jCueFuncName-- = function( jArgu ){...};
```


JavaScript 綁定動畫、計時器：

```js
//動畫
//>> 設定
jArgu.moveFunc.push(function(){...});
//>> 執行
ion_actMoveFunc( jArgu, jIndex );
```


```js
//計時器
//>> 設定
jArgu.timer.push({ func: function(){
    ...
} });

//>> 綁定
ion_timer.bind( jArgu );
//>> 解除
ion_timer.stop( jArgu );
```


CSS：

與 __嵌入語法__ 裡說明相同，可在 ``` .cJzVision.--jVisionFuncName-- ``` 、 ``` .cJzCue.--jCueFuncName-- ``` 兩處修改所需樣式。



### 可用動畫參數

動畫：


主框：


選框：

  - initial： 綁定點擊執行動畫事件
  - point： 圓點按鈕



### 相關套件：

