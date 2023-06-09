import React, { useEffect, useState } from 'react'
import { Livro } from '../../App';
import { api } from '../../lib/axios';

import "./PopularBanco.css"

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
          categoria: "Fantasia",
          dataLancamento: "1943-01-01T00:00:00",
          eNacional: false,
          autor: "Antoine de Saint-Exupéry"
        },
        {
          nome: "Cem Anos de Solidão",
          categoria: "Romance",
          dataLancamento: "1967-01-01T00:00:00",
          eNacional: true,
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
          categoria: "Ficção Científica",
          dataLancamento: "1949-01-01T00:00:00",
          eNacional: false,
          autor: "George Orwell"
        },
        {
          nome: "O Senhor dos Anéis",
          categoria: "Fantasia",
          dataLancamento: "1954-07-29T00:00:00",
          eNacional: true,
          autor: "J.R.R. Tolkien"
        },
        {
          nome: "Os Miseráveis",
          categoria: "Romance",
          dataLancamento: "1862-01-01T00:00:00",
          eNacional: true,
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
          categoria: "Fantasia",
          dataLancamento: "1945-08-17T00:00:00",
          eNacional: true,
          autor: "George Orwell"
        },
        {
          nome: "Crepúsculo",
          categoria: "Romance",
          dataLancamento: "2013-07-16T00:00:00",
          eNacional: false,
          autor: "Stephenie Meyer"
        },
        {
          nome: "O Processo",
          categoria: "Ficção",
          dataLancamento: "1925-04-26T00:00:00",
          eNacional: false,
          autor: "Franz Kafka"
        },
        {
          nome: "A Divina Comédia",
          categoria: "Literatura",
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
          categoria: "Ficção",
          dataLancamento: "1958-10-28T00:00:00",
          eNacional: false,
          autor: "Giuseppe Tomasi"
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
          categoria: "Suspense",
          dataLancamento: "1980-09-01T00:00:00",
          eNacional: false,
          autor: "Umberto Eco"
        },
        {
          nome: "Drácula",
          categoria: "Terror",
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
    <button className='botao-popular-banco' onClick={adicionarLivros}>Popular Biblioteca</button>
  )
}

export default PopularBanco