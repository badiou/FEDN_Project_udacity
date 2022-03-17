/* Global Variables */

const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const appid='&appid=aa9e528c0ae4dff30a969cc877fa2b3d&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();

let newDate= d.getDate()+'/'+(d.getMonth()+1)+'/'+ d.getFullYear();

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
            postData('/add',{temp:data.main.temp, content:feelings,date:newDate,name:data.name})

        }).then(function(){  
            updateUI();
            //after update the UI i need to set input empty
            empty_input();

        }).catch(function(error){
           
            alert('Zip code or country not valid');
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
          content:data.content,
          name:data.name
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
    const request = await fetch('/all');
    //try{
      const allData = await request.json();

      console.log(allData);
      document.getElementById('country_name').innerHTML = `City:${allData.name}`;
      document.getElementById('date').innerHTML = allData.date
      document.getElementById('temp').innerHTML = `${allData.temp}°F ~ ${convertFtoC(allData.temp)}°C`;
      document.getElementById('content').innerHTML = allData.content;
    
   // }catch(error){
      //console.log("error", error);
    //}
  };

  //function to convert F to Celsuis
  function convertFtoC( temperature){
    return ((temperature-32)*5/9).toFixed(2)
  }

  //fucntion to set input empty
  function empty_input() {
    document.getElementById('zip').value='';
    document.getElementById('country').value='--Select the country--';
    document.getElementById('feelings').value='';

  }