import React, { useEffect, useState ,useRef} from 'react';
import DarkThemeImg from './images/bg-desktop-dark.jpg'
import LightThemeImg from './images/bg-desktop-light.jpg'
import moon from './images/icon-moon.svg'
import sun from './images/icon-sun.svg'
import Container from '@mui/material/Container';
import {Button,  TextField } from '@mui/material';
import  CheckBox  from '@mui/material/Checkbox';

 import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function App() {
   
   //user input
   let [inputText,setInputText]= useState('')
    
  const handleText=(event)=>{
    setInputText(event.target.value);
  }

   //Creating Items(checkbox,textfield,closeButton) using useState
   const [items,setItems]=useState([])

    //After clicking the ADD Button.
  const enteredText=()=>{
   
    if(items.length==8){
      setInputText('')
      alert('Clear completed tasks to add more tasks!')
      return; //if the container reaches its limit ,then go back.
     }
   
   
    if(inputText=='' ){
    alert("Add some Text!")
       return; //if the text is empty ,do nothing.
    }
      console.log(`Entered Text is ${inputText}`)
      //console.table(arr)
      
    //Adding Items to the array.
    const newItem= {
      id: items.length+1,
      checked:false,
      text: inputText
    }
      
    setItems([...items,newItem]) //updating the Items.

    //clear the user input field after adding into the text.
    setInputText('')
      
  }
   

   //handling the checkbox and keeping track of the counter.
   const handleCheckbox = (index) => {
     const updateItems= items.map((item)=>{
        if(item.id===index)
        {
          item.checked=!item.checked;
          if(item.checked){
            setCounter((prevCount)=>prevCount+1)
          }else{
            setCounter((prevCount)=>prevCount-1)
          }

        }
        return item;
     })

     setItems(updateItems)
     
   };
    

 
  //Counts the items that are clicked.
  const [count,setCounter] = useState(0);
   
  

  //clear completed tasks
  const ClearAll=()=>{
  
    const updateItems= items.filter((item)=>!item.checked);
    setItems(updateItems)
    setCounter(0); 
    
  }
  
  // CLEAR CURRENT TEXT FIELD
  const ClearCurrentField=(index)=>{
   
    const updateItems= items.filter((item)=>index!==item.id)
    setItems(updateItems)
    
    //Decrement the count only if the checkbox is true(on).
    const updateCount= items.map((item)=>{
      if(item.id===index){
        if(item.checked){
        setCounter((prevCount)=>prevCount-1)
       
        }
      }
    })
   
  }
   
 
  //used to switch b/w Light  and Dark Theme.
  const [isDarkTheme,setDarkTheme]=useState(false)
   
  //upon clicking the moon icon.
 
  const themeChange=()=>{
    if(!isDarkTheme){
      //changing the background Color 
   
      document.body.style.backgroundColor = 'hsl(235, 21%, 11%)';
      //changing the background image 
      document.body.style.backgroundImage=`url(${DarkThemeImg})`
     }else{
       //changing the background Color 
   
       document.body.style.backgroundColor = 'white';
       //changing the background image 
       document.body.style.backgroundImage=`url(${LightThemeImg})`
     }

     setDarkTheme(!isDarkTheme)
    
   

  }
  
  
  return (
    <div className='App' >   
       
     <h2>T  O  D  O</h2> 
      <img src= {isDarkTheme ? sun : moon } style={{cursor:'pointer'}} onClick={themeChange} alt='Light Mode'/>
      
      {/* Input TEXT FIELD */}
      <div className='firstContain' style={{display:'flex'}}>

        <TextField  style={{
        width:'87%' ,backgroundColor: isDarkTheme ?'hsl(235, 24%, 19%)' : 'white' ,  height:'106%',borderRadius:'5px',
       
        
       }} 
       InputProps={{
        style: {
          color: isDarkTheme ?'white' : 'black',
        },
      }}
     
       placeholder='Create a new todo...'
      value={inputText}
      onChange={handleText}
     ></TextField>
        
      <Button variant='contained' color='success' style={{marginLeft:'7px'}} onClick={enteredText} >Add</Button>
      </div>
      
      {/* CONTAINER FOR TEXT FIELDS */}
       <Container fixed style={{
        display: 'flex',
        flexDirection:'column',
        marginTop:'40px',
        // paddingTop:'20px',
        width: '36%',
        height: '500px',
       backgroundColor: isDarkTheme ?'hsl(235, 24%, 19%)' : 'white',
       border:'1px solid black',
       borderRadius:'10px',
       paddingLeft:'40px',
        position: 'absolute',
        top: '50%',
        left: '49.5%',
        transform: 'translate(-50%, -30%)'
        
      }}  >
      
      {/* TEXT FIELDS */}
   {items.map((item)=>( 
   <div key={item.id} style={{ display: 'flex', alignItems: 'center', 
   backgroundColor: isDarkTheme ?'hsl(235, 24%, 19%)' : 'white', width: '96%' }}>
      <CheckBox
        
        checked={item.checked}
        onChange={()=>handleCheckbox(item.id)}
       
      />
      <TextField 
        style={{
          width: '100%', backgroundColor: isDarkTheme ?'hsl(235, 24%, 19%)' : 'white', height: '55px', borderRadius: '5px', border: 'none',
          textDecoration: item.checked ? 'line-through' : ''  ,
         // borderColor:'white'
        }}
        value={item.text}
        InputProps={{
          style: {
            color: isDarkTheme ?'white' : 'black',
            borderColor:'white'
          },
        }}
       
      />
      <IconButton onClick={()=>ClearCurrentField(item.id)} style={{color:'red'}}>
      <CloseIcon />
    </IconButton>
    </div>
     ))}
 

          {/*altering todo lists*/}    

       {/* // <div style={{display:'flex',flexDirection:'row', alignItems:'flex-end',position:'absolute'}}> */}
       {/* <div style={{position: 'relative', height: '100vh'}}> */}
          <div style={{position: 'absolute', bottom: '0',display:'flex'}}>
           <p style={{
                paddingLeft:'40px' , fontSize:'25px',paddingRight:'370px',
                color:isDarkTheme ?'white' : 'black',
               
           }}>
          {`${count} items left`}
           </p> 


           <Button onClick={ClearAll}   style={{color:'red' , position:''}}>Clear Completed</Button>
         </div>
    {/* </div> */}
        
       {/* //</div> */}
       
      </Container>
     

      
    </div>
    
    
  
      
  );
}

export default App;