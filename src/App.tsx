import { FormEvent, useState } from 'react';
import './App.css';
import ResultadoPesquisa from './components/ResultadoPesquisa';

import bibliotecaLogo from './assets/biblioteca-logo.png';
import lupa from './assets/lupa.svg';

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
        <div onClick={handleRemoverFiltro} className='biblioteca-logo-container'>
          <img src={bibliotecaLogo} alt="Logomarca" width={100} />
          <span className='biblioteca-logo-titulo'>
            Minha Biblioteca
          </span>
        </div>
        <form onSubmit={handleForm} className="biblioteca-formulario">
          <label htmlFor="Tipo de Pesquisa">
            <select className='biblioteca-formulario-tipopesquisa' value={tipoPesquisa} onChange={handleTipoPesquisa}>
              <option value="Nome">Nome</option>
              <option value="Matricula">Matrícula</option>
              <option value="Categoria">Categoria</option>
              <option value="Data">Data</option>
              <option value="ENacional">Origem</option>
              <option value="Autor">Autor</option>
            </select>
          </label>
          <label htmlFor="Campo de Inserção">
            {tipoPesquisa == "Nome" && 
              <input
                className='campo-entrada-pesquisa'
                type="text"
                placeholder={placeholder}
                autoFocus
                value={pesquisa}
                onChange={event => setPesquisa(event.target.value)}
                onSubmit={handleForm}
                maxLength={24}
              />
            }
            {tipoPesquisa == "Matricula" && 
              <input
                className='campo-entrada-pesquisa'
                type="number"
                placeholder={placeholder}
                autoFocus
                value={pesquisa}
                onChange={event => setPesquisa(event.target.value)}
                onSubmit={handleForm}
              />
            }
            {tipoPesquisa == "Categoria" && 
              <select 
                className='campo-entrada-pesquisa'
                value={pesquisa} 
                onChange={event => setPesquisa(event.target.value)}
                onSubmit={handleForm}
              >
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
                className='campo-entrada-pesquisa' 
                name="date"
                id="date"
                autoFocus
                value={pesquisa}
                onChange={event => setPesquisa(event.target.value)}
              />
            }
            {tipoPesquisa == "ENacional" && 
              <select 
                className='campo-entrada-pesquisa'
                value={pesquisa} 
                onChange={event => setPesquisa(event.target.value)}
                onSubmit={handleForm}
              >
                <option value="true">Nacional</option>
                <option value="false">Estrangeiro</option>
              </select>
            }
            {tipoPesquisa == "Autor" && 
              <input
                type="text"
                placeholder={placeholder}
                className='campo-entrada-pesquisa'
                autoFocus
                value={pesquisa}
                onChange={event => setPesquisa(event.target.value)}
                maxLength={24}
              />
            }
          </label>
          <button className='biblioteca-formulario-botaopesquisa'>
            Pesquisar
            <img src={lupa} width={20} height={20} alt="Pesquisar" />
          </button>
          {filtro ? (
            <button className='cancelar-filtro-ativo' onClick={handleRemoverFiltro}>X</button>
          ):(
            <div className='cancelar-filtro'>X</div>
          )}
        </form>
      </div>
      <div className='biblioteca-content'>
        <ResultadoPesquisa buscaTodos={!filtro} tipoBuscado={tipoFeito} chaveBuscada={pesquisaFeita} onRefresh={() => handleForm} />
      </div>
    </div>
  )
}

export default App;
