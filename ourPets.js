import pets from "./data/ourPets.js";
const track=document.querySelector('.OP_track')

let itemsPerSlide=function (){
    const vpWidth=window.getComputedStyle(document.querySelector('.mainContainer')).width;
    if (parseInt(vpWidth) >=1280){
        return 8;
    } else if(parseInt(vpWidth) < 1280 && parseInt(vpWidth) >= 768){
        return 6;
    } else {
        return 3;
    }
}

const slidesQuantity=Math.ceil(pets.length/itemsPerSlide());
let firstItemAtSlide=0
let shownSlide=1
for(let slide=1; slide<=slidesQuantity; slide++){
    const div=document.createElement("div");
    div.classList.add('OP_slide');    
    for(let i=firstItemAtSlide; i<firstItemAtSlide+itemsPerSlide(); i++){
        if(i===pets.length) break;
        const sliderItem=document.createElement("div");
        sliderItem.classList.add('OP_petItem');
        sliderItem.innerHTML=  `<img style='width: 100%' src="${pets[i].img}" alt="${pets[i].name}">
        <div class="type">${pets[i].name}</div>
        <button class='petButton' id="${i}">Learn more</button>`;
        div.append(sliderItem);
    }
    firstItemAtSlide+=itemsPerSlide();
    track.append(div)
}
const nextButton=document.querySelector('.next');
const prevButton=document.querySelector('.previous');
const lastButton=document.querySelector('.last');
const firstButton=document.querySelector('.first');
const currentSlide=document.querySelector('.currentSlide');
let currentSliderPosition=0

function showSlideNumber(){
    currentSlide.textContent=shownSlide
}
showSlideNumber()

const sliderWidth=document.querySelector('.OP_slide').clientWidth;

nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPreviouSlide)

function showNextSlide(){
    currentSliderPosition -= sliderWidth;
    track.style.transform = `translateX(${currentSliderPosition}px)`
}
function showPreviouSlide(){
    currentSliderPosition += sliderWidth;
    track.style.transform = `translateX(${currentSliderPosition}px)`
}