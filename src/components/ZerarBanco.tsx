import React, { useState } from 'react'
import { api } from '../lib/axios'

const ZerarBanco = () => {
  function ZerarBanco(){
    const confirmado = window.confirm(`Deseja realmente deletar todos os dados da biblioteca?`);
    if (confirmado) {
      api.delete(`/Livros/Todos`)
    }
  }
  
  return (
    <button onClick={ZerarBanco}>ZerarBanco</button>
  )
}

export default ZerarBanco