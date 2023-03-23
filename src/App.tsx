import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
// import { api } from './lib/axios';
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
  const [ pesquisa, setPesquisa] = useState<Pesquisa>();
  const [ placeholder, setPlaceholder] = useState('Nome do Livro');
  const [ tipoPesquisa, setTipoPesquisa ] = useState('Nome do Livro');
  const [ filtro, setFiltro ] = useState(false);
  const [ tipoEntradaTexto, setTipoEntradaTexto ] = useState(true);

  useEffect(() => {
    // api.get(``).then(res => {
      // setRespostaPesquisa(res.data)
    // })
  }, [])

  function handleForm(event: FormEvent){
    event.preventDefault();
    if (tipoPesquisa == "Nome") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
    }
    if (tipoPesquisa == "Categoria") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
      // Se resposta der 0 items criar alert dizendo "Não há livros com a categoria escrita, tente novamente com as opções : Ciência, Drama, Ficção, Romance"
    }
    if (tipoPesquisa == "Data") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
    }
    if (tipoPesquisa == "Nacional") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
    }
  }

  function handleRemoverFiltro(){
    setPesquisa('');
    setTipoPesquisa('Nome');
    setFiltro(false)
    // api.get(`buscartudo`).then(res => {
    //   setRespostaPesquisa(res.data)
    // })
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
      <div className="header">
        <form onSubmit={handleForm} className="form">
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
          <select value={tipoPesquisa} onChange={handleTipoPesquisa}>
            <option value="Nome">Nome</option>
            <option value="Categoria">Categoria</option>
            <option value="Data">Data</option>
            <option value="Nacional">Nacional?</option>
          </select>
          {filtro ? (
            <button onClick={handleRemoverFiltro}>Remover filtro</button>
          ):(
            <button disabled onClick={handleRemoverFiltro}>Remover filtro</button>
          )}
        <button>Pesquisar</button>
        </form>
      </div>
      <div>
        {respostaPesquisa ? (
          respostaPesquisa.map((livro) => {
            const livroLocal = livro
            return (
              <div key={livro.id}>
                <h2>{livro.nome}</h2>
                <p>{livro.categoria}</p>
                <p>{livro.dataLancamento}</p>
                <p>{livro.eNacional? 'Sim' : 'Não'}</p>
                <button onClick={() => <Modal data={livro} />}>Editar</button>
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
