const player=document.querySelector(".player");
const video=document.querySelector(".viewer");
const progress=document.querySelector(".progress");
const progressBar=document.querySelector(".progress__filled");
const toggle=document.querySelector(".toggle");
const skipButtons=document.querySelectorAll("[data-skip]");
const ranges=document.querySelectorAll(".player__slider");

// functions
function togglePLay(){
  const method=video.paused ? 'play' : 'pause';
    // if(video.paused){
    //     video.play();
    // } else{
    //     video.pause();
    // }
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent=icon;
}
function skip(){
    
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}
function handlRangeUpdate(){
    video[this.name]=this.value;
    console.log(this.name);
    console.log(this.value);
}
function handlProgressBar(){
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e){
   const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
   video.currentTime=scrubTime;
}
video.addEventListener('click',togglePLay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handlProgressBar);
toggle.addEventListener('click',togglePLay);

skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handlRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',handlRangeUpdate));
let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',()=> mousedown=true);
progress.addEventListener('mouseup',()=> mousedown=false);