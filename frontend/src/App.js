import './App.css';
import { gql, useQuery } from '@apollo/client'
import { Table, Search } from 'semantic-ui-react'
import GenericTable from './components/GenericTable';
import { useState } from 'react';

const query = gql`
query {
  totalBooks{
    id
    author
    title
    date
  }
}

`

function App() {
  let [retrivedBooks, setBooks] = useState({
    totalBooks: []
  })
  const {loading, error, data} = useQuery(query, {onCompleted: setBooks})

  const sortBookByDate = () => {
    let sortedBooks = retrivedBooks.totalBooks.slice().sort((a, b) => a.date - b.date)
    setBooks({
      totalBooks: sortedBooks
    })
  }

  const sortByAuthor = () => {
    let sortedBooks = retrivedBooks.totalBooks.slice().sort((a, b) => a.author.localeCompare(b.author))
    setBooks({
      totalBooks: sortedBooks
    })
  }

  const searchByName = (e) => {
    let foundBook = retrivedBooks.totalBooks.find((book) => book.title.toLowerCase() === e.target.value.toLowerCase())
    if (foundBook) {
      setBooks({
        totalBooks: [foundBook]
      })
    }
  }

  if (data) {
    return (
    <div className="App">

      <div className='search'>
         <input type="text" placeholder="Search by Name" onChange={(e) => searchByName(e)}/>
      </div>

`     <input type="checkbox" id="sortByDate" onClick={() => sortBookByDate()}/>
      <label for="sortByDate">Sort by Date</label>

      <br />

      <input type="checkbox" id="sortByAuthor" onClick={() => sortByAuthor()}/>
      <label for="sortByAuthor">Sort by Author</label>

    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
          {
            !retrivedBooks ? "Sorry no data available" :
            retrivedBooks.totalBooks.map((book) => (
                <GenericTable book={book}/>
            ))
          }
      </Table.Body>
    </Table>
    </div>
    );
  }

  if (error) {
    <h1>Something wrong occurred....</h1>
  }
  
}

export default App;
