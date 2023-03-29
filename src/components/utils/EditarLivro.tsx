import React, { useState } from 'react';
import { Livro } from '../../App';
import { api } from '../../lib/axios';
import './EditarLivro.css';

type EditarLivroProps = {
  livro: Livro;
  onClose: () => void;
};

const EditarLivro: React.FC<EditarLivroProps> = ({ livro, onClose }) => {
  const [nome, setNome] = useState(livro.nome);
  const [categoria, setCategoria] = useState(livro.categoria);
  const [dataLancamento, setDataLancamento] = useState(livro.dataLancamento);
  const [eNacional, setENacional] = useState(livro.eNacional);

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  const handleDataLancamentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataLancamento(event.target.value);
  };

  const handleENacionalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setENacional(event.target.checked);
  };

  const handleSave = async () => {
    const updatedLivro = {
      ...livro,
      nome,
      categoria,
      dataLancamento: new Date(dataLancamento),
      eNacional,
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
            <input type="text" value={nome} autoFocus onChange={handleNomeChange} />
          </label>

          <label htmlFor='Categoria'>
            Categoria:
            <select value={categoria} onChange={(event) => handleCategoriaChange(event)}>
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
            <input type="date" value={dataLancamento.substring(0, 10)} onChange={handleDataLancamentoChange} />
          </label>

          <label htmlFor='ENacional'>
            É Nacional?
            <input type="checkbox" checked={eNacional} onChange={handleENacionalChange} />
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
