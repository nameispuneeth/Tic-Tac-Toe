
let boxes=document.querySelectorAll(".btn");
let reset=document.querySelector("#reset");
let patterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let Owins=0,Xwins=0;
let turnO=true;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML="O";
        }else{
            box.innerHTML="X";
        }
        box.disabled=true;
        let ansFound=check();
        if (ansFound) {
            disableButtons();
        }
        if(gameFin() && !ansFound){
            swal("Game Drawn","Try Again");
            disableButtons();
        }
        turnO=!turnO;
    })
});

reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerHTML="";
        box.disabled=false;
        box.classList.remove("button-boom");
    })
    turnO=true;
});


let gameFin=()=>{
    let fin=true;
    boxes.forEach((box)=>{
        if(box.innerHTML=="") fin=false;
    });
    return fin; 
}

let disableButtons=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
    turnO=true;
}
let check=()=>{
    for(let pat of patterns){
        let val1=boxes[pat[0]].innerText;
        let val2=boxes[pat[1]].innerText;
        let val3=boxes[pat[2]].innerText;
        if(val1!=""  &&  val2!="" && val3!=""){
            if(val1===val2 && val2===val3){
                boxes[pat[0]].classList.add("button-boom");
                boxes[pat[1]].classList.add("button-boom");
                boxes[pat[2]].classList.add("button-boom");
                if(val1=="X"){
                    Xwins++;
                    if(Xwins==1) swal("Player X Wins",`Player X Won ${Xwins} Game`);
                    else swal("Player X Wins",`Player X Won ${Xwins} Games`);
                }else{
                    Owins++;
                    if(Owins==1) swal("Player O Wins",`Player O Won ${Owins} Game`);
                    else swal("Player O Wins",`Player O Won ${Owins} Games`);
                }
                return true;
            }
        } 
    }
    return false;
}
