import React, { useState } from 'react';
import './Scss/Navbar.scss';
import { Link } from 'react-router-dom';
import Img1 from './images/logo.png'
import { useTranslation } from 'react-i18next';
import { Language, Translate } from '@material-ui/icons';

const NavbarCopy = ({ white, english, uzbek, russian, change1, change2, change3, langTitle }) => {

    window.addEventListener("scroll", function () {
        let navScroll = document.getElementById('nav');
        if (white) {
            navScroll.classList.toggle("white", window.scrollY > 10);
        } else if (!white) {
            navScroll.classList.toggle("black", window.scrollY > 10);
        }
    });

    const [show, setShow] = useState(false)

    const [language, setLanguage] = useState(false)
        
    function changeHandle1(){        
        change1(true)
        setLanguage(!language)
      }
      function changeHandle2(){
        change2(true)
        setLanguage(!language)
      }
      function changeHandle3(){
        change3(true)
        setLanguage(!language)
      }           

      const {t} = useTranslation()

    return (
        <>
            <div id={`nav`} className={`Navbar`}>
                <nav className="navbar navbar-expand justify-content-between align-items-center">
                    <div className="navbar-brand portfolio">
                        <Link className="nav-link text-dark" style={{fontWeight: "800"}} to="/"><h1>HONOR</h1></Link>
                    </div>                    
                    <ul className={`navbar-nav ${show && "show"}`}>                           
                        <li className='nav-item'>
                            <a href="/#spinner" className='nav-link'>Home page</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/#products" className="nav-link">Contacts</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/#blogs" className="nav-link">All Production</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/#contacts" className="nav-link">Terms and Conditions</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/#contacts" className="nav-link">Delivery</a>
                        </li>
                        <li className='nav-item'>
                            <a href="/#contacts" className="nav-link">Hot Sales</a>
                        </li>
                        <li className='nav-item heartly'>
                            <i className='fa fa-heart-o'></i>
                            <a href='tel:+998955555555' className='call nav-link'>
                                <i className='fa fa-phone'></i>
                                <p>+998 95  555 55 55 <br/> Bepul konsultatsiya</p>
                            </a>
                        </li>
                        <i className="fa fa-times" onClick={() => setShow(false)}></i>
                    </ul>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="language d-flex align-items-center justify-content-between">
                            {english && 
                                <div className={`change-language`}>
                                    <input type="checkbox" id="language" checked={language} onChange={() => setLanguage(!language)} />
                                    <label htmlFor='language'>{langTitle}</label>
                                    <ul className={`language-menu ${!language && "d-none"}`}>
                                        <li onClick={() => changeHandle1()}><a><a className='nav-link'>RU</a></a></li>
                                        <li onClick={() => changeHandle2()}><a><a className='nav-link'>ENG</a></a></li>
                                        <li onClick={() => changeHandle3()}><a><a className='nav-link'>UZ</a></a></li>                                                                          
                                    </ul> 
                                </div>
                            }
                            {russian && 
                                <div className={`change-language`}>
                                    <input type="checkbox" id="language" checked={language} onChange={() => setLanguage(!language)} />
                                    <label htmlFor='language'>{langTitle}</label>
                                    <ul className={`language-menu ${!language && "d-none"}`}>
                                        <li onClick={() => changeHandle1()}><a><a className='nav-link'>РУ</a></a></li>
                                        <li onClick={() => changeHandle2()}><a><a className='nav-link'>АНГ</a></a></li>
                                        <li onClick={() => changeHandle3()}><a><a className='nav-link'>УЗ</a></a></li>                                                                            
                                    </ul> 
                                </div>
                            }
                            {uzbek && 
                                <div className={`change-language`}>
                                    <input type="checkbox" id="language" checked={language} onChange={() => setLanguage(!language)} />
                                    <label htmlFor='language'>{langTitle}</label>
                                    <ul className={`language-menu ${!language && "d-none"}`}>
                                        <li onClick={() => changeHandle1()}><a><a className='nav-link'>RU</a></a></li>
                                        <li onClick={() => changeHandle2()}><a><a className='nav-link'>ING</a></a></li>
                                        <li onClick={() => changeHandle3()}><a><a className='nav-link'>O'Z</a></a></li>                                                                           
                                    </ul> 
                                </div>
                            }                                                                                
                             <i className={`fa fa-bars`} onClick={() => setShow(true)}></i>
                        </div>                        
                    </div>
                </nav>
            </div>
        </>
    );
};

export default NavbarCopy;