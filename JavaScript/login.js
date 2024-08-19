let l=document.getElementsByClassName("UserName")[0];
let r=document.getElementsByClassName("Register")[0];
let b=document.getElementsByClassName("in-btn")[0];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('error')) {
    alert('Wrong email or password');
}
//Shifting Login and Register page
function register(){
    l.style.right="550px";
    r.style.left="0";
    b.style.left="110px";
}
function log(){
    l.style.right="0";
    r.style.left="550px";
    b.style.left="0";
}
