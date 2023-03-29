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
        nome: 'O Pequeno Príncipe',
        categoria: 'Fábula',
        dataLancamento: '1943-04-06T00:00:00',
        eNacional: false 
      },
      {
        nome: 'Dom Casmurro',
        categoria: 'Romance',
        dataLancamento: '1899-01-01T00:00:00',
        eNacional: true 
      },
      {
        nome: 'A Hora da Estrela',
        categoria: 'Romance',
        dataLancamento: '1977-01-01T00:00:00',
        eNacional: true 
      },
      {
        nome: '1984',
        categoria: 'Ficção distópica',
        dataLancamento: '1949-06-08T00:00:00',
        eNacional: false
      },
      {
        nome: 'A Montanha Mágica',
        categoria: 'Romance',
        dataLancamento: '1924-01-01T00:00:00',
        eNacional: false
      },
      {
        nome: 'Grande Sertão: Veredas',
        categoria: 'Romance',
        dataLancamento: '1956-11-18T00:00:00',
        eNacional: true
      },
      {
        nome: 'A Revolução dos Bichos',
        categoria: 'Fábula política',
        dataLancamento: '1945-08-17T00:00:00',
        eNacional: false
      },
      {
        nome: 'Quincas Borba',
        categoria: 'Romance',
        dataLancamento: '1891-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'Memórias Póstumas de Brás Cubas',
        categoria: 'Romance',
        dataLancamento: '1881-01-01T00:00:00',
        eNacional: true
      },
      {
        nome: 'Cem Anos de Solidão',
        categoria: 'Romance',
        dataLancamento: '1967-05-30T00:00:00',
        eNacional: false
      },
      {
        nome: 'O Poder do Hábito',
        categoria: 'Autoajuda',
        dataLancamento: '2012-02-28T00:00:00',
        eNacional: false
      },
      {
        nome: 'O Senhor dos Anéis: A Sociedade do Anel',
        categoria: 'Fantasia',
        dataLancamento: '1954-07-29T00:00:00',
        eNacional: false
      },
      {
        nome: 'A Metamorfose',
        categoria: 'Ficção',
        dataLancamento: '1915-10-15T00:00:00',
        eNacional: false 
      },
      {
        nome: 'O Processo',
        categoria: 'Ficção',
        dataLancamento: '1925-04-26T00:00:00',
        eNacional: false
      },
      {
        nome: 'Livro 15',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 16',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 17',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 18',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 19',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 20',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 21',
        categoria: 'Drama',
        dataLancamento: '2023-03-08T00:00:00',
        eNacional: true
      },
      {
        nome: 'Livro 22',
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