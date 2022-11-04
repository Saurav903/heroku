import { navbar } from './components/navbar.js';
let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar(); 
let options = document.getElementById("options");
options.style.display = "none";

// da2d6c5f76c4b4e7369f3dfb7771ce02

let create_btn = document.getElementById('create_btn');
create_btn.onclick = ()=>{
    createPost();
};

// delete
let delete_btn = document.getElementById("delete_btn");
delete_btn.onclick = ()=>{
    deletePost();
};

// update 
let update_btn = document.getElementById("update_btn");
update_btn.onclick = ()=>{
    updatePost();
};




let inp_image = document.getElementById('image');
inp_image.onchange = ()=>{
    handleImage();
}
let image_url;
const handleImage = async()=>{
    // imgbb will give us url to upload in internet
    let img = document.getElementById('image');
    let actual_img = img.files[0];
    // console.log('img:',actual_img);

    let form = new FormData();
    form.append('image',actual_img);

    let res = await fetch(`https://api.imgbb.com/1/upload?key=da2d6c5f76c4b4e7369f3dfb7771ce02`,{
        method: 'POST',
        body:form,
    });
    let data = await res.json();
    console.log('data',data);
    image_url = data.data.display_url;

};

const createPost = async()=>{
    let id = document.getElementById('id').value;
    let caption = document.getElementById('caption').value;
    let send_this_data = {
        id,
        caption,
        image_url,
    };

    // local server used
    // json-server package
    let res = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        body: JSON.stringify(send_this_data),
        headers: {
            'Content-Type': 'application/json'
        },
        
    });
    let data = await res.json();
    console.log('data', data);
};

const deletePost = async()=>{
    let delete_id = document.getElementById("delete_id").value;
    let res = await fetch(`http://localhost:3000/posts/${delete_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await res.json();
    console.log("data", data);
};

const updatePost = async()=>{
    try{
    let id = document.getElementById('update_id').value;
    let new_caption = document.getElementById("update_caption").value;
    
    let send_this_data = {
        caption:new_caption
    }
    let res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(send_this_data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await res.json();
    console.log("data:", data);
   
    }
    catch(err){
        console.log(err);
    }
};