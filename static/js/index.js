header = document.querySelector(".header");
burger = document.querySelector(".burger");


function drop_hover(x){
    drop_contant=document.getElementById('drop-contant')
    drop_contant.style.display="block"
}
function drop_out(x){
    drop_contant=document.getElementById('drop-contant')
    drop_contant.style.display="none"

}

burger.addEventListener("click",()=>{
    header.classList.toggle("active");
})


