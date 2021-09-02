import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Slider from "react-slick";


import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';

import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle, ModalTitle, ModalContent, } from './styled';



const Home = () => {
  const [placeId, setplaceId] = useState(null);
  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants)
  const [inputValue, setInputValue] = useState('');
  const [query, setQuety] = useState(null);
  const [modalOpend, setModalOpend] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,      
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function handlekeyPress(e) {
    if (e.key === 'Enter'){
      setQuety(inputValue);
    }
  }

  function handleOpenModal(placeId) {
    setplaceId(placeId);
    setModalOpend(true);
  }


    return (
      <Wrapper>
       <Container>
          <Search>
           <Logo src={logo} alt="Logo do restaurante"/>
           <TextField
              label='Pesquisar'
              outlined
              //onTrailingIconSelect={() => this.setState({value: ''})}
              trailingIcon={<MaterialIcon role="button" icon="search"/>} >
              <Input value={inputValue} onKeyPress={handlekeyPress} onChange={(e) => setInputValue(e.target.value)}/>
           </TextField>
           {restaurants.lengt > 0 ?(
             <>
               <CarouselTitle>Na sua Áera</CarouselTitle>
               <Carousel {...settings}>
                {restaurants.map((restaurant) => (
                  <Card key ={restaurante.place_id} photo={restaurants.photos ? restaurant.photos[0].getUtrl() : restaurante} title={restaurant.name}
                   />
                ))}
              </Carousel>
             </>
           ) : <Loader/>}
           <CarouselTitle>Na sua Áera</CarouselTitle>
           <Carousel {...settings}>
             {restaurants.map((restaurant) => (
               <Card key ={restaurante.place_id} photo={restaurants.photos ? restaurant.photos[0].getUtrl() : restaurante} title={restaurant.name} />
               
              ))}
           </Carousel>
          </Search>
          {restaurants.map((restaurant) => (
           <RestaurantCard oncClick={() => handleOpenModal(restaurant.placeId)} restaurant={restaurant} />
          
          ))}
        </Container>
        <Map query ={query} placeId={placeId}/>
        <Modal open= {modalOpend} onclose={() => setModalOpend(!modalOpend)}/>
          { restaurantSelected ? (
            <>
             <ModalTitle>{restaurantSelected?.name}</ModalTitle>
             <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
             <ModalContent>{restaurantSelected?.formatted_add}</ModalContent>
             <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'aberto agora' : 'fechado neste momento' }</ModalContent>
            </>
          ): (
            <>
             <Skeleton width="10px" height="10px" />
             <Skeleton width="10px" height="10px" />
             <Skeleton width="10px" height="10px" />
             <Skeleton width="10px" height="10px" />

            </>
          )}
    
      </Wrapper>
  )
 
};

export default Home;