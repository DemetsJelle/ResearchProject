import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
//import { Routes, Route, Link, useParams,  } from "react-router-dom";

import './App.css';
import API from './utils/api'
import {winkelMandContext} from './store/winkelmand'

import DetailProduct from './routes/detailsProduct'
import ShoppingCart from './routes/shoppingCart';
import Wishlist from './routes/wishlist';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// import { useSpeechSynthesis } from 'react-speech-kit'


export const commandsListHome = [
  {
    doel:'filter',
    voorbeeld:["zoek 'boxy ski jas'"],
    uitleg: "Zoeken naar boxy ski jas"
  },
  {
    doel:'filter',
    voorbeeld:['selecteer "merk"',' selecteer "Protest"'],
    uitleg: "Zoeken op merk naar alles van Protest"
  },
  {
   
    doel:'filter',
    voorbeeld:['zoek "jassen" van "Protest"','vind "jassen" van "Protest"'],
    uitleg: "Jassen tonen van het merk Protest"
  },
  {
    doel:'filter',
    voorbeeld:["reset","clear","leeg",'maak filters leeg'],
    uitleg: "Filters weghalen"
  },
  {
    doel: "info",
    voorbeeld:['selecteer "boxi ski jas"'],
    uitleg: "'boxi ski jas' selecteren"
  },
  {
    doel: "verlanglijst",
    voorbeeld:['voeg "lenado ski jas" toe aan verlanglijst','verlanglijst "lenado ski jas"','plaats "lenado ski jas" in verlanglijst','voeg "lenado ski jas" toe aan verlanglijst'],
    uitleg: "'lenado ski jas aan verlanglijst toevoegen"
  },
  {
    doel: "afrekenen",
    voorbeeld:["voeg 'lenado ski jas' toe aan winkelmand",'winkelmand "lenado ski jas"','plaats "lenado ski jas" in winkelmand','voeg "lenado ski jas" toe aan winkelmand'],
    uitleg: "'lenado ski jas aan winkelmand toevoegen toevoegen"
  },
  {
    doel:"afrekenen",
    voorbeeld:["afrekenen"],
    uitleg: "doorgaan naar betalen"
  }
]


