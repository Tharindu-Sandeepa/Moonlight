import {React,useEffect,useState}  from 'react'
//import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/all'
import { Link } from 'react-router-dom';

const Slider = () => {
     const SliderData = [
      {
        title: 'Exquisite Gemstones',
        subtitle: 'Discover the finest gemstones.'
    },
    {
        title: 'Elegant Jewelry Pieces',
        subtitle: 'Adorn yourself with timeless elegance.'
    },
    {
        title: 'Luxurious Diamonds',
        subtitle: 'Sparkle with the brilliance of diamonds.'
    },
    {
        title: 'Celebrate Life  Moments',
        subtitle: 'Find the perfect piece for every occasion.'
    }
      ];
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;
    const [auto,setauto] = useState(true);
    const intervaltime = 6000;
    let slideinterval;
    const nextslide = () =>{
        clearInterval(slideinterval);
        slideinterval = setInterval(nextslide,intervaltime);
        setTimeout(()=>setCurrent(current === length - 1 ? 0 : current + 1))
 
    }
    const prevslide = () =>{
        clearInterval(slideinterval);
        slideinterval = setInterval(nextslide,intervaltime);
        setTimeout(()=>setCurrent(current === 0 ? length - 1 : current - 1))         
   }
   useEffect(()=>{
     setauto(true)
    if(auto){
      slideinterval = setInterval(nextslide,intervaltime);
      }
    return ()=>{ 
      setauto(false);
      clearInterval(slideinterval);
    }
   })
 
    return (
        <div className = 'slider'>
            {SliderData.map((slide,index) =>{
                return(
                    <div key = {index} className={index === current ? 'slide current' : 'slide'}>
                    <h1 className = 'titleslider'>{slide.title}</h1>
                    <h3 className = 'subtitleslider'>{slide.subtitle}</h3>
                    <div className = 'content'> <Link to= '/jewllery-grid'> <button className="ShopNow">
                SHOP NOW
                </button></Link>  </div>
                    </div>
                );
 
            })}
          
        </div>
    )
}
 
export default Slider