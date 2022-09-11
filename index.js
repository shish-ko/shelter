import pets from "./data/ourPets.js";
const track=document.querySelector('.track');
const startSliderItems=[];
const nextSliderItems=[];

fillSliderItems(startSliderItems);
fillSliderItems(nextSliderItems);

function fillSliderItems(arr){ 
    const i = pets[Math.floor(Math.random() * pets.length)];
    if(startSliderItems.includes(i) || nextSliderItems.includes(i)){
        fillSliderItems(arr)
    } else {
        arr.push(i)
    }    
    if(arr.length<itemsPerSlide()){
        fillSliderItems(arr)  
    }
}


function createDiv(arr){
    const slideDiv=document.createElement("div");
    slideDiv.classList.add('slideDiv');
    for(let item in startSliderItems){       
        const div=document.createElement("div");
        div.classList.add('sliderItem');
        div.innerHTML=`<img style='width: 100%' src="${arr[item].img}" alt="${arr[item].name}">
        <div class="type">${arr[item].name}</div>
        <button class='petButton' id="${pets.indexOf(startSliderItems[item])}">Learn more</button>`;
        slideDiv.append(div);
    }
track.append(slideDiv);

}

function restart(){
    while(track.firstChild){
        track.removeChild(track.firstChild);
    }
    createDiv(nextSliderItems);
    createDiv(startSliderItems);
    createDiv(nextSliderItems);
    pxToScroll=document.querySelector('.slideDiv').clientWidth
    track.style.transform = `translateX(${-pxToScroll}px)`  
    const petButtons=document.querySelectorAll('.petButton');
    petButtons.forEach(item=>{
   
        item.addEventListener('click', (event)=>{
            popUp.classList.add('visible');
            document.querySelector('.grayBG').classList.add('visible');
            petPopUp.innerHTML=`    <img src="${pets[event.target.id].img}" alt="${pets[event.target.id].name}" class="petPopupImg">
            <div class="petInfo">
                <div class="petName">${pets[event.target.id].name}</div>
               <h4>${pets[event.target.id].kind}</h4>
                <div class="petDescription">${pets[event.target.id].description}</div>
            </div> `
        });
    })
}
restart();
var pxToScroll=document.querySelector('.slideDiv').clientWidth;



window.addEventListener('resize', restart);


function itemsPerSlide (){
    const vpWidth=window.getComputedStyle(document.getElementById('body')).width;
    if (parseInt(vpWidth) >=1280){
        return 3;
    } else if(parseInt(vpWidth) < 1280 && parseInt(vpWidth) >= 768){
        return 2;
    } else {    
        return 1;
    }
}


const petPopUp=document.querySelector('.petPopUp');
const popUp=document.querySelector('.popUp');
document.querySelector('.closeButton').addEventListener('click', ()=>{popUp.classList.remove('visible'), document.querySelector('.grayBG').classList.remove('visible')})


const nextButton=document.querySelector('.slideRight');
const previousButton=document.querySelector('.slideLeft');
previousButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);


function slideNext(){   
    track.classList.add('moveNext');
    const vpWidth=window.getComputedStyle(document.querySelector('.slideDiv')).width;
    console.log(vpWidth)
    console.log(pxToScroll)
    track.style.transform = `translateX(${-2*pxToScroll}px)` 
    startSliderItems.length=0;
    startSliderItems.push(...nextSliderItems);
    nextSliderItems.length=0;
    fillSliderItems(nextSliderItems);
    setTimeout(() => {
        track.classList.remove('moveNext')
        restart()
    }, 1000);
}
function slidePrev(){    
    track.classList.add('moveNext');
    track.style.transform = `translateX(0px)` 
    startSliderItems.length=0;
    startSliderItems.push(...nextSliderItems);
    nextSliderItems.length=0;
    fillSliderItems(nextSliderItems);

    setTimeout(() => {
        track.classList.remove('moveNext')
        restart()
    }, 1000);

    

}



// document.getElementById('body').addEventListener('click', (event)=>console.log(event.target))