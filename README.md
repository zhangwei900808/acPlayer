# AcPlayer 

## Document
```html
    <script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="./acplayer.js"></script>
    <link rel="stylesheet" href="./acplayer.css" media="screen" title="no title">
```
```html
<section class="cover">
        <div class="content">
          <img id="img-rotate" class="rotate-img" src="http://p.d1xz.net/2016/09/21/14744414257933989.jpg" alt="" />
          <a id="playpause" href="#" class="center acplayer-paused">
            <span></span>
          </a>
        </div>
      </section>
      <audio preload="auto" controls>
      				<source src="./BlueDucks_FourFlossFiveSix.mp3">
      				<source src="./BlueDucks_FourFlossFiveSix.ogg">
      				<source src="./BlueDucks_FourFlossFiveSix.wav">
      </audio>
```
```js
  $(function(){
      var acplayer = $( 'audio' ).acPlayer();

      $('#playpause').click(function(e){
        if (acplayer.audioState == "paused") {
          acplayer.play();
        }
        else{
          acplayer.pause();
          console.log("+++"+acplayer.getCurrentTime());
        }
      })
    });
```
![](http://cdn.awbeci.com/images/awbeci-xyz/blog/1.png)
![](http://cdn.awbeci.com/images/awbeci-xyz/blog/2.png)
### methods
* play
* pause
* getCurrentTime
* toTheTime

## useage
