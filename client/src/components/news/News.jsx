import React,{useState,useEffect} from 'react';
import './News.css';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { ScaleLoader } from 'react-spinners';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    loading:{
        marginTop:'20px'
    }
}));
const News = () => {
    const [news,setNews]=useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const fetchNews=async()=>{
        const res=await axios.get("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=8fd01a4f3a194a38bc2757ad932dcd09")
        .then((res)=>setNews(res.data.articles))
        .catch((err)=>console.log(err));
    }
    useEffect(()=>{
        fetchNews();
        setLoading(false);
    },[])
    return (
        <div className="news-container">
            <div className="news-wrapper">
                <div className="news-heading">Breaking News</div>
                {/* <Fade in={loading} style={{ transitionDelay: loading ? '800ms' : '0ms', }} unmountOnExit>
                    <CircularProgress />
                </Fade> */}
                <div className="news-box">
                    {news.map(n=>(
                        <a href={n.url} target="_blank" className="news-link" key={n.url} >
                            <div className="news-single" >
                        <span className="news-title">{n.title} :-</span>
                        <span className="news-content">{n.description}</span>
                    </div></a>  
                    ))}
                    
                </div>
            </div>
            
        </div>
    )
}

export default News
