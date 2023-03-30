
import React, { useEffect, useState } from 'react';
import { Livro } from '../App';
import { api } from '../lib/axios';
import './ResultadoPesquisa.css';
import AdicionarLivro from './utils/AdicionarLivro';
import DeletarLivro from './utils/DeletarLivro';
import EditarLivro from './utils/EditarLivro';
import PopularBanco from './utils/PopularBanco';
import ZerarBanco from './utils/ZerarBanco';

import iconeEditar from '../assets/iconEditar.svg';
import seta from '../assets/seta.svg';


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
  }

  const handleFecharModal = () => {
    setLivroSelecionado(null);
    if (buscaTodos) {
      buscarTodos()
    } else {
      pesquisar(tipoBuscado, chaveBuscada);
    }
  }

  const handleFecharAdicionar = () => {
    setAdicionarLivro(false)
    if (buscaTodos) {
      buscarTodos()
    } else {
      pesquisar(tipoBuscado, chaveBuscada);
    }
    setQuantidadeMostrada(10)
  }

  function buscarTodos() {
    api.get('/Livros').then(res => {
      setRespostaPesquisa(res.data)
    })
    setQuantidadeMostrada(10)
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
    setQuantidadeMostrada(10)
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
          <p>Publicação</p>
          <p>Origem</p>
          <p>Autor</p>
          <p>Opções</p>
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
                  <p className='livro-nome'>{livro.nome}</p>
                  <p className='livro-categoria'>{livro.categoria}</p>
                  <p className='livro-data'>{dataDoLivro}</p>
                  <p className='livro-enacional'>{livro.eNacional ? 'Nacional' : 'Estrangeiro'}</p>
                  <p className='livro-autor'>{livro.autor}</p>
                  <div className='livro-opcoes'>
                    <button className='livro-botao-opcoes' onClick={() => handleEditar(livro)}>
                      <img src={iconeEditar} alt="Editar Livro" />
                    </button>
                    <DeletarLivro livro={livro} onClose={handleFecharModal} />
                  </div>
                </div>
              )
            })
          ) : (
            <h1>Não há livros com estes parâmetros</h1>
          )
        }
      </div>
      <div className='botao-vermais-container'>
        {
          !botaoVerMaisHabilitado ? (
            <button className='botaoVerMais' onClick={() => setQuantidadeMostrada(quantidadeMostrada + 10)}>
              Ver Mais <img src={seta} alt="Ver Mais" />
            </button>
          ):(
            <div className=''></div>
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

