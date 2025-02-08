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
swal({
    content:{
        element:"p",
        attributes:{
            innerText:"ENTER THE MODE OF GAME",
            style:"font-size:3.4vmin;font-weight:bold;color:#274c77",
        },
    },
buttons :{
    btn1:{
       visible:true,
       text:"Vs Computer",
       value:"computer",
    },
    btn2:{
        visible:true,
        text:"Vs Friend",
        value:"multiplayer",
     }
},
closeOnClickOutside: false,
}).then((value)=>{
    if(value=="multiplayer"){
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
                }
                turnO=!turnO;
            })
        });
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
        reset.addEventListener("click",()=>{
            boxes.forEach((box)=>{
                box.innerHTML="";
                box.disabled=false;
                box.classList.remove("button-boom");
            })
            turnO=true;
        }); 
    }
    else{
        let Hwins=0,Cwins=0;
        HumanMove=(box)=>{
            box.innerText="O";
            box.disabled=true;
            if(check()){
                Hwins++;
                if(Hwins==1) swal("Human Wins",`Human Won 1 Game`);
                else swal("Human Wins",`Human Won ${Hwins} Games`);
                disableButtons();
            }else{
                turnC=true;
                setTimeout(computerMove, 500);
            }
        }
        IsOneMoveComp=()=>{
            for(let pat of patterns){
                let val1=boxes[pat[0]].innerText;
                let val2=boxes[pat[1]].innerText;
                let val3=boxes[pat[2]].innerText;
                if(val1=="X" && val2=="X" && val3==""){
                    boxes[pat[2]].innerText="X";
                    return true;
                }else if(val1=="X" && val3=="X" && val2==""){
                    boxes[pat[1]].innerText="X";
                    return true;
                }else if(val2=="X" && val3=="X" && val1==""){
                    boxes[pat[0]].innerText="X";
                    return true;
                }
            }
            return false;
        }
        IsOneMoveHum=()=>{
            for(let pat of patterns){
                let val1=boxes[pat[0]].innerText;
                let val2=boxes[pat[1]].innerText;
                let val3=boxes[pat[2]].innerText;
                if(val1=="O" && val2=="O" && val3==""){
                    boxes[pat[2]].innerText="X";
                    return true;
                }else if(val1=="O" && val3=="O" && val2==""){
                    boxes[pat[1]].innerText="X";
                    return true;
                }else if(val2=="O" && val3=="O" && val1==""){
                    boxes[pat[0]].innerText="X";
                    return true;
                }
            }
            return false;
        }
        randomMove=()=>{
            let arr=[];
            for(let box of boxes){
                if(box.innerText==""){
                    arr.push(box);
                }
            }
            let len=arr.length;
            let ind = Math.floor(Math.random() * len);
            let box=arr[ind];
            box.innerText="X";
        }
        computerMove=()=>{
            turnC=false;
            if(IsOneMoveComp()){
                check();
                Cwins++;
                if(Cwins==1) swal("Computer Wins",`You Were Choked By Computer ${Cwins} Time`);
                else swal("Computer Wins",`You Were Choked By Computer ${Cwins} Times`);
                disableButtons();
                return;
            }
            else if(IsOneMoveHum()){
            }
            else{
                randomMove();
            }
            if(gameFin() && !check()){
                swal("Game Drawn","Try Again");
            }
        }

        check=()=>{
            for(let pat of patterns){
                let val1=boxes[pat[0]].innerText;
                let val2=boxes[pat[1]].innerText;
                let val3=boxes[pat[2]].innerText;
                if(val1==val2 && val2==val3 && val1!=""){
                    boxes[pat[0]].classList.add("button-boom");
                    boxes[pat[1]].classList.add("button-boom");
                    boxes[pat[2]].classList.add("button-boom");
                    return true;
                }
            }
            return false;
        }
    }
       

        reset.addEventListener("click",()=>{
            boxes.forEach((box)=>{
                box.innerHTML="";
                box.disabled=false;
                box.classList.remove("button-boom");

            })
            turnC=true;
            setTimeout(computerMove,300);
        }); 

        let turnC=true;
        setTimeout(computerMove,400);
        boxes.forEach((box)=>{
            box.addEventListener("click",()=>{
                if(!turnC && box.innerText==""){
                    HumanMove(box);
                }
            });
        });

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



