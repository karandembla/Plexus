window.addEventListener("load", function() {
	"use strict";
	const FUNC = function(){
		const that = {};
		that.detectmob = function() { 
			if( navigator.userAgent.match(/Android/i)
			 || navigator.userAgent.match(/webOS/i)
			 || navigator.userAgent.match(/iPhone/i)
			 || navigator.userAgent.match(/iPad/i)
			 || navigator.userAgent.match(/iPod/i)
			 || navigator.userAgent.match(/BlackBerry/i)
			 || navigator.userAgent.match(/Windows Phone/i)
			 ){
				return true;
			}
			else {
				return false;
			}
		}
		that.diap = function(variable,min,max){
			return(variable > min && variable < max);
		}
		that.radius = function(x,y,cX,cY,radius){
			return Math.sqrt((x-cX)*(x-cX) + (y-cY)*(y-cY)) < radius;
		}
		return that;
	}();

	const ANIM = function(data){
		const that = {};


		const createAnim = function(path) {
			const animData = {
				container: that.container,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				rendererSettings: {
					progressiveLoad:false
				},
				path: data.path
			};
			return bodymovin.loadAnimation(animData);
			
		}
		that.playAt = function(startAt=0) {
			that.anim.pause();
			that.anim.goToAndPlay(startAt,false);
			that.playing = true;
		}
		that.pauseAt = function(startAt) {
			if (startAt !== undefined) that.anim.goToAndPlay(startAt,false);
			that.anim.pause();
			that.playing = false;
		}

		that.data = data;
		that.container = document.getElementById(data.id);
		that.anim = createAnim(that.data.path);
		that.inArea = [];
		that.count = data.count;

		that.resizing = function(func=function(){}) {
			that.anim && that.anim.destroy();
			that.anim = createAnim(that.data.path);
			that.anim.addEventListener('DOMLoaded',function(){
				that.update();
				that.outOfAreas();
				if(typeof func == "function") func();
			})
		}

		that.update = function(){
			that.svg = []
		}


		that.stopTimers = function(){
			clearTimeout(that.animateTimer);
			clearTimeout(that.loopAnimateTimer);
		}

		that.outOfAreas = function(){
			for(let i=0;i<that.count;i++) that.inArea[i]=false
		}

		that.animate = function(startAt,opt,callback=function(){}){
			const play = function(){
				that.playAt(startAt);
				that.animateTimer=setTimeout(function(){
					that.pauseAt();
					callback();
				},opt.time || 0)
			}
			if(that.playing){
				that.anim.play();
				stop=setTimeout(function(){
					play();
				},opt.responseFromRound || 0)
			} else {
				play();
			}
		}

		that.loopAnimate = function(startAt,opt){
			that.looping = function(){
				that.playAt(startAt);
				that.loopAnimateTimer=setTimeout(function(){
					that.looping();
				},opt.time || 0)
			};
			if(that.playing){
				anim.play();
				stop=setTimeout(that.looping,opt.responseFromRound || 0)
			} else {
				that.looping();
			}
		}

		return that;
	}

	const anim = ANIM({
		id: "bodymovin",
		path: "https://rawcdn.githack.com/karandembla/Plexus/4e3a32467dfe9c8f49e7e6849fa58d60d7078026/Plexus3.json",
		count: 1,
	})


	window.addEventListener("resize", anim.resizing)

// 9000 - it is intro, from 9000 cycle 6000

	var loop = function() {
		anim.animate(8000,{
			time: 8000
		}, loop)
	}

	var loader = function() {
		anim.animate(0, {
			time: 8000
		}, loop)
	}


	anim.resizing(loader);
})
