import pets from "./data/ourPets.js";
const track=document.querySelector('.track');
let currentSliderPosition=0;
let shownSlide=0
window.addEventListener('resize', starter);
function starter(){        
    pxToScroll=sliderItem.clientWidth+getGapWidth();
    currentSliderPosition=shownSlide * -pxToScroll;
    track.style.transform = `translateX(${currentSliderPosition}px)`;
    buttonListener();
}


for(let item in pets){        
    const div=document.createElement("div");
    div.classList.add('sliderItem');
    div.innerHTML=`<img style='width: 100%' src="${pets[item].img}" alt="${pets[item].name}">
    <div class="type">${pets[item].name}</div>
    <button class='petButton' id="${item}">Learn more</button>`;
    track.append(div);
}


const sliderItem=document.querySelector('.sliderItem');
function getGapWidth(){
    const vpWidth=window.getComputedStyle(document.getElementById('body')).width;
    if (parseInt(vpWidth) >= 1280){
        return (track.clientWidth-3*sliderItem.clientWidth)/2;
    } else if(parseInt(vpWidth) < 1280 && parseInt(vpWidth) >= 768){
        return track.clientWidth-2*sliderItem.clientWidth;
    } else {
        return 0;
    }
}
let pxToScroll=sliderItem.clientWidth+getGapWidth();
console.log(sliderItem.clientWidth)
const nextButton=document.querySelector('.slideRight');
const previousButton=document.querySelector('.slideLeft');



const petButtons=document.querySelectorAll('.petButton');
const petPopUp=document.querySelector('.petPopUp');
const popUp=document.querySelector('.popUp');
document.querySelector('.closeButton').addEventListener('click', ()=>{popUp.classList.remove('visible'), document.querySelector('.grayBG').classList.remove('visible')})
petButtons.forEach(item=>{
   
    item.addEventListener('click', (event)=>{
        popUp.classList.add('visible');
        document.querySelector('.grayBG').classList.add('visible')
        petPopUp.innerHTML=`    <img src="${pets[event.target.id].img}" alt="${pets[event.target.id].name}" class="petPopupImg">
        <div class="petInfo">
            <div class="petName">${pets[event.target.id].name}</div>
           <h4>${pets[event.target.id].kind}</h4>
            <div class="petDescription">${pets[event.target.id].description}</div>
        </div> `
    });
})

function buttonListener(){
    document.querySelectorAll('.roundButton').forEach(item=>item.classList.remove('disableButton'));
    if(currentSliderPosition===0){
        previousButton.classList.add('disableButton');
        previousButton.removeEventListener('click', slidePrev);
    } else {
        previousButton.addEventListener('click', slidePrev)
    }
    if(currentSliderPosition===-pxToScroll*(8-Math.floor(track.clientWidth/sliderItem.clientWidth))){
        nextButton.classList.add('disableButton');
        nextButton.removeEventListener('click', slideNext)
    } else{
        nextButton.addEventListener('click', slideNext);
    }
}
buttonListener();

function slideNext(){  
    currentSliderPosition=currentSliderPosition-pxToScroll;      
    track.style.transform = `translateX(${currentSliderPosition}px)`;
    buttonListener();
    shownSlide+=1;
}
function slidePrev(){    
    currentSliderPosition=currentSliderPosition+pxToScroll;    
    track.style.transform = `translateX(${currentSliderPosition}px)`;
    buttonListener();
    shownSlide-=1;
}



// document.getElementById('body').addEventListener('click', (event)=>console.log(event.target))