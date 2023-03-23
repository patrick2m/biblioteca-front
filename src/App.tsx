import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
// import { api } from './lib/axios';

export type Livro = {
  id: number,
  nome: string,
  categoria: string,
  dataLancamento: string,
  eNacional: boolean
}

function App() {
  const [ respostaPesquisa, setRespostaPesquisa ] = useState<Livro[]>([]);
  const [ pesquisa, setPesquisa] = useState('');
  const [ placeholder, setPlaceholder] = useState('Nome do Livro');
  const [ tipoPesquisa, setTipoPesquisa ] = useState('Nome do Livro');
  const [ filtro, setFiltro ] = useState(false);

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
    }
    if (tipoPesquisa == "Data") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
    }
    if (tipoPesquisa == "É nacional") {
      setFiltro(true)
      // api.get(``).then(res => {
      //   setRespostaPesquisa(res.data)
      // })
    }
  }

  function handleRemoverFiltro(){
    setPesquisa('');
    setTipoPesquisa('Nome');
    // api.get(``).then(res => {
    //   setRespostaPesquisa(res.data)
    // })
  }

  function handleTipoPesquisa(event: React.ChangeEvent<HTMLSelectElement>) {
    setTipoPesquisa(event.target.value);
    if (event.target.value === 'Data') {
      setPlaceholder('01/01/2023');
    } else if (event.target.value === 'Nacional') {
      setPlaceholder('Sim ou Não');
    } else if (event.target.value === 'Categoria') {
      setPlaceholder('Drama, Romance, Ficção ...');
    } else {
      setPlaceholder(event.target.value);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <form onSubmit={handleForm} className="form">
          <input 
            type="text"
            placeholder={placeholder}
            autoFocus
            value={pesquisa}
            onChange={event => setPesquisa(event.target.value)}
            />
          <select value={tipoPesquisa} onChange={handleTipoPesquisa}>
            <option value="Nome">Nome</option>
            <option value="Categoria">Categoria</option>
            <option value="Data">Data</option>
            <option value="Nacional">Nacional?</option>
          </select>
          {filtro  ? (
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
            return (
              <div key={livro.id}>
                <h2>{livro.nome}</h2>
                <p>{livro.categoria}</p>
                <p>{livro.dataLançamento}</p>
                <p>{livro.eNacional? 'Sim' : 'Não'}</p>
                <button onClick={() => <Modal  />}>Editar</button>
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
