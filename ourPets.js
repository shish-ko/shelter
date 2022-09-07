import pets from "./data/ourPets.js";
const track=document.querySelector('.OP_track')

function itemsPerSlide (){
    const vpWidth=window.getComputedStyle(document.querySelector('.mainContainer')).width;
    if (parseInt(vpWidth) >=1280){
        return 8;
    } else if(parseInt(vpWidth) < 1280 && parseInt(vpWidth) >= 768){
        return 6;
    } else {
        return 3;
    }
}

window.addEventListener('resize', starter);

function starter(){
    slidesQuantity=Math.ceil(pets.length/itemsPerSlide());
    firstItemAtSlide=0;
    sliderConstructer();
    sliderWidth=document.querySelector('.OP_slide').clientWidth;    
    if(shownSlide <= slidesQuantity){
     currentSliderPosition = -sliderWidth*(shownSlide-1);   
    } else{
        currentSliderPosition=0;
        shownSlide=1
    }
    showSlideNumber();
    track.style.transform = `translateX(${currentSliderPosition}px)`
}

let slidesQuantity=Math.ceil(pets.length/itemsPerSlide());
let firstItemAtSlide=0
let shownSlide=1
function sliderConstructer(){
    while(track.firstChild){
        track.removeChild(track.firstChild);
    }
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
        track.append(div);
    }
}
sliderConstructer()

const nextButton=document.querySelector('.next');
const prevButton=document.querySelector('.previous');
const lastButton=document.querySelector('.last');
const firstButton=document.querySelector('.first');
const currentSlide=document.querySelector('.currentSlide');
let currentSliderPosition=0;

function showSlideNumber(){
    currentSlide.textContent=shownSlide;
    document.querySelectorAll('.roundButton').forEach(item=>item.classList.remove('disableButton'));
    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPreviouSlide);
    lastButton.addEventListener('click', showLastSlide);
    firstButton.addEventListener('click', showFirstSlide);
    if(shownSlide===1){
        prevButton.removeEventListener('click', showPreviouSlide);
        firstButton.removeEventListener('click', showFirstSlide);
        prevButton.classList.add('disableButton');
        firstButton.classList.add('disableButton')
    }
    if(shownSlide===slidesQuantity){
        nextButton.removeEventListener('click', showNextSlide);
        lastButton.removeEventListener('click', showLastSlide);
        nextButton.classList.add('disableButton');
        lastButton.classList.add('disableButton');
    }
}
showSlideNumber()

let sliderWidth=document.querySelector('.OP_slide').clientWidth;



function showNextSlide(){
    currentSliderPosition -= sliderWidth;
    shownSlide+=1;
    showSlideNumber();
    track.style.transform = `translateX(${currentSliderPosition}px)`
}
function showPreviouSlide(){
    currentSliderPosition += sliderWidth;
    shownSlide-=1;
    showSlideNumber();
    track.style.transform = `translateX(${currentSliderPosition}px)`
}
function showFirstSlide(){
    currentSliderPosition=0
    shownSlide=1;
    showSlideNumber();
    track.style.transform = `translateX(${currentSliderPosition}px)`
}
function showLastSlide(){
    currentSliderPosition=-sliderWidth * (slidesQuantity-1);
    shownSlide=slidesQuantity;
    showSlideNumber();
    track.style.transform = `translateX(${currentSliderPosition}px)`
}