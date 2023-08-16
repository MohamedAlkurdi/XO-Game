let roles = document.querySelectorAll(".role");
let spots = document.querySelectorAll(".spot");
let h = document.querySelector(".select h3");
let throughLines = document.querySelectorAll(".lineThrough");
let restartBtn = document.querySelector(".restartBtn");
let horizontalTop =document.querySelector(".horizontalTop");
let horizontalMid =document.querySelector(".horizontalMid");
let horizontalBottom =document.querySelector(".horizontalBottom");
let varticalLeft =document.querySelector(".varticalLeft");
let varticalMid =document.querySelector(".varticalMid");
let varticalRight =document.querySelector(".varticalRight");
let diagonalRight =document.querySelector(".diagonalRight");
let diagonalLeft =document.querySelector(".diagonalLeft");
let xWinningTimes = document.querySelector(".xWinningTimes");
let oWinningTimes = document.querySelector(".oWinningTimes");
let storedXWinningTimes = localStorage.getItem("x");
let storedOWinningTimes = localStorage.getItem("o");
let clearScoreBtn = document.querySelector(".clearScoreBtn");

// reset all scores to 0 event
clearScoreBtn.addEventListener("click",function(){
    let x = localStorage.getItem("x");
    let o = localStorage.getItem("o");
    x=0;
    o=0;
    localStorage.setItem("x",x)
    localStorage.setItem("o",o);
    xWinningTimes.innerText=x;
    oWinningTimes.innerText=o;
})

// restart the game event 
restartBtn.addEventListener("click",function(){
    location.reload();
})

// event to close the popup
document.addEventListener("click",function(e){
    let c1 = e.target.classList.contains("fa-x");
    let c2 = e.target.classList.contains("popup");
    let c3 = e.target.classList.contains("noMatches");
    if(c1 || c2 || c3){
        document.querySelector(".noMatches").classList.add("none");
        location.reload();
    }
})

// function to display the popup
function popup(){
document.querySelector(".noMatches").classList.remove("none");
}

// function to clear the over lines that show when a match occurs
function eraseLines(){
    throughLines.forEach(line=>{
    line.classList.add("none");
})
}

// adding an eventlistner for each role button
roles.forEach(function(role){
    role.addEventListener("click",function(e){
// inserting a function that denies the user from selection another role after the first selection
        closeSelection(roles);
        startGame(e.target.innerText);
    })
})

//start game function 
function startGame(parameter){
    fill(parameter);
}

//function to fill the clicked spot 
function fill(parameter){
    //adding an event listner for each spot (square)
    spots.forEach(function(spot){
        spot.addEventListener('click',e=>{
            // checking the value of the passed parameter from higher level function
            if(parameter.toLowerCase()==="x" || parameter.toLowerCase()==="o"){
            clicks = clicksCalculate();
            // if no spot was clicked before , the first click will be the value of role
            if(clicks===0){
            e.target.innerText=parameter;
            }
            //switching between x and o
            else{
                if((clicks%2)===1){
                    e.target.innerText=fillRest(parameter);
                }
                else{
                    e.target.innerText=parameter;
                }
            }
        }
        //identify the clicekd spot as filled
            spot.classList.add("filled");
            spot.dataset.empty="full";
            let therIsAwinner = checkWinner() 
            if(clicks===8){
                if(therIsAwinner){
                }
                else{
                    popup();
                }
            }
    })
})
}

//this function identifies the 
function emptySpots(){
    spots.forEach(spot=>{
        spot.dataset.empty="empty";
    })
}

// function to prevent any click click after the first click
function closeSelection(collection){
    collection.forEach(function(e){
        e.classList.add("filled");
    })
}

//function to count the clicks on the board (the first click only)
function clicksCalculate(){
    let number=0;
    spots.forEach(spot=>{
        if(spot.classList.contains("filled")){
            number++;
        }
    })
    return number;
}

// this function returns an opposite symbol of the current symbol (x=>o or o=>x)
function fillRest(parameter){
    if(parameter.toLowerCase()==="x"){
        return "O";
    }
    else{
        return "X"
    }
} 

// function to check if there is a winner yet
function checkWinner(){
    let done = false;
    eraseLines();
    let index0 = 0; 
    let index1 = 1;
    let index2 = 2;
    let index3 = 3; 
    let index4 = 4;
    let index6 = 6;
    let index8 = 8;
    if(compareRows(index0)){
        if(spots[index0].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".horizontalTop").classList.remove("none");
        endGame(spots[index0].innerText.toUpperCase());
        done=true;
    }else{}
    }
     if(compareRows(index3)){
        if(spots[index3].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".horizontalMid").classList.remove("none");
        endGame(spots[index3].innerText.toUpperCase());
        done=true;
    }else {};
    }
     if(compareRows(index6)){
        if(spots[index6].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".horizontalBottom").classList.remove("none");
        endGame(spots[index6].innerText.toUpperCase())
        done=true;
    }else {}
    }
    if(compareCols(index0)){
        if(spots[index0].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".varticalLeft").classList.remove("none");
        endGame(spots[index0].innerText.toUpperCase())
        done=true;
    }else{}
    }
     if(compareCols(index1)){
        if(spots[index1].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".varticalMid").classList.remove("none");
        endGame(spots[index1].innerText.toUpperCase())
        done=true;
    }else {};
    }
     if(compareCols(index2)){
        if(spots[index2].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".varticalRight").classList.remove("none");
        endGame(spots[index2].innerText.toUpperCase())
        done=true;
    }else {}
    }
    if(compareDiagonalLeft(index0)){
        if(spots[index4].dataset.empty==="full" || spots[index8].dataset.empty==="full" ){
        closeSelection(spots);
        document.querySelector(".diagonalLeft").classList.remove("none");
        endGame(spots[index0].innerText.toUpperCase())
        done=true;
    }else {}
    }
    if(compareDiagonalRight(index2)){
        if(spots[index2].dataset.empty==="full"){
        closeSelection(spots);
        document.querySelector(".diagonalRight").classList.remove("none");
        endGame(spots[index2].innerText.toUpperCase())
        done=true;
    }else {}
    }
    if(done){
    emptySpots();
    }
    return done;
}

// function to compare the squares on the same row
function compareRows(x){
    return (spots[x].innerText===spots[x+1].innerText && spots[x+1].innerText===spots[x+2].innerText);
}

// function to compare the squares on the same column
function compareCols(x){
    return (spots[x].innerText===spots[x+3].innerText && spots[x+3].innerText===spots[x+6].innerText);
}

function compareDiagonalLeft(x){
    return (spots[x].innerText===spots[x+4].innerText && spots[x+4].innerText===spots[x+8].innerText);
}
function compareDiagonalRight(x){
    return (spots[x].innerText===spots[x+2].innerText && spots[x+2].innerText===spots[x+4].innerText);
}


// function to end the game
function endGame(content){
    roles.forEach(role=>{
        if(role.innerText === content){
            role.classList.add("green");
            console.log(true)
            if(content.toLowerCase()==="x"){
                storedXWinningTimes++;
                localStorage.setItem("x",storedXWinningTimes);
                xWinningTimes.innerText=storedXWinningTimes;
            }
            else{
                storedOWinningTimes++;
                localStorage.setItem("o",storedOWinningTimes);
                oWinningTimes.innerText=storedOWinningTimes;
            }
        }
    })
}

// extracting the stored values in the local storage and displyign them
xWinningTimes.innerText=storedXWinningTimes;
oWinningTimes.innerText=storedOWinningTimes;
