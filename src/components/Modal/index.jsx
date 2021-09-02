import React, { useEffect} from 'react';

import Portal from './Portal';

import { Overlay, Dialog } from './styles';

const Modal = ({ children, open, onclose }) =>{
    useEffect(() => {
        function onEsc(e) {
            if(e.keyCode === 27) onclose();
        }

        window.addEventListener('keydown',onEsc);

        return () =>{
            window.removeEventListener('keydown',onEsc);
        };
    }, [onclose]);

    if (!open) return null;

    function onOverlayClick() {
        onclose();
    }

    function onDialogClick(e) {
        e.stopPropagation();
    }

  return (
      <Portal>
          <Overlay onClick={onOverlayClick}>
             <Dialog onClick={onDialogClick}/>{children}<Dialog/>
          </Overlay>
      </Portal>
  );
};

export default Modal;