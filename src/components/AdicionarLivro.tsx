import React, { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const AdicionarLivro = () => {
  const [ Nome, setNome ] = useState<string>('')
  const [ Categoria, setCategoria ] = useState<string>('Ação')
  const [ DataLancamento, setDataLancamento ] = useState<string>('')
  const [ ENacional, setENacional ] = useState<boolean>(false)

  function handleSubmit(event: FormEvent){
    event.preventDefault()
    if (DataLancamento == '') {
      alert('Você não selecionou a data')
      return
    }

    const confirmado = window.confirm(`Deseja realmente adicionar o livro? Nome : ${Nome}, Categoria : ${Categoria}, DataLancamento : ${DataLancamento}, É Nacional : ${ENacional}`);
   
    if (confirmado) {
      api.post('/Livros', {
        nome: Nome,
        categoria: Categoria,
        dataLancamento: new Date(DataLancamento).toISOString(),
        eNacional: ENacional
      }).then(response => {
        if (response.status === 201) {
          alert('Livro adicionado com sucesso')
        } else {
          alert('Erro ao adicionar o Livro')
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <div className='AdicionarContainer'>
      <form onSubmit={handleSubmit}>
        <span>Nome : </span><input type="text" value={Nome} onChange={event => setNome(event.target.value)}/>
        <span> Categoria : </span>
        <select value={Categoria} onChange={event => setCategoria(event.target.value)}>
            <option value="Ação">Ação</option>
            <option value="Aventura">Aventura</option>
            <option value="Científico">Científico</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="História">História</option>
            <option value="Infantil">Infantil</option>
            <option value="Literatura">Literatura</option>
            <option value="Religioso">Religioso</option>
            <option value="Romance">Romance</option>
            <option value="Suspense">Suspense</option>
            <option value="Terror">Terror</option>
          </select>
        <span> Data de Lançamento :</span><input type="Date" value={DataLancamento} onChange={event => setDataLancamento(event.target.value)}/>
        <span> É Nacional?</span><input type="checkbox" name="eNacional" checked={ENacional} onChange={event => setENacional(event.target.checked)}/>
      <button onClick={handleSubmit}>
        Adicionar
      </button>
      </form>
    </div>
  )
}

export default AdicionarLivro;