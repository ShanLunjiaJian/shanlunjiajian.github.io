// Fireworks
window.addEventListener('load', () => {
  const canvasEl = document.createElement("canvas");
  canvasEl.classList.add("fireworks");
  document.body.append(canvasEl);
  const ctx = canvasEl.getContext("2d");
  const numberOfParticules = 60;
  const numberOfTexts = 5;
  let pointerX = 0;
  let pointerY = 0;

  const tap = "mousedown";
  //const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
  //const colors = ["rgba(255,174,201)","rgba(153,217,234)","rgba(255,242,0)"];
  const colors = ["rgb(128,128,128)","rgb(159,159,159)","rgb(191,191,191)","rgb(223,223,223)","rgb(255,255,255)"];
  const textColors = ["rgb(0,0,0)","rgb(32,32,32)","rgb(64,64,64)","rgb(96,96,96)","rgb(128,128,128)"];

  const setCanvasSize = debounce(() => {
    canvasEl.width = 2 * window.innerWidth,
    canvasEl.height = 2 * window.innerHeight,
    canvasEl.style.width = window.innerWidth + "px",
    canvasEl.style.height = window.innerHeight + "px",
    canvasEl.getContext("2d").scale(2, 2);
  }, 500);

  const render = anime({
    duration: 1 / 0,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  });

  document.addEventListener(tap, e => {
    "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(), updateCoords(e), animateParticules(e, pointerX, pointerY));
  }, !1),
    setCanvasSize(),
    window.addEventListener("resize", setCanvasSize, !1);

  function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
  }

  function setParticuleDirection(e) {
    const t = anime.random(0, 360) * Math.PI / 180, a = anime.random(50, 180), n = [-1, 1][anime.random(0, 1)] * a;
    return {
      x: e.x + n * Math.cos(t),
      y: e.y + n * Math.sin(t)
    };
  }

  function createParticule(e, t) {
    const a = {};
    return a.x = e,
      a.y = t,
      a.color = colors[anime.random(0, colors.length - 1)],
      a.radius = anime.random(16, 32),
      a.endPos = setParticuleDirection(a),
      a.draw = function() {
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        ctx.fillStyle = a.color,
        ctx.fill()
      },
      a;
  }

  function createCircle(e, t) {
    const a = {};
    return a.x = e,
      a.y = t,
      //a.color = "#F00",
      a.color="rgb(0,0,0)",
      a.radius = .1,
      a.alpha = .5,
      a.lineWidth = 6,
      a.draw = function() {
        ctx.globalAlpha = a.alpha,
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        ctx.lineWidth = a.lineWidth,
        ctx.strokeStyle = a.color,
        ctx.stroke(),
        ctx.globalAlpha = 1
      },
      a;
  }

  function createText(text,x,y){
    const a={};
    a.x=x,a.y=y,a.color=textColors[anime.random(0, textColors.length - 1)],a.alpha=1,
    a.endPos=setParticuleDirection(a),
    a.draw = function() {
      ctx.globalAlpha = a.alpha,
      ctx.textAlign="center",
      ctx.fillStyle=a.color,
      ctx.font="40px Consolas",
      ctx.beginPath(),
      ctx.fillText(text,a.x,a.y+20),
      ctx.fill(),
      ctx.globalAlpha = 1;
    };
    return a;
  }

  function renderParticule(e) {
    for (let t = 0; t < e.animatables.length; t++) {
      e.animatables[t].target.draw();
    }
  }

  let clickCount=0;
  let clickCountMax=0;

  function animateParticules(ev, e, t) {
    for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) {
      n.push(createParticule(e, t));
    }
    anime.timeline().add({
      targets: n,
      x: function(e) {
        return e.endPos.x;
      },
      y: function(e) {
        return e.endPos.y;
      },
      radius: .1,
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule
    }).add({
      targets: a,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: "linear",
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: a.draw
    }, 0);

    //cps test
    const len=10;
    const minClickCount=10;
    if(ev.button==0){
      clickCount++;
      if(clickCount>clickCountMax) clickCountMax=clickCount;
      if(clickCount>=minClickCount){
        var texts=[];
        for(var i=0;i<numberOfTexts;i++)
            texts.push(createText((clickCount/len).toString(),e,t));
        texts.push(createText((clickCountMax/len).toString(),e,t))
        anime.timeline().add({
          targets: texts,
          x: function(e) {
            return e.endPos.x;
          },
          y: function(e) {
            return e.endPos.y;
          },
          radius: .1,
          alpha: {
            value: 0,
            easing: "linear",
            duration: 1000
          },
          duration: anime.random(1200, 1800),
          easing: "easeOutExpo",
          update: renderParticule
        });
      }
      console.log(clickCount,clickCountMax);
      setTimeout(function(){ clickCount--; },1000*len);
    }
  }

  function debounce(fn, delay) {
    let timer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay);
    };
  }
});
