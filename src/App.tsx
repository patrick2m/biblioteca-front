import { FormEvent, useState } from 'react';
import './App.css';
import ResultadoPesquisa from './components/ResultadoPesquisa';

type Pesquisa = string;

export type Livro = {
  id?: number,
  nome: string,
  categoria: string,
  dataLancamento: string,
  eNacional: boolean
}

function App() {
  const [ tipoFeito, setTipoFeito ] = useState<string>('');
  const [ pesquisaFeita, setPesquisaFeita ] = useState<string|number|Date>('');
  const [ pesquisa, setPesquisa] = useState<Pesquisa>('');
  const [ placeholder, setPlaceholder] = useState('Nome');
  const [ tipoPesquisa, setTipoPesquisa ] = useState('Nome');
  const [ filtro, setFiltro ] = useState(false);
  const [ tipoEntradaTexto, setTipoEntradaTexto ] = useState(true);

  function handleForm(event: FormEvent){
    if (pesquisa == '') return
    event.preventDefault();
    setFiltro(true)
    setTipoFeito(tipoPesquisa)
    setPesquisaFeita(pesquisa)
  }

  function handleRemoverFiltro(){
    setPesquisa('');
    setTipoPesquisa('Nome');
    setFiltro(false)
    setPlaceholder('Nome');
    setTipoFeito('BuscaTodos')
    setPesquisaFeita('')
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
      <div className="header">
        <form onSubmit={handleForm} className="form">
        <select value={tipoPesquisa} onChange={handleTipoPesquisa}>
            <option value="Nome">Nome</option>
            <option value="Matricula">Matrícula</option>
            <option value="Categoria">Categoria</option>
            <option value="Data">Data</option>
            <option value="ENacional">Nacional?</option>
          </select>
          {tipoPesquisa == "Nome" && 
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          }
          {tipoPesquisa == "Matricula" && 
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          }
          {tipoPesquisa == "Categoria" && 
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          }
          {tipoPesquisa == "Data" && 
            <input
              type="date"
              name="date"
              id="date"
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          }
          {tipoPesquisa == "ENacional" && 
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={pesquisa}
              onChange={event => setPesquisa(event.target.value)}
            />
          }
          {filtro ? (
            <button onClick={handleRemoverFiltro}>Remover filtro</button>
          ):(
            <button disabled onClick={handleRemoverFiltro}>Remover filtro</button>
          )}
        <button>Pesquisar</button>
        </form>
      </div>
      <div>
        <ResultadoPesquisa buscaTodos={!filtro} tipoBuscado={tipoFeito} chaveBuscada={pesquisaFeita} onRefresh={() => handleForm} />
      </div>
    </div>
  )
}

export default App;
