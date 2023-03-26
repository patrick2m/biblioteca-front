import React, { useState } from 'react'

import { Livro } from '../App';
import { api } from '../lib/axios';

type ModalProps = {
  data: Livro
}

const Modal: React.FC<ModalProps> = ({data: livroAtual}) => {
  const [ novoNome, setNovoNome ] = useState(livroAtual.nome)
  const [ novoCategoria, setNovoCategoria ] = useState(livroAtual.categoria)
  const [ novoDataLancamento, setNovoDataLancamento ] = useState(livroAtual.dataLancamento)
  const [ novoENacional, setNovoENacional ] = useState(livroAtual.eNacional)

  function handleDeleteButton() {
    const confirmado = confirmadoAlert();
    if (confirmado) {
      api.delete('/deletarlivro', {
        params: {
          id: livroAtual.id
        }
      })
    }
  }

  function confirmadoAlert() {
    return window.confirm('Deseja realmente excluir o livro?')
  }

  function handleSaveBookInfo(){
    api.patch('/salvarLivro', {
      params: {
        id: livroAtual.id,
        nome: novoNome,
        categoria: novoCategoria,
        dataLancamento: new Date(novoDataLancamento),
        eNacional: novoENacional
      }
    })
    .then(response => {
      alert("Novos dados salvos com sucesso!");
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  return (
    <div>
      <div>
        <input
          placeholder={livroAtual.nome}
          value={novoNome}
          onChange={(event) => setNovoNome(event.target.value)}
        />
        <input
          placeholder={livroAtual.categoria}
          value={novoCategoria}
          onChange={(event) => setNovoCategoria(event.target.value)}
        />
        <input 
          placeholder={livroAtual.dataLancamento}
          value={novoDataLancamento}
          onChange={(event) => setNovoDataLancamento(event.target.value)}
        />
        <input 
          placeholder={livroAtual.eNacional ? 'Sim' : 'Não'} 
          value={novoENacional ? 'Sim' : 'Não'} 
          onChange={(event) => setNovoENacional(event?.target.value == 'Sim' ? true : false)}
        />
      </div>
      <div>
        <button onClick={handleDeleteButton}>Deletar Livro</button>
        <button onClick={handleSaveBookInfo}>Salvar</button>
      </div>
    </div>
  )
}

export default Modal