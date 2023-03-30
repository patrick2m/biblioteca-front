import React from 'react'
import { api } from '../../lib/axios'

import "./ZerarBanco.css"

type ZerarBancoProps = {
  onClose: () => void;
}
const ZerarBanco: React.FC<ZerarBancoProps> = ({ onClose }) => {
  function ZerarBanco(){
    const confirmado = window.confirm(`Deseja realmente deletar todos os dados da biblioteca?`);
    if (confirmado) {
      api.delete('/Livros/Todos').then(response => {
        alert('Livros excluídos com sucesso!')
        onClose();
      }).catch(error => {
        console.error('Erro ao excluir livros:', error);
      });
    }
  }
  
  return (
    <button className='botao-zerar-banco' onClick={ZerarBanco}>Resetar Biblioteca</button>
  )
}

export default ZerarBanco
