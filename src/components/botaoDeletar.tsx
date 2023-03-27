import React from 'react'
import { Livro } from '../App';
import { api } from '../lib/axios';

type botaoDeletarProps = {
  data: Livro
}

const BotaoDeletar: React.FC<botaoDeletarProps> = ({data: livroAtual}) => {

  function handleDeleteButton(){
    const confirmado = window.confirm(`Deseja realmente adicionar o livro? Nome : ${livroAtual.nome}, Categoria : ${livroAtual.categoria}, DataLancamento : ${livroAtual.dataLancamento}, É Nacional : ${livroAtual.eNacional}`);
    
    if (confirmado) {
      api.delete(`/Livros/${livroAtual.id}`).then(response => {
        if (response.status === 204) {
          alert('Livro excluído com sucesso')
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <button onClick={handleDeleteButton}>Excluir Livro</button>
  )
}

export default BotaoDeletar;