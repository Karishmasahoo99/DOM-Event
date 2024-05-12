async function getUser(){
    const user= await fetch("https://randomuser.me/api");
    const data=await user.json();
    return await data.results[0].name.first+" "+data.results[0].name.last;
};

const add=document.querySelector("#add");
const double=document.querySelector("#double");
const millionare=document.querySelector("#millionare");
const sorted=document.querySelector("#sorted");
const total=document.querySelector("#total");
const info=document.querySelector(".info");

function removeResult(){
    const result=document.querySelector(".info .result");
    if(result!==null){
        result.parentNode.removeChild(result);
    }
}

add.addEventListener("click",async ()=>{
    removeResult();
    const li=document.createElement('li');
    const name=await getUser();
    const wealth=Math.floor(Math.random()*100000 +1)

    const div=document.createElement('div');
    div.classList.add("li-container");

    const head1=document.createElement("p");
    head1.appendChild(document.createTextNode(name))

    const head2=document.createElement("p");
    head2.appendChild(document.createTextNode(wealth))
    head2.classList.add("wealth")

    div.appendChild(head1);
    div.appendChild(head2);

    li.appendChild(div);
    li.classList.add("data")

    info.appendChild(li);

})

double.addEventListener("click",()=>{
   removeResult();
   let items=document.querySelectorAll(".info .data");
   //console.log(items)
   items=Array.from(items).map((item)=>{
    let wealthElement=item.querySelector(".wealth");
    let wealth=parseInt(wealthElement.textContent);
    wealth*=2;
    wealthElement.textContent=wealth;
    return item;
   })
})

millionare.addEventListener("click",()=>{
   removeResult();
   let items=document.querySelectorAll(".info .data");
   //console.log(items)
   let filteredItems=Array.from(items).filter((item)=>{
    let wealthElement=item.querySelector(".wealth");
    let wealth=parseInt(wealthElement.textContent);
    //console.log(wealth, wealth>1000000)
    return wealth > 1000000;
   })

   document.querySelector(".info").innerHTML="";

   filteredItems.forEach((item)=>{
    document.querySelector(".info").appendChild(item)
   })
   
})

sorted.addEventListener("click",()=>{
    removeResult();
    let items=document.querySelectorAll(".info .data");
    //console.log(items)
    let sortedItems=Array.from(items).sort((a,b)=>{
        let wealthA=parseInt(a.querySelector(".wealth").textContent);
        let wealthB=parseInt(b.querySelector(".wealth").textContent);
        return wealthB-wealthA;
    });
 
    document.querySelector(".info").innerHTML="";
 
    sortedItems.forEach((item)=>{
     document.querySelector(".info").appendChild(item)
    })
    //console.log(sortedItems);
 })

 total.addEventListener("click",()=>{
    removeResult();
    let items=document.querySelectorAll(".info .data");
    
    const tot=Array.from(items).reduce((acc,item)=>{
        let wealth=parseInt(item.querySelector(".wealth").textContent);
        return acc+wealth;
    }, 0);

    if(items.length!==0){
        const li=document.createElement('li');

        const div=document.createElement('div');
        div.classList.add("li-container");

        const head1=document.createElement("p");
        head1.appendChild(document.createTextNode("Total Wealth"))

        const head2=document.createElement("p");
        head2.appendChild(document.createTextNode(tot))

        div.appendChild(head1);
        div.appendChild(head2);

        li.appendChild(div);
        li.classList.add("result")

        info.appendChild(li);
    }
 })