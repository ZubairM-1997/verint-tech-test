import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class GenericTable extends Component {
    render(){
        return (
        <Table.Row key={this.props.book.id}>
            <Table.Cell>
              {this.props.book.title}
            </Table.Cell>

            <Table.Cell>
              {this.props.book.author}
            </Table.Cell>

            <Table.Cell>
              {this.props.book.date}
            </Table.Cell>
          </Table.Row>
        )
    }

}