//Imports
import {html,render} from './node_modules/lit-html/lit-html.js';

//DOM objects
const submitBtn = document.getElementById('submitBtn');
const showBtn = document.getElementById('showBtn');
const clearBtn = document.getElementById('clearBtn');
const djBtn = document.getElementById("djBtn");
const djControls = document.getElementById("djControls");
const showSection = document.getElementById('showSect');
let inputField = document.querySelector('input');

//To check for possible vowel in the first letter
let vowelArray = ['A','E','I','O','U','a','e','i','o','u'];

//Render Template for List
//-- Li class depends on boolean value of includes method
const guestListTemplate = (data) => html`
<h1 class="title">Invited:</h1>
            <ul id="girlList">
            ${data.map(t=>html`
                <li class=${vowelArray.includes(t[0]) ? 'vowel' : ''}>${t}</li>
            `)}
            </ul>
`;



//Array to store ladies
let guestArray = [];

//Event listeners
submitBtn.addEventListener('click',addGuest);
showBtn.addEventListener('click',updateList);
clearBtn.addEventListener('click',clearData);
djBtn.addEventListener('click',startMusic);

// data -> list
function updateList(event){
    event.preventDefault();
    if(guestArray.length<=0){

        //Custom Alert from Sweet Alert
        swal( "Let me ask a question?" ,  "How to show the guests when none of them are invited? \n\n Check carefully your invite list!" ,  "warning" )

    }else{

        //Sort the names
        let sortedArray = guestArray.sort((a,b)=> a.localeCompare(b));
        const ladies = sortedArray.map(x => x.trim());
        //Call template
        const result = guestListTemplate(ladies);
        //Create element, using template on showSection div
        render(result,showSection);
        showSection.style.display = "block";
        clearBtn.textContent = "End the event";
        showBtn.textContent = "Update guests list";
    }
}

function addGuest (ev){
    let hasNumber = false;

    //Prevent form form reloading the page
    ev.preventDefault();
    const nameArray = inputField.value.split('');

    //Check every letter for possible number
    nameArray.forEach(n=>{

        if(!isNaN(n)&&n!=" "){
            hasNumber = true;
        }
       
    })
    if(inputField.value==''){
        //Custom Alert from Sweet Alert
        swal( "How strange ...?" ,  "The guest must have a name!" ,  "error" )
    }else if(hasNumber==true){
        swal( "Well well ...?" ,  "Lets not use numbers in our guest's name, shall we?" ,  "error" )
    }
    else{
        guestArray.push(inputField.value);
        document.querySelector('input').value = '';
    }
}

function clearData(ev){
    ev.preventDefault();
    if(guestArray.length>0){
        guestArray = [];
        if(clearBtn.textContent=="Clear the list"){
            swal("You cleared the guests list","We still doing the event?", "success");    
        }else{
            swal("You said goodbye to all the guests","It was a good event , indeed !", "success");
        }
        showSection.style.display = "none";
        render('',showSection);
        clearBtn.textContent = "Clear the list";
        djControls.pause();

    }else{
        swal("Something strange happened here...","You tried to say goodbye to noone?", "error");

    }
}

function startMusic(){
    djControls.style.display="block";
    djControls.play();
}

