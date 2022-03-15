/* Global Variables */


let baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
let appid='&appid=aa9e528c0ae4dff30a969cc877fa2b3d';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const btn = document.querySelector('#generate');
btn.addEventListener('click', performAction);

//here i write eprformAction function

function performAction(e){
    //console.log('hello');
    //call getMetheo function and pass the zipcode that the user set in input element
    //exemple zipcode=94040 exemple country=us
  
   const myZipCode=document.getElementById('zip').value;
   //get the country which i have selected
   const myCountry=document.getElementById('country').value;
        getMetheo(baseURL,myZipCode,myCountry,appid);
}

const getMetheo=async(baseURL,zipcode,myCountry, appid)=>{
    
    //concat baseUrl zipcode country and  appid

     let allurl=`${baseURL}${zipcode},${myCountry}${appid}`;
    console.log(allurl);
    const res=await fetch(allurl)
    try
    {
        
        const data=await res.json();
        console.log(data);
        return data;
    }
    catch(error)
    {
        console.log("error",error)

    }
    if(data.cod!='200'){
        console.log(data[0].message);
    }
}