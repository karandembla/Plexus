"use strict";
window.addEventListener("load", function () {
	"use strict";
var FUNC = function () {
var that = {};
that.detectmob = function () {
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
return true;
} else {
return false;
}
};
that.diap = function (variable, min, max) {
return variable > min && variable < max;
};
that.radius = function (x, y, cX, cY, radius) {
return Math.sqrt((x - cX) * (x - cX) + (y - cY) * (y - cY)) < radius;
};
return that;
}();
var ANIM = function ANIM(data) {
var that = {};
var createAnim = function createAnim(path) {
var animData = {
container: that.container,
renderer: 'svg',
loop: false,
autoplay: false,
rendererSettings: {
progressiveLoad: false
},
path: data.path
};
return bodymovin.loadAnimation(animData);
};
that.playAt = function () {
var startAt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
that.anim.pause();
that.anim.goToAndPlay(startAt, false);
that.playing = true;
};
that.pauseAt = function (startAt) {
if (startAt !== undefined) that.anim.goToAndPlay(startAt, false);
that.anim.pause();
that.playing = false;
};
that.data = data;
that.container = document.getElementById(data.id);
that.anim = createAnim(that.data.path);
that.inArea = [];
that.count = data.count;
that.resizing = function () {
var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
that.anim && that.anim.destroy();
that.anim = createAnim(that.data.path);
that.anim.addEventListener('DOMLoaded', function () {
that.update();
that.outOfAreas();
if (typeof func == "function") func();
});
};
that.update = function () {
that.svg = [];
};
that.stopTimers = function () {
clearTimeout(that.animateTimer);
clearTimeout(that.loopAnimateTimer);
};
that.outOfAreas = function () {
for (var i = 0; i < that.count; i++) {
that.inArea[i] = false;
}
};
that.animate = function (startAt, opt) {
var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
var play = function play() {
that.playAt(startAt);
that.animateTimer = setTimeout(function () {
that.pauseAt();
callback();
}, opt.time || 0);
};
if (that.playing) {
that.anim.play();
stop = setTimeout(function () {
play();
}, opt.responseFromRound || 0);
} else {
play();
}
};
that.loopAnimate = function (startAt, opt) {
that.looping = function () {
that.playAt(startAt);
that.loopAnimateTimer = setTimeout(function () {
that.looping();
}, opt.time || 0);
};
if (that.playing) {
anim.play();
stop = setTimeout(that.looping, opt.responseFromRound || 0);
} else {
that.looping();
}
};
return that;
};
var anim = ANIM({
id: "bodymovin",
path: "https://cdn.rawgit.com/karandembla/Plexus/master/Plexus.json",
count: 1
});
window.addEventListener("resize", anim.resizing);
function setLink(node, link, cube) {
var wide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
if (cube) {
var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
var sizes = node.getBoundingClientRect();
var width = sizes.right - sizes.left + wide;
var height = sizes.bottom - sizes.top + wide;
poly.style.cursor = "pointer";
var left = -(width / 2);
var right = width / 2;
var top = -(height / 2);
var bottom = height / 2;
var coords = left + "," + top + "," + left + "," + bottom + "," + right + "," + bottom + "," + right + "," + top;
poly.setAttribute("points", coords);
poly.style.fill = "transparent";
/* poly.style.height = height+"px";*/
node.appendChild(poly);
poly.addEventListener("click", function () {
/* console.log('s', link);*/
location.href = link;
});
} else {
node.style.cursor = "pointer";
node.addEventListener("click", function () {
/* console.log(link);*/
location.href = link;
});
}
}
anim.update = function () {
var needed = anim.container.children[0] && anim.container.children[0].children[1];
setLink(needed.children[1], "/services/#employee-benefits");
setLink(needed.children[2], "/services/#employee-benefits", true, 1500);
setLink(needed.children[3], "/services/#property-and-casualty");
setLink(needed.children[4], "/services/#property-and-casualty", true, 1500);
setLink(needed.children[5], "/services/#home-and-auto");
setLink(needed.children[6], "/services/#home-and-auto", true, 1500);
setLink(needed.children[7], "/services/#retirement-plans");
setLink(needed.children[8], "/services/#retirement-plans", true, 1500);
setLink(needed.children[9], "/services/#mergers-and-acquisitions");
setLink(needed.children[10], "/services/#mergers-and-acquisitions", true, 1500);
setLink(needed.children[11], "/services/#global-network");
setLink(needed.children[12], "/services/#global-network", true, 1500);
setLink(needed.children[13], "/services/#technology-solutions");
setLink(needed.children[14], "/services/#technology-solutions", true, 1500);
anim.anim.play();
};
/* 9000 - it is intro, from 9000 cycle 6000*/
var loop = function loop() {
anim.animate(8000, {
time: 8000
}, loop);
};
var loader = function loader() {
anim.animate(0, {
time: 8000
}, loop);
};
anim.resizing(loader);
});
