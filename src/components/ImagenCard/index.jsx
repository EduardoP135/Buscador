import React, {useEffect} from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from '..';


export const Card = styled.div`
  display: flex;
  justify-content:center;
  padding: 5px;
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  p {
    margin-left: 6px;
    margin-top: 10px;
  }
`;

const Title = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  color: #ffffff;
  font-size: 16px;
 
`;

const ImageCard = ({ photo, title }) => {
  const [imageLoaded, setImageLoaded] =useState(false);
  useEffect(() => {
    const imageLoaded = new Image ();
    imageLoader.src = photo;
    imageLoader.onload = () => setImageLoaded(true);

  }, [photo]);

  return (
    <>
    {imageloaded ?(
       <Card photo={photo}>
          <Title>{title}</Title>
        </Card>
    ) : <Skeleton width="90px" height="90px"/>}
   
    </>
  );

};
 

export default ImageCard;