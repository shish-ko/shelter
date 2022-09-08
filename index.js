import pets from "./data/ourPets.js";
const track=document.querySelector('.track');
for(let item in pets){
    const div=document.createElement("div");
    div.classList.add('sliderItem')
    div.innerHTML=`<img style='width: 100%' src="${pets[item].img}" alt="${pets[item].name}">
    <div class="type">${pets[item].name}</div>
    <button class='petButton' id="${item}">Learn more</button>`;
    track.append(div);
}
const sliderItem=document.querySelector('.sliderItem')
const pxToScroll=sliderItem.clientWidth+((track.clientWidth-3*sliderItem.clientWidth)/2);

const nextButton=document.querySelector('.slideRight');
const previousButton=document.querySelector('.slideLeft');
let currentSliderPosition=0;

slideNext();

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
    if(currentSliderPosition===-pxToScroll*5){
        nextButton.classList.add('disableButton');
        nextButton.removeEventListener('click', slideNext)
    } else{
        nextButton.addEventListener('click', slideNext);
    }
}

function slideNext(){  
    currentSliderPosition=currentSliderPosition-pxToScroll;      
    track.style.transform = `translateX(${currentSliderPosition}px)`;
    buttonListener()
}
function slidePrev(){    
    currentSliderPosition=currentSliderPosition+pxToScroll;    
    track.style.transform = `translateX(${currentSliderPosition}px)`;
    buttonListener()
}



// document.getElementById('body').addEventListener('click', (event)=>console.log(event.target))