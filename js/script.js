const scroll = new LocomotiveScroll({
    el: document.querySelector('#wrapper'),
    smooth: true
});

function time(){
  var a = 0
  setInterval(function(){
    a += Math.floor(Math.random()*20)
    if(a<100){
      document.querySelector("#loader h1").innerHTML = a +"%"
    }
    else{
      a = 100
      document.querySelector("#loader h1").innerHTML = a +"%"
    }
  },90)
}

var tl = gsap.timeline()
tl.to("#loader ",{
  top:"-100vh",
  delay:1,
  duration:1
})
tl.to("#loader h1",{
  duration:1,
  onStart:time()
})
tl.from(".headersec",{
    y:-100,
    duration:1,
    opacity:0
})
tl.to(".boundingelem, .boundingbottom",{
    y:0,
    ease: Expo.easeInOut,
    duration: 1,
    delay:-.5,
    stagger: .4,
})

// circleScalling
function circleScalling() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;
  
    var xprev = 0;
    var yprev = 0;

    var timeout;
  
    window.addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);
  
      xscale = gsap.utils.clamp(0.6, 1, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.6, 1, dets.clientY - yprev);
  
      xprev = dets.clientX;
      yprev = dets.clientY;
  
      circleMouseFollower(xscale, yscale);
  
      timeout = setTimeout(function () {
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }
  
  // circleMouseFollower
  function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
  
  circleScalling();
  circleMouseFollower();

// imageRotation
document.querySelectorAll(".about").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(dets){
       var diff = dets.clientY - elem.getBoundingClientRect().top;
       diffrot = dets.clientX - rotate;
       rotate = dets.clientX;

       gsap.to(elem.querySelector("img"),{
           opacity:1,
           ease:Power3,
           top:diff,
           left:dets.clientX,
           rotate:gsap.utils.clamp(-20,20,diffrot*.3),
        })
    });
    
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power1,
        })
    });
});

// timeSetting
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const currentTime = `${hours}:${minutes}`;
  document.getElementById('timeDisplay').textContent = currentTime;
}
updateTime();
setInterval(updateTime, 1000);
