import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setRestaurant, setRestaurants } from '../../redux/modules/restaurants';
import { LabelTwoTone, RestaurantSharp } from '@material-ui/icons';
import { Restaurant } from '../RestaurantCard/styles';

export const MapContainer = (props) => {
    const dispatch = useDispatch();
    const { restaurants } = useSelector((state) => state.restaurants)
    const {map, setMap} = useState(null);
    const { google, query, placeId } = props;

    useEffect(() => {
        if(query){
            serchByQuery(query);
        }
    },[query]);

    useEffect(() =>{
        if (placeId) {
            getRestaurantById(placeId);
        }
    });[placeId]
    
    function getRestaurantById(){
        const service = new google.maps.places.placesService(map);
        dispatch(setRestaurant(null));

        const request = {
            placeId,
            fields:['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
        };

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                dispatch(setRestaurant(place));
            
            }
        });
    }

    function serchByQuery(query) {
        const service = new google.maps.places.placesService(map);
        dispatch(setRestaurants([]));

        const request = {
            location: map.center,
            radius: '200',
            type: ['restaurant'],
            query,
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                dispatch(setRestaurant(results));
            
            }
        });
    }

    

    function searchNearby(map, center)  {
        const service = new google.maps.places.PlacesService(map);
        dispatch(setRestaurants([]));

        const request = {
            location: center,
            radius: '20000',
            type: ['restaurant'],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('restaurants>>>', results);
                dispatch(setRestaurant(results));
            }
        });
    }

    function onMapReady(map) {
        setMap(map);
        searchNearby(map, map.center);
    }

    return(
      <Map google={google} centerAroundCurrentLocation onReady ={onMapReady} onRecenter={onMapReady} {...props}> 
         {RestaurantSharp.map((restaurant) => (
           <Marker 
            key ={ restaurant.place_id} 
            name= {restaurant.name} 
            position={{
                Lat: restaurant.geometry.location.lat(),
                lng: restaurant.geometry.location.lng(),
            }}
            />    
          ))}
        </Map>
    ); 
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'pt-br',
})(MapContainer);