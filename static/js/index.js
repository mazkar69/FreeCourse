const dropdown = document.querySelector(".dropdown");
const dropdown_contant = document.querySelector(".dropdown-content");


dropdown.addEventListener("click",()=>{
    // console.log("clicked")
    dropdown_contant.classList.toggle("hdrop")
})
