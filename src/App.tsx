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
  eNacional: boolean,
  autor: string
}

function App() {
  const [ tipoFeito, setTipoFeito ] = useState<string>('');
  const [ pesquisaFeita, setPesquisaFeita ] = useState<string|number|Date>('');
  const [ pesquisa, setPesquisa] = useState<Pesquisa>('');
  const [ placeholder, setPlaceholder] = useState('Nome');
  const [ tipoPesquisa, setTipoPesquisa ] = useState('Nome');
  const [ filtro, setFiltro ] = useState(false);

  function handleForm(event: FormEvent){
    event.preventDefault();
    if (pesquisa == '') {
      handleRemoverFiltro()
    } else {
      setFiltro(true)
      setTipoFeito(tipoPesquisa)
      setPesquisaFeita(pesquisa)
    }
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
        <div onClick={handleRemoverFiltro} className='biblioteca-logo'>
          <img src={bibliotecaLogo} alt="Logomarca" width={100} />
          <span className='biblioteca-header-titulo'>
            Minha Biblioteca
          </span>
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
                <option value="Autor">Autor</option>
              </select>
            </label>
            <label htmlFor="Campo de Inserção">
              {tipoPesquisa == "Nome" && 
              <button className='botao-entrada-pesquisa'>
                <input
                  type="text"
                  placeholder={placeholder}
                  autoFocus
                  value={pesquisa}
                  onChange={event => setPesquisa(event.target.value)}
                  onSubmit={handleForm}
                />
              </button>
              }
              {tipoPesquisa == "Matricula" && 
              <button className='botao-entrada-pesquisa'>
                <input
                  type="number"
                  placeholder={placeholder}
                  autoFocus
                  value={pesquisa}
                  onChange={event => setPesquisa(event.target.value)}
                />
              </button>
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
                <button className='botao-entrada-pesquisa'>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    autoFocus
                    value={pesquisa}
                    onChange={event => setPesquisa(event.target.value)}
                  />
                </button>
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
              {tipoPesquisa == "Autor" && 
                <button className='botao-entrada-pesquisa'>
                  <input
                    type="text"
                    placeholder={placeholder}
                    autoFocus
                    value={pesquisa}
                    onChange={event => setPesquisa(event.target.value)}
                  />
                </button>
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
