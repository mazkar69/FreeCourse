const dropdown = document.querySelector(".dropdown");
const dropdown_contant = document.querySelector(".dropdown-content");


dropdown.addEventListener("click",()=>{
    // console.log("clicked")
    dropdown_contant.classList.toggle("hdrop")
})
//Not working this function.
dropdown.addEventListener("blur",()=>{
    console.log("blur event fired");
    dropdown_contant.classList.remove("hdrop");
})



const header = document.querySelector(".header");
const burger = document.querySelector(".burger");

burger.addEventListener("click",()=>{
    header.classList.toggle("active");
})



