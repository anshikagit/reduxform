import React,{useState , useEffect} from "react";
import axios from "axios";




function Scroll() {
    const [auth, setAuth] = useState(false);
    
    
    const [more, setMore] = useState([]);
    const limit = 10;
    const [page, setPage] = useState(1);
    
    useEffect(() => {
    
    setAuth(true)
    
    gData(); },[page])


    function gData() {
    axios
    .get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    .then(res => {
    console.log("res", res.data);
    
    setMore([...more,...res.data])
    setAuth(false)
    })
    }
    
    function loadMore() {
    
    setPage(page+1);
    gData();
    
    }
    
    function handleScroll() {
    var bottom= window.innerHeight + document.documentElement.scrollTop !==
    document.documentElement.offsetHeight
    
    
    if (bottom)
    return;
    
    loadMore();
    }
    useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    },[page])

    
    
    return (
    
    <div className="container" >
    <h2 id="head"> INFINITE SCROLL</h2>
    <div className="row r ">
  
    {
    more.map((i) => (
    <div className="card p-4 col-md-3 " >
    <img src={i.img} className="card-img-top" alt={i.name} />
    <div className="card-body">
    <div><b> id:</b> {i.id}</div>
    <div><b> title:</b> {i.title}</div><hr/>
    <div><b> body:</b> {i.body}</div>
    
    </div>
    </div>
    ))}{auth && (
    <div className="loader">
    <h3 id="load">Loading....</h3>
    </div>
    )}
    </div>
    
    
    <button className="btn btn-warning m-2" ><a href="/">reset</a></button>
    
    </div>
    
    )
    }
    
    export default Scroll;