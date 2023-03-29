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
        nome: 'Macunaíma - o herói sem nenhum caráter',
        categoria: 'Ficção',
        dataLancamento: '1928-01-01T00:00:00',
        eNacional: true 
      },
      {
        nome: 'Grande sertão Veredas',
        categoria: 'Ficção',
        dataLancamento: '2019-02-25T00:00:00',
        eNacional: true 
      },
      {
        nome: 'Memórias póstumas de Brás Cubas',
        categoria: 'Ficção',
        dataLancamento: '2019-05-02T00:00:00',
        eNacional: true 
      },
      {
        nome: 'Dom Casmurro',
        categoria: 'Ficção',
        dataLancamento: '2019-05-02T00:00:00',
        eNacional: true
      },
      {
        nome: 'Vidas secas',
        categoria: 'Romance',
        dataLancamento: '1938-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'São Bernardo',
        categoria: 'Romance',
        dataLancamento: '1934-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'A paixão segundo GH',
        categoria: 'Romance',
        dataLancamento: '1964-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'Os Sertões',
        categoria: 'Suspense',
        dataLancamento: '1902-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'A Hora da Estrela',
        categoria: 'Romance',
        dataLancamento: '1977-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 10',
        categoria: 'Fantasia',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: false
      },
      {
        nome: 'Livro 11',
        categoria: 'Ficção Científica',
        dataLancamento: '1985-07-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 12',
        categoria: 'Terror',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: false
      },
      {
        nome: 'Livro 13',
        categoria: 'Suspense',
        dataLancamento: '2022-03-08T00:00:00',
        eNacional: true 
      },
      {
        nome: 'Livro 14',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
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