function App() {
  const [allBrands, setBrands] = useState<any[]>([]);
  const [allCategories, setCategories] = useState<any[]>([]);
  const [allGenders, setGenders] = useState<any[]>([]);
  const [allProducts, setProducts] = useState<any[]>([]);

  const [catValue, setCatValue] = useState('');
  const [brandValue, setBrandValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredData, setFilteredData] = useState<any[]>();

  const[latestCommando, setLatestCommando] = useState<any>()

  const [micState, setMicState] = useState<boolean>(false)
  const [showTranscript, setshowTranscript] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<boolean>(false)

  useEffect(() => {
    getAllData();
  },[])

  const getAllData = async () => {
    try{
      let brands:any = await API.get('brand/all')
      let categories:any = await API.get('category/all')
      let genders:any = await API.get('product/all/genders')
      let products:any = await API.get('product/all')

      setProducts(products)
      setBrands(brands)
      setCategories(categories)
      setGenders(genders)
      setFilteredData(products)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setFilteredData(textFilter())
  },[searchTerm])

  const textFilter = () => {
    if(searchTerm == '')
      return allProducts
    else{
      const filteredData = allProducts.filter(function(eachItem){
        return eachItem['Name'].toLowerCase().includes(searchTerm.toLowerCase())
      })
      return(filteredData)
    }
  }

  useEffect(() => {
    dropdownFilter()
  }, [catValue, brandValue, genderValue])

  const dropdownFilter = () => {
    // console.log(`BrandValue: ${brandValue}`)
    // console.log(`CatValue: ${catValue}`)
    // console.log(`GenValue: ${genderValue}`)
    //Enkel categorie
    if(catValue !== '' && brandValue === '' && genderValue === '')
      setFilteredData(allProducts.filter(p => p.Category.CategoryId === catValue)) 

    //Enkel brand
    else if(catValue === '' && brandValue !== '' && genderValue === '')
      setFilteredData(allProducts.filter(p => p.Brand.BrandId === brandValue))
    
    //Enkel gender
    else if(catValue === '' && brandValue === '' && genderValue !== '')
      setFilteredData(allProducts.filter(p => p.Gender === genderValue))

    //Categorie en brand
    else if (catValue !== '' && brandValue !== '' && genderValue === ''){
      const filter1 = allProducts.filter(p => p.Category.CategoryId === catValue)
      setFilteredData(filter1.filter(p => p.Brand.BrandId === brandValue))
    }
    //Categorie en gender
    else if (catValue !== '' && brandValue === '' && genderValue !== ''){
      const filter1 = allProducts.filter(p => p.Category.CategoryId === catValue)
      setFilteredData(filter1.filter(p => p.Gender === genderValue))
    }
    //Brand en gender
    else if (catValue === '' && brandValue !== '' && genderValue !== ''){
      const filter1= allProducts.filter(p => p.Brand.BrandId === brandValue)
      setFilteredData(filter1.filter(p => p.Gender === genderValue))
    }
    //Alles
    else if (catValue !== '' && brandValue !== '' && genderValue !== ''){
      const filter1 = allProducts.filter(p => p.Category.CategoryId === catValue)
      const filter2 = filter1.filter(p => p.Brand.BrandId === brandValue)
      setFilteredData(filter2.filter(p => p.Gender === genderValue))
    }
    //Geen filters
    else{
      setFilteredData(allProducts)
    }

    //console.log(filteredData)
  }

  const getSearchTerm = (event: ChangeEvent<HTMLInputElement>) =>{
    setSearchTerm(event.target.value);
  }

  const getBrandValue = (event: ChangeEvent<HTMLSelectElement>) =>{
    setBrandValue(event.target.value);
  }

  const getCatValue = (event: ChangeEvent<HTMLSelectElement>) =>{
    setCatValue(event.target.value);
  }

  const getGenderValue = (event: ChangeEvent<HTMLSelectElement>) =>{
    setGenderValue(event.target.value);
  }

  const commands = [
    {
      command: ['search *','zoek *'],
      callback: (searchTerm:any) => {setSearchTerm(searchTerm); setLatestCommando(`Zoekresultaten met: ${searchTerm}`);},
      doel:'filter',
      voorbeeld:["zoek 'boxy ski jas'","search 'boxy ski jas'"],
      uitleg: "Zoeken naar boxy ski jas"
    },
    {
      command: ['selecteer :x (en) selecteer (daarna) :value'],
      callback: (x:any, value:any) => {setIsLoading(!isLoading); openDropdown(x,value); setLatestCommando(`Gesorteert op ${x} ${value}`)},
      doel:'filter',
      voorbeeld:["selecteer 'merk', selecteer 'Protest'"],
      uitleg: "Zoeken op merk naar alles van Protest"
    },
    {
      command: ['zoek :cat (van) :merk','vind :cat (van) :merk'],
      callback: (cat:any, merk:any) => {quickSearch(cat, merk); setLatestCommando(`Gesorteert op ${cat} ${merk}`)},
      doel:'filter',
      voorbeeld:["zoek 'jassen' van 'Protest'","vind 'jassen' van 'Protest'"],
      uitleg: "Jassen tonen van het merk Protest"
    },
    {
      command: ['reset (filters)','clear (filters)','leeg (filters)','maak filters leeg',],
      callback: (x:any) => {clearFilters(); setLatestCommando(`Filters verwijderd`)},
      doel:'filter',
      voorbeeld:["reset","clear","leeg",'maak filters leeg'],
      uitleg: "Filters weghalen"
    },
    {
      command:['selecteer *'],
      callback: (x:any) => {navigateToDetailVoice(x)},
      doel: "info",
      voorbeeld:["selecteer 'boxi ski jas'"],
      uitleg: "'boxi ski jas' selecteren"
    },
    {
      command:['voeg * toe aan verlanglijst(je)','add * to wishlist','verlanglijst(je) *','* verlanglijst','plaats * op verlanglijst','voeg * toe aan verlanglijst'],
      callback: (x:any) => {addToWishlist(x)},
      doel: "verlanglijst",
      voorbeeld:["voeg 'lenado ski jas' toe aan verlanglijst"],
      uitleg: "'lenado ski jas aan verlanglijst toevoegen"
    },
    {
      command:['voeg * toe aan winkelmand','add * to shoppinglist','winkelmand *','* winkelmand','plaats * op winkelmand','voeg * toe aan winkelmand'],
      callback: (x:any) => {addToShoppingList(x)},
      doel: "afrekenen",
      voorbeeld:["voeg 'lenado ski jas' toe aan winkelmand"],
      uitleg: "'lenado ski jas aan winkelmand toevoegen toevoegen"
    },
    {
      command:'afrekenen',
      callback:() => {navigateToCheckOut()},
      doel:"afrekenen",
      voorbeeld:["afrekenen"],
      uitleg: "doorgaan naar betalen"
    }
  ]

  const clearFilters = () => {
    setIsLoading(false);
    setCatValue('')
    setBrandValue('')
    setGenderValue('')
    setSearchTerm('')
    checkTranscript(transcript)
  }

  const quickSearch =(cat:any, merk:any) => {
    setIsLoading(false)
    // console.log(cat)
    // console.log(merk)
    allCategories.forEach((e) => {
      if(e.Name.toLowerCase() === cat.toLowerCase()){
        setCatValue(e.CategoryId)
      }
    })

    allBrands.forEach((e) => {
      if(e.Name.toLowerCase() === merk.toLowerCase()){
        setBrandValue(e.BrandId)
      }
    })
    checkTranscript(transcript)
  }

  const openDropdown = (dropdown:any, value:any) => {
    setIsLoading(false)
    switch(dropdown){
      case 'merk':
        //OPEN MERKDROPDOWN
        allBrands.forEach((e) => {
          if(e.Name.toLowerCase() === value.toLowerCase()){
            setBrandValue(e.BrandId)
          }
        })
        break;
      case 'categorie':
        //OPEN CategoryDROPDOWN
        allCategories.forEach((e) => {
          if(e.Name.toLowerCase() === value.toLowerCase()){
            setCatValue(e.CategoryId)
          }
        })
        break;
      case 'geslacht':
        //OPEN GeslachtDROPDOWN
        allGenders.forEach((e) => {
          if(e.Gender.toLowerCase() === value.toLowerCase()){
            setGenderValue(e.Gender)
          }
        })
        break;
    }
  }

  const checkTranscript = (prevTranscript:string) => {
    resetTranscript()
    console.log(`prev: ${prevTranscript}`)
    console.log(`new: ${transcript}`)

    if(prevTranscript === transcript) {
      console.log('hier')
      setIsLoading(true)
    }
  }

  const openInfo = () => {
    setShowInfo(!showInfo)
  }

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, interimTranscript } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    //setIsLoading(true)
    setMicState(!micState)
    setshowTranscript(!showTranscript)

    if(micState === true)
      SpeechRecognition.stopListening();
      
    else if(micState === false)
      SpeechRecognition.startListening({continuous: true});
      setIsLoading(true);

    resetTranscript()
  }

  const navigateToDetailVoice = (spokenText:string) => {
    const filteredData = allProducts.filter(function(eachItem){
      return eachItem['Name'].toLowerCase().includes(spokenText.toLowerCase())
    })
      
    window.location.href=`/detailsProduct/${filteredData[0].ProductId}`
  }

  const navigateToDetailUI = (id:string) => {  
    window.location.href=`/detailsProduct/${id}`
  }

  const navigateToCheckOut = () => {
    window.location.href=`/shoppingCart`
  }

  const navigateToWihsList = () => {
    window.location.href=`/wishlist`
  }

  const validateProduct = (spokenText:any) => {
    const list = allProducts?.filter(function(eachItem){
      return eachItem['Name'].toLowerCase().includes(spokenText.toLowerCase())
    })
    return list[0]
  }

  const addToWishlist = (spokenText:any) => {
    const product = validateProduct(spokenText)
    getLocalStorage('wishlist')

    const inList = getIndex(product)
    if(inList === -1){
      listArray.push(product)
      console.log(listArray)
      localStorage.setItem('wishlist', JSON.stringify(listArray))
      setLatestCommando(`${product.Name} aan verlanglijst toegevoegd`)
    }else{
      console.log('already in wishlist')
    }
  }
  
  //const [listArray, setListArray] = useState<any[]>([''])
  let listArray:any[] = []
  const getLocalStorage = (storage:string) => {
    listArray = []
    const list = localStorage.getItem(storage)
      if(list){
        const parsedList:any = JSON.parse(list)
        parsedList.forEach((i:any) => {
          listArray.push(i)   
        })
        console.log(listArray)
      }
  }

  const getIndex = (product:any) => {
    console.log({product})
    console.log({listArray})
    let index = listArray.findIndex( element => {
        if (element.ProductId === product.ProductId) {
          return true;
        }
      });
    console.log(index)
    return index
  }

  const addToShoppingList = (spokenText:any) => {
    const product = validateProduct(spokenText)
    getLocalStorage('shoppingCart')

    const inList = getIndex(product)
    if(inList === -1) {
      listArray.push(product)
      console.log(listArray)
      localStorage.setItem('shoppingCart', JSON.stringify(listArray))
      setLatestCommando(`${product.Name} aan winkelmand toegevoegd`)
    }else{
      console.log('already in list')
    }
  }

  const navigateToInfoPage = () => {
    window.location.href=`/commandPage`
  }


  return (
    <div className="App">

      <div className="header">
            <div className="header_nav">
              <div className="header_nav_icons">
                <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 50.416 56">
                  <g id="Group_68" data-name="Group 68" transform="translate(0 -0.01)">
                    <g id="MCT" transform="translate(0 0.01)">
                      <path id="Path_80" data-name="Path 80" d="M35.979,45.21l-9.095,5.016L17.79,45.21V55.7l5.451,3.13a7.278,7.278,0,0,0,7.287,0l5.451-3.14Z" transform="translate(-1.676 -3.805)"/>
                      <path id="Path_81" data-name="Path 81" d="M46.943,11.347,28.653.923a6.953,6.953,0,0,0-6.89,0L3.473,11.347A6.794,6.794,0,0,0,0,17.242V38.109A6.794,6.794,0,0,0,3.473,44l3.184,1.845V18.4A1.464,1.464,0,0,1,7.4,17.119a1.5,1.5,0,0,1,1.489,0l16.32,9.1,16.311-9.1a1.5,1.5,0,0,1,1.489,0A1.464,1.464,0,0,1,43.75,18.4V45.821l3.184-1.845a6.8,6.8,0,0,0,3.482-5.867V17.242a6.794,6.794,0,0,0-3.473-5.895Z" transform="translate(0 -0.01)"/>
                    </g>
                  </g>
                </svg>
              </div>

              <div className="header_nav_search">
                <div className="searchbar_container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="search_icon" viewBox="0 0 35.997 36.004">
                    <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"/>
                  </svg>

                  <input type="text"
                      className="searchBar"
                      placeholder="Zoeken"
                      value={searchTerm}
                      onInput={(event: ChangeEvent<HTMLInputElement>) => {
                        getSearchTerm(event);
                      }}
                    />
                  </div>
              </div>

              <div className='header_nav_icons'>
                <div className="icon_container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 34.875 34.875">
                    <path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M17.438.563A17.438,17.438,0,1,0,34.875,18,17.434,17.434,0,0,0,17.438.563Zm0,6.75A6.188,6.188,0,1,1,11.25,13.5,6.188,6.188,0,0,1,17.438,7.313Zm0,24.188a13.474,13.474,0,0,1-10.3-4.8,7.839,7.839,0,0,1,6.926-4.2,1.72,1.72,0,0,1,.5.077,9.309,9.309,0,0,0,2.876.485,9.274,9.274,0,0,0,2.876-.485,1.72,1.72,0,0,1,.5-.077,7.839,7.839,0,0,1,6.926,4.2A13.474,13.474,0,0,1,17.438,31.5Z" transform="translate(0 -0.563)"/>
                  </svg>
                  <p>Account</p>
                </div>

                <div 
                  className="icon_container"
                  onClick={navigateToCheckOut}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 40.5 36">
                    <path id="Icon_awesome-shopping-cart" data-name="Icon awesome-shopping-cart" d="M37.133,21.186,40.457,6.561A1.688,1.688,0,0,0,38.812,4.5H11.194L10.55,1.349A1.687,1.687,0,0,0,8.9,0H1.688A1.687,1.687,0,0,0,0,1.688V2.813A1.687,1.687,0,0,0,1.688,4.5H6.6L11.54,28.648a3.938,3.938,0,1,0,4.714.6H31a3.936,3.936,0,1,0,4.472-.732l.388-1.707a1.688,1.688,0,0,0-1.646-2.061H15.336l-.46-2.25H35.488A1.687,1.687,0,0,0,37.133,21.186Z"/>
                  </svg>
                  <p>Winkelmand</p>
                </div>

                <div
                  className="icon_container"
                  onClick={navigateToWihsList}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 34.355 30.348">
                    <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="#368ADE" stroke="#368ADE" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                  </svg>
                  <p>Verlanglijst</p>
                </div>
              </div>
          </div>
        
      </div>

      <div className="header_info"
        onClick={openInfo}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_flag_icon" viewBox="0 0 33 33">
          <g id="Group_5" data-name="Group 5" transform="translate(343.828 489.635)">
            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)" fill="#368ade"/>
            <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#368ade" sstrokeLinecap="round" trokeLinejoin="round" strokeWidth="3"/>
            <path id="Path_5" data-name="Path 5" d="M3,0A2.939,2.939,0,0,1,6,2.875,2.939,2.939,0,0,1,3,5.75,2.939,2.939,0,0,1,0,2.875,2.939,2.939,0,0,1,3,0Z" transform="translate(-330.328 -484.373)" fill="#368ade"/>
          </g>
        </svg> */}

        <svg xmlns="http://www.w3.org/2000/svg" className="info_icon" viewBox="0 0 33 33">
          <g id="Group_6" data-name="Group 6" transform="translate(343.828 489.635)">
            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)" fill="#fff"/>
            <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            <path id="Path_5" data-name="Path 5" d="M3,0A2.939,2.939,0,0,1,6,2.875,2.939,2.939,0,0,1,3,5.75,2.939,2.939,0,0,1,0,2.875,2.939,2.939,0,0,1,3,0Z" transform="translate(-330.328 -484.373)" fill="#fff"/>
          </g>
        </svg>


      </div>

      {showInfo &&
        <div className="showInfo">
          <div className="showInfo_item">
            <div className="showInfo_title_container">
              <div></div>
              <h1 className="showInfo_title">Spraak commando's</h1>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={openInfo} className='showInfo_icon' viewBox="0 0 21 21">
                <path id="Icon_material-close" data-name="Icon material-close" d="M28.5,9.615,26.385,7.5,18,15.885,9.615,7.5,7.5,9.615,15.885,18,7.5,26.385,9.615,28.5,18,20.115,26.385,28.5,28.5,26.385,20.115,18Z" transform="translate(-7.5 -7.5)"/>
              </svg>

            </div>
            <h2 className="showInfo_item_title">Producten filteren</h2>
            <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Zoek "boxy ski jas"</p>
              </div>
                
             </div>
             <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Zoek "jassen" van "Protest"</p>
              </div>

             </div>
          </div>

          <div className="showInfo_item">
            <h2 className="showInfo_item_title">Zie meer info over product</h2>
            <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Selecteer "boxy ski jas"</p>
              </div>

             </div>
          </div>

          <div className="showInfo_item">
            <h2 className="showInfo_item_title">Toevoegen aan verlanglijst</h2>
            <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Voeg "boxy ski jas" toe aan verlanglijst</p>
              </div>
             </div>
          </div>

          <div className="showInfo_item">
            <h2 className="showInfo_item_title">Toevoegen aan winkelmand</h2>
            <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Voeg "boxy ski jas" toe aan winkelmand</p>
              </div>
             </div>
          </div>

          <div className="showInfo_item">
            <h2 className="showInfo_item_title">Filters resetten</h2>
            <div className="showInfo_item_command">
              <div className="test">
                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                </svg>
                <p>Reset</p>
              </div>
             </div>
          </div>

          <div className="showInfo_btnC">
            <div className="showInfo_btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_btn_icon" viewBox="0 0 36 29.25">
                <path id="Icon_awesome-list" data-name="Icon awesome-list" d="M5.625,25.875h-4.5A1.125,1.125,0,0,0,0,27v4.5a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,31.5V27A1.125,1.125,0,0,0,5.625,25.875Zm0-22.5h-4.5A1.125,1.125,0,0,0,0,4.5V9a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,9V4.5A1.125,1.125,0,0,0,5.625,3.375Zm0,11.25h-4.5A1.125,1.125,0,0,0,0,15.75v4.5a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,20.25v-4.5A1.125,1.125,0,0,0,5.625,14.625ZM34.875,27h-22.5a1.125,1.125,0,0,0-1.125,1.125v2.25A1.125,1.125,0,0,0,12.375,31.5h22.5A1.125,1.125,0,0,0,36,30.375v-2.25A1.125,1.125,0,0,0,34.875,27Zm0-22.5h-22.5A1.125,1.125,0,0,0,11.25,5.625v2.25A1.125,1.125,0,0,0,12.375,9h22.5A1.125,1.125,0,0,0,36,7.875V5.625A1.125,1.125,0,0,0,34.875,4.5Zm0,11.25h-22.5a1.125,1.125,0,0,0-1.125,1.125v2.25a1.125,1.125,0,0,0,1.125,1.125h22.5A1.125,1.125,0,0,0,36,19.125v-2.25A1.125,1.125,0,0,0,34.875,15.75Z" transform="translate(0 -3.375)"/>
              </svg>
              <button onClick={navigateToInfoPage} className="showInfo_allCommands_btn">Alle commando's</button>
            </div>
          </div>
        </div>
      }

      <div className="voiceControl">
        {showTranscript && 
          <div className="showTranscript">
            <p className="showTranscript_text">Zeg iets als:</p>
            {/* <div className="showTranscript_example_container">
              <h2 className="showTranscript_example">'Zoek jassen van Protest'</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="showTranscript_icon" viewBox="0 0 33 33">
                <g id="Group_5" data-name="Group 5" transform="translate(343.828 489.635)">
                  <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)"/>
                  <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#000" sstrokeLinecap="round" trokeLinejoin="round" strokeWidth="3"/>
                  <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="3" cy="2.875" rx="3" ry="2.875" transform="translate(-330.328 -484.373)"/>
                </g>
              </svg>
            </div> */}
            <p className="showTranscript_example">'Zoek jassen van Protest'</p>
            <h3 className="showTranscript_transcript">{transcript}</h3>
            {isLoading &&
              <div className="ballsContainer">
                <div></div>
                <div></div>
                <div></div>
              </div>
            }
            <button 
              className="showTranscript_all_commandos"
              onClick={navigateToInfoPage} 
            >
              alle commando's
            </button>
          </div>
        }
        <button className="speechButton"
          onClick={startListening}
        >
          {
            micState ?  
              <div className="boxContainer">
                <div className="box box1"></div>
                <div className="box box2"></div>
                <div className="box box3"></div>
                <div className="box box4"></div>
                <div className="box box5"></div>
            </div> :
            <svg xmlns="http://www.w3.org/2000/svg" className="speechButton_icon" viewBox="0 0 24.75 36"fill="#368ADE" >
              <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
            </svg>
          }
        </button>
      </div>

      <div className="latestCommandSection">
        <div className="latestCommand_container">
          <h1 className="latestCommand_text">{latestCommando}</h1>
        </div>
      </div>

      <div className="filterSection">
        <div className="filterSection_dropdowns">
          <select 
              className="filter"
              value={brandValue} 
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                getBrandValue(event);
              }}
            >
              <option key="1" value="">
                  Selecteer merk
              </option>
              {allBrands.map(list => (
                <option key={list.BrandId} value={list.BrandId}>
                  {list.Name}
                </option>))}
            </select>

            <select 
              className="filter"
              value={catValue}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                getCatValue(event);
              }}
            >
              <option key="1" value="">
                  Selecteer categorie
              </option>
              {allCategories.map(list => (
                <option key={list.CategoryId} value={list.CategoryId}>
                  {list.Name}
                </option>))}
            </select>

            <select 
              className="filter"
              value={genderValue}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                getGenderValue(event);
              }}
            >
              <option key="1" value="">
                  Selecteer geslacht
              </option>
              {allGenders.map(list => (
                <option key={list.Gender} value={list.Gender}>
                  {list.Gender}
                </option>))}
            </select>
        </div>
      </div>
          
      <div className="productSection">
        {filteredData && filteredData.map(item => {
          return(
            <div 
              key={item.ProductId}
              className="productSection_item"
            >
              <img 
                onClick={() => navigateToDetailUI(item.ProductId)}
                className="productSection_item_img"
                src = {item.Picture}
                alt = {`Image of ${item.Name}`}
              />
            
              <div className="productSection_buttonC">
                <svg xmlns="http://www.w3.org/2000/svg" className="cart_icon" viewBox="0 0 30 30">
                  <path id="Icon_material-shopping-cart" data-name="Icon material-shopping-cart" d="M10.5,27a3,3,0,1,0,3,3A3,3,0,0,0,10.5,27ZM1.5,3V6h3L9.9,17.385,7.875,21.06A2.9,2.9,0,0,0,7.5,22.5a3.009,3.009,0,0,0,3,3h18v-3H11.13a.371.371,0,0,1-.375-.375l.045-.18L12.15,19.5H23.325a2.986,2.986,0,0,0,2.625-1.545L31.32,8.22a1.465,1.465,0,0,0,.18-.72A1.5,1.5,0,0,0,30,6H7.815L6.405,3Zm24,24a3,3,0,1,0,3,3A3,3,0,0,0,25.5,27Z" transform="translate(-1.5 -3)" fill="#368ade"/>
                </svg>
                <button onClick={() => addToShoppingList(item)} className="productOverview_cart">Winkelmand</button>
              </div>

              <div 
                className="productSection_item_textC"
                onClick={() => navigateToDetailUI(item.ProductId)}
              >
                <h1 className="productSection_item_name">{item.Name.toUpperCase()}</h1>
                <div className="PS_item_textC">
                  <div className="productSection_afkorting">
                    <svg xmlns="http://www.w3.org/2000/svg" className="productSection_afkorting_icon" viewBox="0 0 24.75 36">
                      <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                    </svg>
                    <p>{item.Afkorting.toLowerCase()}</p>
                  </div>
                  <p className="PS_item_Price">€{item.Price}</p>
                </div>
              </div>
            </div>
          )
          })}
          
      </div>
    </div>


  );
}
export default App;