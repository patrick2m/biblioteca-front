import React, { FormEvent, useState } from 'react';
import { api } from '../../lib/axios';
import './AdicionarLivro.css';

type AdicionarLivroProps = {
  onClose: () => void;
}

const AdicionarLivro: React.FC<AdicionarLivroProps> = ({ onClose }) => {
  const [ Nome, setNome ] = useState<string>('')
  const [ Categoria, setCategoria ] = useState<string>('Ação')
  const [ DataLancamento, setDataLancamento ] = useState<string>('')
  const [ ENacional, setENacional ] = useState<boolean>(false)

  function handleAdicionar(){
    if (DataLancamento == '') {
      alert('Você não selecionou a data')
      return
    }

    const confirmado = window.confirm(`Deseja realmente adicionar o livro? Nome : ${Nome}, Categoria : ${Categoria}, Data de Lançamento : ${DataLancamento}, É Nacional : ${ENacional}`);

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
      onClose()
    } else {
      onClose()
    }
  }

  return (
    <div className='adicionar-overlay'>
      <div className='adicionar-container'>
        <h1>Adicionar Livro</h1>
        <form className='adicionar-formulario'>
          <label htmlFor="Nome">
            Nome : 
            <input type="text" value={Nome} onChange={event => setNome(event.target.value)}/>
          </label>

          <label htmlFor="Categoria">
            Categoria :
            <select className='adicionar-categorias' value={Categoria} onChange={event => setCategoria(event.target.value)}>
              <option value="Ação">Ação</option>
              <option value="Aventura">Aventura</option>
              <option value="Biografia">Biografia</option>
              <option value="Científico">Científico</option>
              <option value="Comédia">Comédia</option>
              <option value="Drama">Drama</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Ficção">Ficção</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="História">História</option>
              <option value="Infantil">Infantil</option>
              <option value="Literatura">Literatura</option>
              <option value="Religioso">Religioso</option>
              <option value="Romance">Romance</option>
              <option value="Suspense">Suspense</option>
              <option value="Terror">Terror</option>
            </select>
          </label>

          <label htmlFor="DataLancamento">
            Data de Lançamento :
            <input type="Date" value={DataLancamento} onChange={event => setDataLancamento(event.target.value)}/>
          </label>

          <label htmlFor="ENacional">
            É Nacional?<input type="checkbox" name="eNacional" checked={ENacional} onChange={event => setENacional(event.target.checked)}/>
          </label>

          <div className='adicionar-botoes'>
            <button onClick={onClose}>
              Cancelar
            </button>
            <button onClick={handleAdicionar}>
              Adicionar
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AdicionarLivro;