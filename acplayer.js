
/*
	AUTHOR: Osvaldas Valutis, www.osvaldas.info
*/
//说明js是加载是正确的，接下来看看是哪里出了问题
;(function( $, window, document, undefined )
{
	'use strict'
	var isTouch		  = 'ontouchstart' in window,
		eStart		  = isTouch ? 'touchstart'	: 'mousedown',
		eMove		  = isTouch ? 'touchmove'	: 'mousemove',
		eEnd		  = isTouch ? 'touchend'	: 'mouseup',
		eCancel		  = isTouch ? 'touchcancel'	: 'mouseup',
		secondsToTime = function( secs )
		{
			var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
			return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
		},
		canPlayType	  = function( file )
		{
			var audioElement = document.createElement( 'audio' );
			return !!( audioElement.canPlayType && audioElement.canPlayType( 'audio/' + file.split( '.' ).pop().toLowerCase() + ';' ).replace( /no/, '' ) );
		};

		var AcPlayer = function(ele, opt) {
					this.$element = ele,
					this.theAudio = ele.get(0),
					this.$playpause = $('#playpause'),
					this.$imgRotate = $("#img-rotate"),
					this.currentTime = 0,
					this.defaults = {
						classPrefix: 'audioplayer',
						strPlay: 'Play',
						strPause: 'Pause',
						strVolume: 'Volume'
					},
					this.params = $.extend({}, this.defaults, opt),
					this.audioState='paused';
			}
			AcPlayer.prototype = {
			 play:function(){
				 if( this.$playpause.hasClass('acplayer-paused') )
				 {
						this.$playpause.removeClass('acplayer-paused').addClass('acplayer-playing');
				 }
				 if(!this.$imgRotate.hasClass('rotate-img'))
				 {
						this.$imgRotate.addClass('rotate-img');
				 }
				 this.$imgRotate.css('webkitAnimationPlayState','running');
				 if (this.theAudio.paused) {
						this.theAudio.play();
						this.monitorCurrentTime();
						this.audioState='playing';
					}
			 },
			 pause:function(){
				 if( this.$playpause.hasClass('acplayer-playing') )
					{
							 this.$playpause.removeClass('acplayer-playing').addClass('acplayer-paused');
					}
					clearInterval(this.ivl);
					if (!this.theAudio.paused) {
						this.theAudio.pause();
						this.$imgRotate.css('webkitAnimationPlayState','paused');
						this.audioState='paused';
					}
			 },
			 monitorCurrentTime:function(){
				 var that = this;
				 clearInterval(this.ivl);
				 this.ivl = setInterval(function(){
							that.currentTime = that.theAudio.currentTime;
							if(that.theAudio.ended){
								that.theAudio.currentTime=0;
								clearInterval(that.ivl);
								that.$imgRotate.css({
									'webkitAnimationPlayState':'paused'
								});
								that.$imgRotate.removeClass('rotate-img');
								that.$playpause.removeClass('acplayer-playing').addClass('acplayer-paused');
								that.audioState='paused';
							}
							console.log(that.currentTime)
							return that.currentTime;
				},100)
			},
			getCurrentTime:function(){
				return that.theAudio.currentTime;
			},
			toTheTime:function(time){
				if(time <= that.theAudio.duration)
				{
					that.theAudio.currentTime = time;
				}
			},
			 init: function() {
				this.$element.each( function()
				 {
					 var timeCurrent = $('.audioplayer-time-current'),
					 timeDuration = $('.audioplayer-time-duration'),
					 barLoaded = $('.audioplayer-bar-loaded'),
					 barPlayed=$('.audioplayer-bar-played'),
					 theBar=$('.audioplayer-bar'),
						 theAudio = $(this).get(0),
							 adjustCurrentTime = function( e )
							 {
								 var theRealEvent		 = isTouch ? e.originalEvent.touches[ 0 ] : e;
								 theAudio.currentTime = Math.round( ( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width() );
							 },
							 updateLoadBar = setInterval( function()
							 {
								 barLoaded.width( ( theAudio.buffered.end( 0 ) / theAudio.duration ) * 100 + '%' );
								 if( theAudio.buffered.end( 0 ) >= theAudio.duration )
									 clearInterval( updateLoadBar );
							 }, 100 );


						 timeDuration.html('&hellip;');
						 timeCurrent.html( secondsToTime( 0 ) );

						 theAudio.addEventListener('loadeddata', function()
						 {
							 timeDuration.html( secondsToTime( theAudio.duration ) );
						 });

						 theAudio.addEventListener( 'timeupdate', function()
						 {
							 timeCurrent.html( secondsToTime( theAudio.currentTime ) );
							 barPlayed.width( ( theAudio.currentTime / theAudio.duration ) * 100 + '%' );
						 });
						 theBar.on( eStart, function( e )
						 				{
						 					adjustCurrentTime( e );
						 					theBar.on( eMove, function( e ) { adjustCurrentTime( e ); } );
						 				})
						 				.on( eCancel, function()
						 				{
						 					theBar.unbind( eMove );
						 				});
				 });
				 return this;
			 }
			 };
	$.fn.acPlayer = function( options )
	{
		 //创建Beautifier的实体
		 var acPlayer = new AcPlayer(this, options);
		 //调用其方法
		 return acPlayer.init();
	}

})( jQuery, window, document );
