import React, { useEffect, useState } from 'react'
import { Livro } from '../../App';
import { api } from '../../lib/axios';

type PopularBancoProps = {
  onClose: () => void;
}

const PopularBanco: React.FC<PopularBancoProps> = ({ onClose }) => {
  const [ livros, setLivros] = useState<Livro[]>([])

  useEffect(() => {
    setLivros([
        {
          nome: "O Alquimista",
          categoria: "Romance",
          dataLancamento: "1988-01-01T00:00:00",
          eNacional: true,
          autor: "Paulo Coelho"
        },
        {
          nome: "Dom Casmurro",
          categoria: "Romance",
          dataLancamento: "1899-01-01T00:00:00",
          eNacional: true,
          autor: "Machado de Assis"
        },
        {
          nome: "O Pequeno Príncipe",
          categoria: "Fábula",
          dataLancamento: "1943-01-01T00:00:00",
          eNacional: false,
          autor: "Antoine de Saint-Exupéry"
        },
        {
          nome: "Cem Anos de Solidão",
          categoria: "Romance",
          dataLancamento: "1967-01-01T00:00:00",
          eNacional: false,
          autor: "Gabriel García Márquez"
        },
        {
          nome: "Guerra e Paz",
          categoria: "Romance",
          dataLancamento: "1869-01-01T00:00:00",
          eNacional: false,
          autor: "Léon Tolstói"
        },
        {
          nome: "1984",
          categoria: "Ficção científica",
          dataLancamento: "1949-01-01T00:00:00",
          eNacional: false,
          autor: "George Orwell"
        },
        {
          nome: "O Senhor dos Anéis",
          categoria: "Fantasia",
          dataLancamento: "1954-07-29T00:00:00",
          eNacional: false,
          autor: "J.R.R. Tolkien"
        },
        {
          nome: "Os Miseráveis",
          categoria: "Romance",
          dataLancamento: "1862-01-01T00:00:00",
          eNacional: false,
          autor: "Victor Hugo"
        },
        {
          nome: "The Great Gatsby",
          categoria: "Romance",
          dataLancamento: "1925-04-10T00:00:00",
          eNacional: false,
          autor: "F. Scott Fitzgerald"
        },
        {
          nome: "A Revolução dos Bichos",
          categoria: "Fábula",
          dataLancamento: "1945-08-17T00:00:00",
          eNacional: false,
          autor: "George Orwell"
        },
        {
          nome: "O Apanhador no Campo de Centeio",
          categoria: "Romance",
          dataLancamento: "1951-07-16T00:00:00",
          eNacional: false,
          autor: "J.D. Salinger"
        },
        {
          nome: "O Processo",
          categoria: "Ficção filosófica",
          dataLancamento: "1925-04-26T00:00:00",
          eNacional: false,
          autor: "Franz Kafka"
        },
        {
          nome: "A Divina Comédia",
          categoria: "Poesia épica",
          dataLancamento: "1472-01-01T00:00:00",
          eNacional: false,
          autor: "Dante Alighieri"
        },
        {
          nome: "O Conde de Monte Cristo",
          categoria: "Aventura",
          dataLancamento: "1844-08-28T00:00:00",
          eNacional: false,
          autor: "Alexandre Dumas"
        },
        {
          nome: "O Sol é para Todos",
          categoria: "Ficção",
          dataLancamento: "1960-07-11T00:00:00",
          eNacional: false,
          autor: "Harper Lee"
        },
        {
          nome: "O Leopardo",
          categoria: "Ficção histórica",
          dataLancamento: "1958-10-28T00:00:00",
          eNacional: false,
          autor: "Giuseppe Tomasi di Lampedusa"
        },
        {
          nome: "O Hobbit",
          categoria: "Fantasia",
          dataLancamento: "1937-09-21T00:00:00",
          eNacional: false,
          autor: "J.R.R. Tolkien"
        },
        {
          nome: "O Velho e o Mar",
          categoria: "Ficção",
          dataLancamento: "1952-09-01T00:00:00",
          eNacional: false,
          autor: "Ernest Hemingway"
        },
        {
          nome: "A Peste",
          categoria: "Romance",
          dataLancamento: "1947-06-16T00:00:00",
          eNacional: true,
          autor: "Albert Camus"
        },
        {
          nome: "O Nome da Rosa",
          categoria: "Mistério",
          dataLancamento: "1980-09-01T00:00:00",
          eNacional: false,
          autor: "Umberto Eco"
        },
        {
          nome: "Drácula",
          categoria: "Terror gótico",
          dataLancamento: "1897-05-26T00:00:00",
          eNacional: false,
          autor: "Bram Stoker"
        }
    ]);
  }, [])

  function adicionarLivros(){
    const confirmado = window.confirm(`Deseja realmente popular o banco de dados com livros?`);
    
    if (confirmado) {
      api.post('/PopularBanco', livros).then(response => {
        alert('Livros adicionados com sucesso!')
        onClose();
      }).catch(error => {
        console.log('Erro ao adicionar livros:', error);
      });
    }
  }

  return (
    <button onClick={adicionarLivros}>PopularBanco</button>
  )
}

export default PopularBanco