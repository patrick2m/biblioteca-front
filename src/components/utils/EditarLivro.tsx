import React, { useState } from 'react';
import { Livro } from '../../App';
import { api } from '../../lib/axios';
import './EditarLivro.css';

type EditarLivroProps = {
  onClose: () => void;
  livro: Livro;
};

const EditarLivro: React.FC<EditarLivroProps> = ({ livro, onClose }) => {
  const [nome, setNome] = useState(livro.nome);
  const [categoria, setCategoria] = useState(livro.categoria);
  const [dataLancamento, setDataLancamento] = useState(livro.dataLancamento);
  const [eNacional, setENacional] = useState<string>(livro.eNacional.toString());
  const [autor, setAutor] = useState(livro.autor);

  const handleAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const handleSave = async () => {
    const updatedLivro = {
      ...livro,
      nome,
      categoria,
      dataLancamento: new Date(dataLancamento),
      eNacional: Boolean(eNacional),
      autor,
    };

    try {
      await api.put(`/Livros/${livro.id}`, updatedLivro);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editar-overlay">
      <div className="editar-container">
        <div className='editar-header'>
          <h1>Editar Livro</h1>
          <div className='livro-id'>
            Matrícula :
            <div className='numero-id'>
              {livro.id}
            </div>
          </div>
        </div>
        <form className='editar-formulario'>

          <label htmlFor='Nome'>
            Nome:
            <input type="text" maxLength={24} value={nome} autoFocus onChange={event => setNome(event.target.value)} />
          </label>

          <label htmlFor='Categoria'>
            Categoria:
            <select value={categoria} onChange={event => setCategoria(event.target.value)}>
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

          <label htmlFor='DataLancamento'>
            Data de Lançamento:
            <input type="date" value={dataLancamento.substring(0, 10)} onChange={event => setDataLancamento(event.target.value)} />
          </label>

          <label htmlFor="ENacional">
            Origem:
            <select 
                value={eNacional} 
                onChange={event => setENacional(event.target.value)}
              >
                <option value="true">Nacional</option>
                <option value="false">Estrangeiro</option>
              </select>
          </label>

          <label htmlFor='Autor'>
            Autor:
            <input type="text" maxLength={24} value={autor} autoFocus onChange={event => setAutor(event.target.value)} />
          </label>

          <div className="editar-botoes">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLivro;
