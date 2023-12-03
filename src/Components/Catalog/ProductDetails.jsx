import React, { useEffect, useState } from 'react';
import './ProductDetails.css'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

   const[posts,setRecords] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/posts")
    .then((response) =>response.json())
    .then((posts)=>setRecords(posts))
    .catch((err) =>console.log(err));
  }, []);


    const [images, setImages] = useState({
        img1 : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4 : "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
    })

    const [activeImg, setActiveImage] = useState(images.img1)
    const params= useParams()

    return (
      
     
      <div className='flex-container'>
      {posts.filter(p=>p.name===params.id).map((prod_det)=>(
      
      <><div className='image-container'>
          <img src={activeImg} alt="" className='product-image' />
          <div className='thumbnail-container'>
            <img src={images.img1} alt="" className='thumbnail' onClick={() => setActiveImage(images.img1)} />
            <img src={images.img2} alt="" className='thumbnail' onClick={() => setActiveImage(images.img2)} />
            <img src={images.img3} alt="" className='thumbnail' onClick={() => setActiveImage(images.img3)} />
            <img src={images.img4} alt="" className='thumbnail' onClick={() => setActiveImage(images.img4)} />
          </div>
        </div><div className='about-container'>

            <h1>{prod_det.name}</h1>


            <p className='product-description'>{prod_det.description}</p>

            <table>
              <thead>
                <tr>
                  <th>Articul</th>
                  <th>Razmer</th>

                </tr>
              </thead>
              <tbody>
              {prod_det.artSizeData.map((ter)=>(
                <tr>
                  <td>{ter.data_art}</td>
                  <td>{ter.size_art}</td>

                </tr>
                ))}
              </tbody>
            </table>

            <div className='video-container'>
              <ReactPlayer
                className="video-player"
                url={prod_det.video_pr}
                controls />
            </div>


            <div id="fileDisplayArea">{prod_det.file_pr}</div>
          </div></>
  ))}
  </div>
  
    )
}

export default ProductDetails;