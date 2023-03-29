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
        },



        
        // {
        //   nome: "A Ilíada",
        //   categoria: "Poesia épica",
        //   dataLancamento: "800-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Homero"
        // },
        // {
        //   nome: "A Metamorfose",
        //   categoria: "Ficção filosófica",
        //   dataLancamento: "1915-10-15T00:00:00",
        //   eNacional: false,
        //   autor: "Franz Kafka"
        // },
        // {
        //   nome: "O Retrato de Dorian Gray",
        //   categoria: "Ficção gótica",
        //   dataLancamento: "1890-07-01T00:00:00",
        //   eNacional: false,
        //   autor: "Oscar Wilde"
        // },
        // {
        //   nome: "Os Miseráveis",
        //   categoria: "Romance histórico",
        //   dataLancamento: "1862-04-01T00:00:00",
        //   eNacional: false,
        //   autor: "Victor Hugo"
        // },
        // {
        //   nome: "A Insustentável Leveza do Ser",
        //   categoria: "Ficção filosófica",
        //   dataLancamento: "1984-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Milan Kundera"
        // },
        // {
        //   nome: "Os Sofrimentos do Jovem Werther",
        //   categoria: "Romance epistolar",
        //   dataLancamento: "1774-09-28T00:00:00",
        //   eNacional: false,
        //   autor: "Johann Wolfgang von Goethe"
        // },
        // {
        //   nome: "A Sangue Frio",
        //   categoria: "Romance não-ficcional",
        //   dataLancamento: "1966-01-17T00:00:00",
        //   eNacional: false,
        //   autor: "Truman Capote"
        // },
        // {
        //   nome: "Crime e Castigo",
        //   categoria: "Romance psicológico",
        //   dataLancamento: "1866-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Fiódor Dostoiévski"
        // },
        // {
        //   nome: "O Jardim Secreto",
        //   categoria: "Romance infantil",
        //   dataLancamento: "1911-08-01T00:00:00",
        //   eNacional: false,
        //   autor: "Frances Hodgson Burnett"
        // },
        // {
        //   nome: "O Morro dos Ventos Uivantes",
        //   categoria: "Romance gótico",
        //   dataLancamento: "1847-12-19T00:00:00",
        //   eNacional: false,
        //   autor: "Emily Bronte"
        // },
        // {
        //   nome: "Memórias Póstumas de Brás Cubas",
        //   categoria: "Romance",
        //   dataLancamento: "1881-12-01T00:00:00",
        //   eNacional: true,
        //   autor: "Machado de Assis"
        // },
        // {
        //   nome: "O Lobo do Mar",
        //   categoria: "Aventura",
        //   dataLancamento: "1904-04-08T00:00:00",
        //   eNacional: false,
        //   autor: "Jack London"
        // },
        // {
        //   nome: "A Casa dos Espíritos",
        //   categoria: "Ficção",
        //   dataLancamento: "1982-01-01T00:00:00",
        //   eNacional: true,
        //   autor: "Isabel Allende"
        // },
        // {
        //   nome: "O Homem Invisível",
        //   categoria: "Ficção científica",
        //   dataLancamento: "1897-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "H.G. Wells"
        // },
        // {
        //   nome: "As Crônicas de Nárnia",
        //   categoria: "Fantasia",
        //   dataLancamento: "1950-10-16T00:00:00",
        //   eNacional: false,
        //   autor: "C.S. Lewis"
        // },
        // {
        //   nome: "Dom Casmurro",
        //   categoria: "Romance",
        //   dataLancamento: "1899-01-01T00:00:00",
        //   eNacional: true,
        //   autor: "Machado de Assis"
        // },
        // {
        //   nome: "O Sol É Para Todos",
        //   categoria: "Romance",
        //   dataLancamento: "1960-07-11T00:00:00",
        //   eNacional: false,
        //   autor: "Harper Lee"
        // }
        // ,
        // {
        //   nome: "Laranja Mecânica",
        //   categoria: "Ficção distópica",
        //   dataLancamento: "1962-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Anthony Burgess"
        // },
        // {
        //   nome: "O Velho e o Mar",
        //   categoria: "Ficção",
        //   dataLancamento: "1952-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Ernest Hemingway"
        // },
        // {
        //   nome: "The Kite Runner",
        //   categoria: "Ficção",
        //   dataLancamento: "2003-05-29T00:00:00",
        //   eNacional: false,
        //   autor: "Khaled Hosseini"
        // },
        // {
        //   nome: "Crime and Punishment",
        //   categoria: "Ficção",
        //   dataLancamento: "1866-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Fyodor Dostoevsky"
        // },
        // {
        //   nome: "The Adventures of Sherlock Holmes",
        //   categoria: "Ficção policial",
        //   dataLancamento: "1892-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Arthur Conan Doyle"
        // },
        // {
        //   nome: "The Color Purple",
        //   categoria: "Ficção",
        //   dataLancamento: "1982-02-01T00:00:00",
        //   eNacional: false,
        //   autor: "Alice Walker"
        // },
        // {
        //   nome: "The Bell Jar",
        //   categoria: "Ficção",
        //   dataLancamento: "1963-01-14T00:00:00",
        //   eNacional: false,
        //   autor: "Sylvia Plath"
        // },
        // {
        //   nome: "The Grapes of Wrath",
        //   categoria: "Ficção",
        //   dataLancamento: "1939-04-14T00:00:00",
        //   eNacional: false,
        //   autor: "John Steinbeck"
        // },
        // {
        //   nome: "Frankenstein",
        //   categoria: "Ficção científica",
        //   dataLancamento: "1818-01-01T00:00:00",
        //   eNacional: false,
        //   autor: "Mary Shelley"
        // },
        // {
        //   nome: "The Diary of a Young Girl",
        //   categoria: "Biografia",
        //   dataLancamento: "1947-06-25T00:00:00",
        //   eNacional: false,
        //   autor: "Anne Frank"
        // },
        // {
        //   nome: "Beloved",
        //   categoria: "Romance",
        //   autor: "Toni Morrison",
        //   dataLancamento: "1987-09-02T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Clockwork Orange",
        //   categoria: "Ficção científica",
        //   autor: "Anthony Burgess",
        //   dataLancamento: "1962-06-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Lolita",
        //   categoria: "Romance",
        //   autor: "Vladimir Nabokov",
        //   dataLancamento: "1955-09-15T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "One Hundred Years of Solitude",
        //   categoria: "Ficção",
        //   autor: "Gabriel García Márquez",
        //   dataLancamento: "1967-05-30T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Catcher in the Rye",
        //   categoria: "Romance",
        //   autor: "J.D. Salinger",
        //   dataLancamento: "1951-07-16T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Picture of Dorian Gray",
        //   categoria: "Romance",
        //   autor: "Oscar Wilde",
        //   dataLancamento: "1890-07-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Hitchhiker's Guide to the Galaxy",
        //   categoria: "Ficção científica",
        //   autor: "Douglas Adams",
        //   dataLancamento: "1979-10-12T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Great Gatsby",
        //   categoria: "Romance",
        //   autor: "F. Scott Fitzgerald",
        //   dataLancamento: "1925-04-10T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Beloved",
        //   categoria: "Romance",
        //   autor: "Toni Morrison",
        //   dataLancamento: "1987-09-02T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Clockwork Orange",
        //   categoria: "Ficção científica",
        //   autor: "Anthony Burgess",
        //   dataLancamento: "1962-06-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Lolita",
        //   categoria: "Romance",
        //   autor: "Vladimir Nabokov",
        //   dataLancamento: "1955-09-15T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "One Hundred Years of Solitude",
        //   categoria: "Ficção",
        //   autor: "Gabriel García Márquez",
        //   dataLancamento: "1967-05-30T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Sapiens: A Brief History of Humankind",
        //   categoria: "História",
        //   autor: "Yuval Noah Harari",
        //   dataLancamento: "2011-04-28T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Catcher in the Rye",
        //   categoria: "Romance",
        //   autor: "J.D. Salinger",
        //   dataLancamento: "1951-07-16T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Picture of Dorian Gray",
        //   categoria: "Romance",
        //   autor: "Oscar Wilde",
        //   dataLancamento: "1890-07-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Hitchhiker's Guide to the Galaxy",
        //   categoria: "Ficção científica",
        //   autor: "Douglas Adams",
        //   dataLancamento: "1979-10-12T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Great Gatsby",
        //   categoria: "Romance",
        //   autor: "F. Scott Fitzgerald",
        //   dataLancamento: "1925-04-10T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Beloved",
        //   categoria: "Romance",
        //   autor: "Toni Morrison",
        //   dataLancamento: "1987-09-02T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Clockwork Orange",
        //   categoria: "Ficção científica",
        //   autor: "Anthony Burgess",
        //   dataLancamento: "1962-06-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Lolita",
        //   categoria: "Romance",
        //   autor: "Vladimir Nabokov",
        //   dataLancamento: "1955-09-15T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "One Hundred Years of Solitude",
        //   categoria: "Ficção",
        //   autor: "Gabriel García Márquez",
        //   dataLancamento: "1967-05-30T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Catcher in the Rye",
        //   categoria: "Romance",
        //   autor: "J.D. Salinger",
        //   dataLancamento: "1951-07-16T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Picture of Dorian Gray",
        //   categoria: "Romance",
        //   autor: "Oscar Wilde",
        //   dataLancamento: "1890-07-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "The Hitchhiker's Guide to the Galaxy",
        //   categoria: "Ficção científica",
        //   autor: "Douglas Adams",
        //   dataLancamento: "1979-10-12T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Nome do Vento",
        //   categoria: "Fantasia",
        //   autor: "Patrick Rothfuss",
        //   dataLancamento: "2007-03-27T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Conto da Aia",
        //   categoria: "Ficção Científica",
        //   autor: "Margaret Atwood",
        //   dataLancamento: "1985-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Dança da Morte",
        //   categoria: "Ficção Apocalíptica",
        //   autor: "Stephen King",
        //   dataLancamento: "1978-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Pêndulo de Foucault",
        //   categoria: "Romance",
        //   autor: "Umberto Eco",
        //   dataLancamento: "1988-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Crepúsculo",
        //   categoria: "Romance Fantástico",
        //   autor: "Stephenie Meyer",
        //   dataLancamento: "2005-10-05T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Coragem de Ser Imperfeito",
        //   categoria: "Autoajuda",
        //   autor: "Brené Brown",
        //   dataLancamento: "2010-08-22T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Mortos não contam segredos",
        //   categoria: "Romance Policial",
        //   autor: "Kathy Reichs",
        //   dataLancamento: "2001-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Nome do Vento",
        //   categoria: "Fantasia",
        //   autor: "Patrick Rothfuss",
        //   dataLancamento: "2007-03-27T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Conto da Aia",
        //   categoria: "Ficção Científica",
        //   autor: "Margaret Atwood",
        //   dataLancamento: "1985-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Dança da Morte",
        //   categoria: "Ficção Apocalíptica",
        //   autor: "Stephen King",
        //   dataLancamento: "1978-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "O Pêndulo de Foucault",
        //   categoria: "Romance",
        //   autor: "Umberto Eco",
        //   dataLancamento: "1988-01-01T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "A Coragem de Ser Imperfeito",
        //   categoria: "Autoajuda",
        //   autor: "Brené Brown",
        //   dataLancamento: "2010-08-22T00:00:00",
        //   eNacional: false
        // },
        // {
        //   nome: "Mortos não contam segredos",
        //   categoria: "Romance Policial",
        //   autor: "Kathy Reichs",
        //   dataLancamento: "2001-01-01T00:00:00",
        //   eNacional: false
        // }
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