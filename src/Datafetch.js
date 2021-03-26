import React,{useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


function Datafetch(){
   
    var InfiniteScroll = require('react-infinite-scroll-component');
    const [data , setData] =useState([]);
    const apiGet =()=> {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then((response)=> response.json())
        .then((json)=> {
            console.log(json);
            setData(json);
        });
    };
    return(
        <div class ="container">
            API fetching
            <br />
            <button onClick={apiGet}> Click To See API </button>
            <br />
           <pre> {JSON.stringify(data , null , 2)}</pre>
        </div>
    );
}

export default Datafetch;