import { navbar } from './components/navbar.js';
import {append} from './scripts/append.js';
let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar(); 

let post_div = document.getElementById("posts");

const getData = async()=>{
    let res = await fetch('http://localhost:3000/posts');
    let data = await res.json();
    append(data, post_div);
}
getData();