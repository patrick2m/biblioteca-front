
import React, { useEffect, useState } from 'react';
import { Livro } from '../App';
import { api } from '../lib/axios';
import AdicionarLivro from './AdicionarLivro';
import BotaoDeletar from './BotaoDeletar';
import Modal from './Modal';
import PopularBanco from './PopularBanco';
import ZerarBanco from './ZerarBanco';

type ResultadoBuscaProps = {
  tipoBuscado: string;
  chaveBuscada: string | Date | number;
  buscaTodos: boolean;
  onRefresh: () => void;
}

const ResultadoBusca: React.FC<ResultadoBuscaProps> = ({ buscaTodos, tipoBuscado, chaveBuscada, onRefresh }) => {
  const [ livroSelecionado, setLivroSelecionado ] = useState<Livro | null>(null);
  const [ respostaPesquisa,setRespostaPesquisa ] = useState<Livro[]>([]);
  const handleEditar = (livro: Livro) => {
    setLivroSelecionado(livro);
  }

  const handleFecharModal = () => {
    setLivroSelecionado(null);
    if (buscaTodos) {
      buscarTodos()
    } else {
      pesquisar(tipoBuscado, chaveBuscada);
    }
    onRefresh()
  }

  function buscarTodos() {
    api.get('/Livros').then(res => {
      setRespostaPesquisa(res.data)
    })    
  }

  function pesquisar(tipoBuscado: string, chaveBuscada: string|number|Date) {
    if (tipoBuscado == "Data") {
      const dataFormatada = new Date(chaveBuscada).toISOString();
      api.get(`/Livros/Data/${dataFormatada}`).then(res => {
        setRespostaPesquisa(res.data)
      })
    } else {
      api.get(`/Livros/${tipoBuscado}/${chaveBuscada}`).then(res => {
        setRespostaPesquisa(res.data)
      })
    }
  }

  useEffect(() => {
    if (buscaTodos  == true) {
      buscarTodos();
    } else {
      pesquisar(tipoBuscado, chaveBuscada)
    }
  }, [tipoBuscado, chaveBuscada])

  return (
    <div>
      <div><AdicionarLivro onClose={handleFecharModal} /></div>
      <span><PopularBanco onClose={handleFecharModal}/><ZerarBanco onClose={handleFecharModal}/></span>
      {respostaPesquisa.length > 0 ? (
        respostaPesquisa?.map((livro) => {
          const dateTime = new Date(livro.dataLancamento);

          const dia = dateTime.getDate().toString().padStart(2, '0');
          const mes = (dateTime.getMonth() + 1).toString().padStart(2, '0');
          const ano = dateTime.getFullYear().toString()

          const dataDoLivro = `${dia}/${mes}/${ano}`
          return (
            <div 
              key={livro.id}
              className="livro"
            >
              <p>Matricula : {livro.id}</p>
              <h2>{livro.nome}</h2>
              <p>{livro.categoria}</p>
              <p>Data : <span>{dataDoLivro}</span></p>
              <p>{livro.eNacional ? 'Sim' : 'Não'}</p>
              <button onClick={() => handleEditar(livro)}>Editar</button>
              <BotaoDeletar livro={livro} onClose={handleFecharModal} />
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

