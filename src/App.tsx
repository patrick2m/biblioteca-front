import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import AdicionarLivro from './components/AdicionarLivro';
import BotaoDeletar from './components/botaoDeletar';
import Modal from './components/Modal';
import ZerarBanco from './components/ZerarBanco';
import { api } from './lib/axios';
type Pesquisa = string;

export type Livro = {
  id: number,
  nome: string,
  categoria: string,
  dataLancamento: string,
  eNacional: boolean
}

function App() {
  const [ respostaPesquisa, setRespostaPesquisa ] = useState<Livro[]>([]);
  const [ pesquisa, setPesquisa] = useState<Pesquisa>('');
  const [ placeholder, setPlaceholder] = useState('Nome');
  const [ tipoPesquisa, setTipoPesquisa ] = useState('Nome');
  const [ filtro, setFiltro ] = useState(false);
  const [ tipoEntradaTexto, setTipoEntradaTexto ] = useState(true);

  function buscarTodos() {
    api.get('/Livros').then(res => {
      setRespostaPesquisa(res.data)
    })    
  }

  useEffect(() => {
    buscarTodos()
  }, [])

  function handleForm(event: FormEvent){
    event.preventDefault();
    if (tipoPesquisa == "Nome") {
      setFiltro(true)
      api.get(`/Livros/Nome/${pesquisa}`).then(res => {
        setRespostaPesquisa([res.data])
      })
    }
    if (tipoPesquisa == "Matricula") {
      setFiltro(true)
      api.get(`/Livros/Matricula/${pesquisa}`).then(res => {
        setRespostaPesquisa([res.data])
      })
    }
    if (tipoPesquisa == "Categoria") {
      setFiltro(true)
      api.get(`/Livros/Categoria/${pesquisa}`).then(res => {
        setRespostaPesquisa(res.data)
      })
    }
    if (tipoPesquisa == "Data") {
      setFiltro(true)
      const dataFormatada = new Date(pesquisa).toISOString();
      api.get(`/Livros/Data/${dataFormatada}`).then(res => {
        setRespostaPesquisa(res.data)
      })
    }
    if (tipoPesquisa == "ENacional") {
      setFiltro(true)
      api.get(`/Livros/ENacional/${pesquisa}`).then(res => {
        setRespostaPesquisa(res.data)
      })
    }
  }

  function handleRemoverFiltro(){
    setPesquisa('');
    setTipoPesquisa('Nome');
    setFiltro(false)
    buscarTodos()
  }

  function handleTipoPesquisa(event: React.ChangeEvent<HTMLSelectElement>) {
    setTipoPesquisa(event.target.value);
    if (event.target.value === 'Data') {
      setPlaceholder('01/01/2023');
      setTipoEntradaTexto(false);
    } else if (event.target.value === 'Nacional') {
      setPlaceholder('Sim ou Não');
      setTipoEntradaTexto(true);
    } else if (event.target.value === 'Categoria') {
      setPlaceholder('Drama, Romance, Ficção ...');
      setTipoEntradaTexto(true);
    } else {
      setPlaceholder(event.target.value);
      setTipoEntradaTexto(true);
    }
  }

  return (
    <div className="App">
      <div><h1>Biblioteca Digital</h1></div>
      <div><AdicionarLivro /></div>
      <div><ZerarBanco/></div>
      <div className="header">
        <form onSubmit={handleForm} className="form">
        <select value={tipoPesquisa} onChange={handleTipoPesquisa}>
            <option value="Nome">Nome</option>
            <option value="Matricula">Matrícula</option>
            <option value="Categoria">Categoria</option>
            <option value="Data">Data</option>
            <option value="ENacional">Nacional?</option>
          </select>
          {tipoEntradaTexto  ? (
            <input 
              type="text"
              placeholder={placeholder}
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          ):(
            <input 
              type="date" 
              name="date" 
              id="date"
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          ) }
          {filtro ? (
            <button onClick={handleRemoverFiltro}>Remover filtro</button>
          ):(
            <button disabled onClick={handleRemoverFiltro}>Remover filtro</button>
          )}
        <button>Pesquisar</button>
        </form>
      </div>
      <div>
        {respostaPesquisa.length > 0 ? (
          respostaPesquisa.map((livro) => {
            return (
              <div 
                key={livro.id}
                className="livro"
              >
                <p>Matricula : {livro.id}</p>
                <h2>{livro.nome}</h2>
                <p>{livro.categoria}</p>
                <p>Data : <span>{livro.dataLancamento}</span></p>
                <p>{livro.eNacional? 'Sim' : 'Não'}</p>
                <button onClick={() => <Modal data={livro} />}>Editar</button>
                <BotaoDeletar data={livro} />
              </div>
            )
          })
        ) : (
          <h1>Não há itens</h1>
        )}
      </div>
    </div>
  )
}

export default App;
