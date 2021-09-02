import React from 'ract';
import styled, {keyframes} from 'styled-components';

const kerFrameLoading = keyframes`
   0% {
       opacity: 0.5;
    }

    100% {
        opacity 1;
    }
`;

const LoadingSkeleton = styled.div`
   background-color: gray;
   border-radius: 6px;
   margin-botoom: 10px;
   min-width: ${(props) => props.width};
   height: ${(props) => props.height};
   animation: ${KeyFrameLoading} 500ms infinite alternate;
`;


const  a = ({ width, height }) => <LoadingSkeleton width={width} height={height} />;
export default  a