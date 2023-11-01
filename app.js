const cells = document.querySelectorAll('.each')
const btn = document.querySelector('.btn')
const startBtn = document.querySelector('.start')
const result = document.querySelector('.result')
const conditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let name1
let name2
let wins = []
let options = ["","","","","","","","",""]
let current = "X"
let running = false
askNames()
function askNames(){
    name1 = prompt("enter first player name")
    while(name1.trim().length===0){
        name1 = prompt("dont mess with me enter the name")
    }
    name2 = prompt("enter second player name")
    while(!name2){
        name2 = prompt("dont mess with me enter the name")
    }  
}
function initializeApp(){
    
    cells.forEach(cell=>{
        cell.addEventListener('click',click)
    })
    btn.addEventListener('click',restart)
    result.innerHTML = `${current==="X"?name1:name2} is playing guys`
    running = true 

}
startBtn.addEventListener('click',initializeApp)
function  popup(winner){
    setTimeout(()=>alert(`${winner} has won the game`),500)
}
function click(){
    const no = this.getAttribute('cellNo')
    if(options[no]!= "" || !running){
        return
    }
    upDate(this,no)
    checkWinner()
}
function upDate(cell,index){
    options[index]= current
    cell.textContent = current 
}
function Switch(){
    current = (current === "X")?"O":"X"
    result.textContent = `${current==="X"?name1:name2} is playing guys`
}
function checkWinner(){
    let won = false
    for(let i=0;i<conditions.length;i++){
        const row = conditions[i];
        const cellA = options[row[0]];
        const cellB = options[row[1]];
        const cellC = options[row[2]];
        if(cellA === "" || cellB === "" || cellC === "")continue
        if(cellA === cellB && cellB === cellC){
            won = true
            break
        }   
    }
    if(won){
        result.innerHTML = `${current==="X"?name1:name2} has won the game guys`
        running = false
        popup(current==="X"?name1:name2)
        current === "X"?wins.push(name1):wins.push(name2)
    }
    else if(!options.includes("")){
        result.innerHTML = `The Match is Draw Guys`
        running = false
    }else{
        Switch()
    }
    
}
function restart(){
    current ="X"
         options = ["","","","","","","","",""]
    result.innerHTML= `${current==="X"?name1:name2} is playing guys`
    cells.forEach(cell=>cell.innerHTML="")
    running = true
}