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
    e.preventDefault();
    //console.log('hello');
    //call getMetheo function and pass the zipcode that the user set in input element
    //exemple zipcode=94040 exemple country=us
  
   const myZipCode=document.getElementById('zip').value;
   //get the country which i have selected
   const myCountry=document.getElementById('country').value;
   
        getMetheo(baseURL,myZipCode,myCountry,appid)
        .then((data)=>{
            const feelings=document.getElementById('feelings').value;
            console.log(`Data i send for the post request: ${data}`);
            //here i use the temp value from the location.
            postData('/add',{temp:data.main.temp, content:feelings,date:newDate})

        }).then(function(){  
            updateUI();

        }).catch(function(error){
           
            alert('Zipcode or country not valid');
        });
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
    
};

// POST REQUEST
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // parse Json data to string
      body: JSON.stringify({
          temp:data.temp,
          date:data.date,
          content:data.content
      }) 
    });
  
      try 
      {
       
        const newData = await response.json();
        return newData;
      }
      catch(error) 
      {
      console.log("error", error);
      }
  };



  const updateUI = async () => {
    const request = await fetch('/');
    //try{
      const allData = await request.json();
        console.log(allData);
      document.getElementById('date').innerHTML = allData.date
      document.getElementById('temp').innerHTML = allData.temp
      document.getElementById('content').innerHTML = allData.content;
    
   // }catch(error){
      //console.log("error", error);
    //}
  };