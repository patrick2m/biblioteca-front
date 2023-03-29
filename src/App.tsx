import { FormEvent, useState } from 'react';
import './App.css';
import ResultadoPesquisa from './components/ResultadoPesquisa';

import bibliotecaLogo from './assets/biblioteca-logo.png';

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

  function handleForm(event: FormEvent){
    if (pesquisa == '') {
      event.preventDefault();
      return
    }
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
    } else if (event.target.value === 'Nacional') {
      setPlaceholder('Sim ou Não');
    } else if (event.target.value === 'Categoria') {
      setPlaceholder('Drama, Romance, Ficção ...');
    } else {
      setPlaceholder(event.target.value);
    }
  }

  return (
    <div className="biblioteca-container">
      <div className='biblioteca-header'>
        <div className='biblioteca-logo'>
          <img src={bibliotecaLogo} alt="Logomarca" width={100} />
          <strong>Minha Biblioteca</strong>
        </div>
        <div className="biblioteca-filtro">
          <form onSubmit={handleForm} className="biblioteca-formulario">
            <label htmlFor="Tipo de Pesquisa">
              <select value={tipoPesquisa} onChange={handleTipoPesquisa}>
                <option value="Nome">Nome</option>
                <option value="Matricula">Matrícula</option>
                <option value="Categoria">Categoria</option>
                <option value="Data">Data</option>
                <option value="ENacional">Nacional?</option>
              </select>
            </label>
            <label htmlFor="Campo de Inserção">
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
                type="number"
                placeholder={placeholder}
                autoFocus
                value={pesquisa}
                onChange={event => setPesquisa(event.target.value)}
                />
              }
              {tipoPesquisa == "Categoria" && 
                <select value={pesquisa} onChange={event => setPesquisa(event.target.value)}>
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
            </label>
            {filtro ? (
              <button onClick={handleRemoverFiltro}>Remover filtro</button>
            ):(
              <button disabled onClick={handleRemoverFiltro}>Remover filtro</button>
            )}
          <button>Pesquisar</button>
          </form>
        </div>
      </div>
      <div className='biblioteca-content'>
        <ResultadoPesquisa buscaTodos={!filtro} tipoBuscado={tipoFeito} chaveBuscada={pesquisaFeita} onRefresh={() => handleForm} />
      </div>
    </div>
  )
}

export default App;
