
import React, { useEffect, useState } from 'react';
import { Livro } from '../App';
import { api } from '../lib/axios';
import './ResultadoPesquisa.css';
import AdicionarLivro from './utils/AdicionarLivro';
import DeletarLivro from './utils/DeletarLivro';
import EditarLivro from './utils/EditarLivro';
import PopularBanco from './utils/PopularBanco';
import ZerarBanco from './utils/ZerarBanco';

type ResultadoBuscaProps = {
  tipoBuscado: string;
  chaveBuscada: string | Date | number;
  buscaTodos: boolean;
  onRefresh: () => void;
}

const ResultadoBusca: React.FC<ResultadoBuscaProps> = ({ buscaTodos, tipoBuscado, chaveBuscada, onRefresh }) => {
  const [ livroSelecionado, setLivroSelecionado ] = useState<Livro | null>(null);
  const [ respostaPesquisa,setRespostaPesquisa ] = useState<Livro[]>([]);
  const [ adicionarLivro, setAdicionarLivro ] = useState<boolean>(false);
  const [ quantidadeMostrada, setQuantidadeMostrada ] = useState<number>(10);
  const [ botaoVerMaisHabilitado, setBotaoVerMaisHabilitado ] = useState<boolean>(false);

  const handleEditar = (livro: Livro) => {
    setLivroSelecionado(livro);
  }

  const handleAdicionarLivro = () => {
    setAdicionarLivro(true);
    console.log(adicionarLivro)
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

  const handleFecharAdicionar = () => {
    setAdicionarLivro(false)
    if (buscaTodos) {
      buscarTodos()
    } else {
      pesquisar(tipoBuscado, chaveBuscada);
    }
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

  useEffect(() => {
    if (respostaPesquisa.length < (quantidadeMostrada)) {
      setBotaoVerMaisHabilitado(true);
    } else {
      setBotaoVerMaisHabilitado(false);
    }
  }, [quantidadeMostrada, respostaPesquisa])
  
  return (
    <div className='resultado-container'>
      <div className='resultado-header'>
        <div className='resultado-utils'>
          <button onClick={handleAdicionarLivro}>Adicionar Livro +</button>
          <span><PopularBanco onClose={handleFecharModal}/><ZerarBanco onClose={handleFecharModal}/></span>
        </div>
        <div className='resultado-cabecalho'>
          <p>Matrícula</p>
          <p>Nome</p>
          <p>Categoria</p>
          <p>Data de Lançamento</p>
          <p>É Nacional?</p>
          <p>Editar</p>
          <p>Excluir</p>
        </div>
      </div>
      <div className='resultado-lista'>
        {
          respostaPesquisa.length > 0 ? (
            respostaPesquisa.slice(0, quantidadeMostrada).map((livro) => {
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
                  <p className='livro-matricula'>{livro.id}</p>
                  <h2 className='livro-nome'>{livro.nome}</h2>
                  <p className='livro-categoria'>{livro.categoria}</p>
                  <p className='livro-data'>{dataDoLivro}</p>
                  <p className='livro-enacional'>{livro.eNacional ? 'Sim' : 'Não'}</p>
                  <button className='livro-botao-editar' onClick={() => handleEditar(livro)}>Editar</button>
                  <DeletarLivro livro={livro} onClose={handleFecharModal} />
                </div>
              )
            })
          ) : (
            <h1>Não há livros com estes parâmetros</h1>
          )
        }
        {
          !botaoVerMaisHabilitado ? (
            <button onClick={() => setQuantidadeMostrada(quantidadeMostrada + 10)}>Ver Mais +</button>
          ):(
            <button disabled onClick={() => setQuantidadeMostrada(quantidadeMostrada + 10)}>Ver Mais +</button>
          )
        }
      </div>
      {livroSelecionado && (
        <EditarLivro livro={livroSelecionado} onClose={handleFecharModal} />
      )}
      {adicionarLivro && (
        <AdicionarLivro onClose={handleFecharAdicionar} />
      )}
    </div>
  )
}

export default ResultadoBusca;

