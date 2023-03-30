import React, { useState, useEffect } from 'react';
import './BotaoVoltarAoTopo.css';

import iconeTopo from '../../assets/topo.svg';


const BotaoVoltarAoTopo: React.FC = () => {
  const [ aparece, setAparece] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setAparece(true);
      } else {
        setAparece(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {aparece && (
        <button className="botao-voltaraotopo" onClick={scrollToTop}>
          Voltar ao topo
          <img src={iconeTopo} alt="Voltar ao topo" />
        </button>
      )}
    </>
  );
};

export default BotaoVoltarAoTopo;
