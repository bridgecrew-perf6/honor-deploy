import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Scss/Products.scss';
import Img1 from './images/bedroom.png';
import Img2 from './images/chair.png';
import Img3 from './images/sofa.png';
import Img4 from './images/sofa1.png';
import Img5 from './images/prod.png';
import Img6 from './images/prod2.png';
import Img7 from './images/prod3.png';
import { useState } from 'react';
import Slider from 'react-slick';
import SavedProducts from './SavedProducts';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Products = ({dataProducts, dataMenu, dataTip}) => {    

    // categories

    let radio = document.querySelectorAll(".radio")  
    
    for (let i = 0; i < radio.length; i++) {
        radio[0].setAttribute("checked", "true")
    }    

    // tips of products

    const [subTips, setSubTips] = useState(1)

    function changeTips(item){          // categoriyalardan birortasini tanlaganda subCategoriyalar o'zgarishi
        setSubTips(item)
    }

    let tipology = document.querySelectorAll(".tipology")  
    
    for (let i = 0; i < tipology.length; i++) {
        tipology[0].setAttribute("checked", "true")
    }

    // products 

    const [prods, setProds] = useState()

    function changeProducts(item){          // subcategoriyalardan birortasini tanlaganda productlar o'zgarishi
        setProds(item)
    }

    // like algorithms

    const [like, setLike] = useState(false)
    let likesArray = []
    let checkbox = document.querySelectorAll(".checkbox")

    function getLike(){
        setLike(!like)         
    }
    
    checkbox.forEach((c) => {               // like bosilganda localStoragega saqlash (avtomatik tarzda bo'lishi uchun hech qanday funksiya yozilmasdan to'g'ridan-to'g'ri bajarilmoqda)
        if(c.checked && c.id - 1 != likesArray){
            let cgl = {id: c.id-1, like: true}
            likesArray.push(cgl)
        }
        if(likesArray.length > 0){
            localStorage.setItem("like", likesArray.map((p) => p.id))   
        }else{
            localStorage.removeItem("like", likesArray) 
        }
    })    
    
    const [numberLikes, setNumberLikes] = useState(localStorage.getItem("like") ? localStorage.getItem("like").split(',') : 0)    
    
    function unLike(item){                   // likeni qaytarib olish funksiyasi  
        const arr = likesArray.filter((inc) => inc.id != item) 
        localStorage.setItem("like", arr)     
        setNumberLikes(arr.map((c) => c.id))
    }

    window.addEventListener("load", () => {
        setNumberLikes(localStorage.getItem("like") ? localStorage.getItem("like").split(',') : 0)
    })

    // modal

    const [modalData, setModalData] = useState(dataProducts)
    const [modal, setModal] = useState(false)
    const [indexImg, setIndexImg] = useState(0)
    const [indexFile, setIndexFile] = useState(0)

    const img = dataProducts.map((c) => c.image)
    const img1 = dataProducts.map((c) => c.image1)
    const img2 = dataProducts.map((c) => c.image2)
    const img3 = dataProducts.map((c) => c.image3)
    const img4 = dataProducts.map((c) => c.image4)
    const otherImgs = [img, img1, img2, img3, img4]

    const [tour, setTour] = useState(false)
    const color1 = dataProducts.map((c) => c.color1)
    const color2 = dataProducts.map((c) => c.color2)
    const color3 = dataProducts.map((c) => c.color3)
    const colors = [color1, color2, color3]
    const file1 = dataProducts.map((c) => c.file1)
    const file2 = dataProducts.map((c) => c.file2)
    const file3 = dataProducts.map((c) => c.file3)
    const files = [file1, file2, file3]

    function showModal(item, category){         // modalni asosiy ekranda datasi bo'yicha ko'rsatish va datani qiriqish
        setModal(item)
        const newModalData = modalData.filter((post) => post.id === category)
        setModalData(newModalData)
    }

    function closeModal(item){          // modalni asosiy ekranda olib tashlash hamda data tiklash
        setModal(item)        
        setModalData(dataProducts)
    }

    function changeImg(c, e){      // modalning ichidagi rasmlarni o'zgartirish funksiyasi
        setIndexImg(c.indexOf(e))
        setTour(false)
    }

    function changeFile(c, e){      // modalning ichidagi 3D rasmlarni o'zgartirish funksiyasi        
        setIndexFile(c.indexOf(e))
    }

    
    // buy products ----------------------------------------------
    
    const [showBuy, setShowBuy] = useState(false)
    
    function showHandleBuy(item){
        setShowBuy(item)
    }

    function openBuyModal(){
        setModal(false)
        showHandleBuy(true)
    }

    return (
        <>
            <Route path='/products'>
                <div className='Products'>
                    <div className="wrapper row">
                        <div className="col-md-12 menu-catalog d-flex">
                            {dataMenu.map((menu) => {
                                return(
                                    <div className='catalog-menu'>
                                        <input type="radio" className="form-check-input radio" onChange={() => changeTips(menu.id)} name="flexRadioDefault" id={`radio${menu.id+1}`} />
                                        <label htmlFor={`radio${menu.id+1}`}  >
                                            <img src={menu.image} alt="" />
                                        </label>
                                    </div>
                                )
                            })}                    
                        </div>
                        <div className='col-md-12 tip-catalog'>
                            {dataTip.map((tip) => {
                                return(
                                    subTips == tip.category &&
                                    <div className="tip">
                                        <input type="radio" className="form-check-input tipology" name="flexRadioDefault1" onChange={() => changeProducts(tip.id)} id={`tip${tip.id-1}`} />
                                        <label htmlFor={`tip${tip.id-1}`}  >
                                            <p>{tip.name_en}</p>
                                        </label>
                                    </div>
                                )
                            })}                    
                        </div>

                        <div className="products row">                    
                            {dataProducts.map((data, index) => {
                                return(
                                    subTips == data.category && prods == data.sub_category &&
                                    <>
                                        <div className="col-3 prod" >
                                            <div className="body">
                                                <div className="img-list" onClick={() => showModal(true, data.id)}>
                                                    <img src={data.image} alt="" />
                                                </div>
                                                <div className="title">
                                                    <span className="">
                                                        <p>{data.name_en}</p>
                                                        <h4>$ {data.price}</h4>                                
                                                    </span>   
                                                    {numberLikes != 0 && numberLikes.map((item) => {
                                                            return(                                                        
                                                                item == data.id &&
                                                                <input type="checkbox" onChange={() => unLike(data.id)} className='checkbox' id={data.id+1} checked />                                                                                                                                                                                
                                                            )
                                                        })
                                                    }   
                                                    <input type="checkbox" onChange={() => getLike()} className='checkbox' id={data.id+1} />                                            
                                                    <label htmlFor={data.id+1}>                                                
                                                        <i className={`fa fa-heart-o`}></i> 
                                                        <i className={`fa fa-heart`}></i>                                                                                              
                                                    </label>
                                                </div>
                                            </div>
                                        </div>                                
                                    </>
                                )
                            })}
                        </div>
                        {modalData.map((data) => {
                            return(
                                <div className={`one-product col-md-12 ${!modal && "d-none"}`}>
                                    <i className="fa fa-times"  onClick={() => closeModal(false)}></i>
                                    <div className="col-md-6 imgs">
                                        <div className="body row">
                                            {!tour && otherImgs.slice(indexImg, indexImg+1).map((p) => {
                                                return(
                                                    <div className="img-list col-12">
                                                        <div className="body">
                                                            <img src={p} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {tour && files.slice(indexFile, indexFile+1).map((p) => {
                                                return(
                                                    <div className="img-list col-12">
                                                        <div className="body">
                                                            <img src={p} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            })}                                                
                                            {otherImgs.map((p) => {
                                                return(
                                                    <div className="other">
                                                        <div className="body" onClick={() => changeImg(otherImgs, p)}>
                                                            <img src={p} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            })}                                    
                                            <div className="other">
                                                <div className="body" onClick={() => setTour(true)}>
                                                    <p>360 &#176;</p>                                            
                                                </div>                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 texts">
                                        <div className="body">
                                            <h1>$ {data.price}</h1>
                                            <div className="colors">
                                                {colors.map((c) => (
                                                    <button className='cls' style={{backgroundColor: `${c}`}} onClick={() => changeFile(colors, c)}></button>
                                                ))}
                                            </div>
                                            <div className="btns">                                        
                                                <Link className='buy btn' to="/saved">BUY</Link>                                                                                
                                                <button className='save btn'>
                                                    {numberLikes != 0 && numberLikes.map((item) => {
                                                        return(                                                        
                                                            item == data.id &&
                                                            <input type="checkbox" onClick={() => unLike(data.id)} className='checkbox1' id={data.id+1} checked />                                                                                                                                                                                
                                                        )
                                                    })}
                                                    <input type="checkbox" className='checkbox1' id={data.id+1} checked={like} />   
                                                    <label className='modlab' htmlFor={data.id+1} onChange={() => getLike()} >                                                
                                                        SAVE
                                                        <i className={`fa fa-heart-o mx-2`}></i> 
                                                        <i className={`fa fa-heart mx-2`}></i>                                                                                           
                                                    </label>
                                                </button>                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`contrast ${!modal && "d-none"}`} onClick={() => closeModal(false)}></div>                                   
                </div>
            </Route>
            <Route exact path={`/saved`}>
                <SavedProducts likesArray={likesArray} dataMenu={dataMenu} dataProducts={dataProducts} dataTip={dataTip} numberLikes={numberLikes} unLike={unLike} />
            </Route>
            </>
    );
};

export default Products;