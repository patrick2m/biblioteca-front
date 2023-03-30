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
  const [ ENacional, setENacional ] = useState<string>('false')
  const [ Autor, setAutor ] = useState<string>('')

  function handleAdicionar(){
    if (Nome == '') {
      alert('Você não selecionou o nome')
      return
    } else if (DataLancamento == '') {
      alert('Você não selecionou a data')
      return
    } else if (Autor == '') {
      alert('Você não selecionou a data')
      return
    }

    const confirmado = window.confirm(`Deseja realmente adicionar o livro ${Nome}?`);

    if (confirmado) {
      api.post('/Livros', {
        nome: Nome,
        categoria: Categoria,
        dataLancamento: new Date(DataLancamento).toISOString(),
        eNacional: Boolean(ENacional),
        autor: Autor
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
        <div className='adicionar-formulario'>
          <label htmlFor="Nome">
            Nome : 
            <input type="text" value={Nome} maxLength={24} onChange={event => setNome(event.target.value)}/>
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
            Origem:
            <select 
                value={ENacional} 
                onChange={event => setENacional(event.target.value)}
              >
                <option value="true">Nacional</option>
                <option value="false">Estrangeiro</option>
              </select>
          </label>

          <label htmlFor="Autor">
            Autor : 
            <input type="text" value={Autor} maxLength={24} onChange={event => setAutor(event.target.value)}/>
          </label>

          <div className='adicionar-botoes'>
            <button onClick={onClose}>
              Cancelar
            </button>
            <button onClick={handleAdicionar}>
              Adicionar
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdicionarLivro;