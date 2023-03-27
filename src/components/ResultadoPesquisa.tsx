
import React, { useState } from 'react';
import { Livro } from '../App';
import BotaoDeletar from './BotaoDeletar';
import Modal from './Modal';

type ResultadoBuscaProps = {
  livros: Livro[];
  onRefresh: () => void;
}

const ResultadoBusca: React.FC<ResultadoBuscaProps> = ({ livros, onRefresh }) => {
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  const handleEditar = (livro: Livro) => {
    setLivroSelecionado(livro);
  }

  const handleFecharModal = () => {
    setLivroSelecionado(null);
    onRefresh()
  }

  return (
    <div>
      {livros.length > 0 ? (
        livros.map((livro) => {
          return (
            <div 
              key={livro.id}
              className="livro"
            >
              <p>Matricula : {livro.id}</p>
              <h2>{livro.nome}</h2>
              <p>{livro.categoria}</p>
              <p>Data : <span>{livro.dataLancamento}</span></p>
              <p>{livro.eNacional ? 'Sim' : 'Não'}</p>
              <button onClick={() => handleEditar(livro)}>Editar</button>
              <BotaoDeletar livro={livro} />
            </div>
          )
        })
      ) : (
        <h1>Não há itens</h1>
      )}
      {livroSelecionado && (
        <Modal livro={livroSelecionado} onClose={handleFecharModal} />
      )}
    </div>
  )
}

export default ResultadoBusca;

