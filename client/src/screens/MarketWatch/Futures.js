import React from 'react'
import axios from 'axios'
import SearchBox from '../../components/SearchBox/SearchBox'
import FilterList from '../../components/List/FilterList'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

const URLS = {
  MARKET_WATCH: 'https://www.marketwatch.com/investing/future/',
}

export default class Futures extends React.Component {
  state = {
    list: [],
    text: ''
  }

  async componentDidMount() {
    const futures = await axios.get('http://localhost:3000/api/futures/list')
    const list = futures.data.list.map(({name}) => name)
    this.setState({
      list,
      group: this.groupList(list)
    })
  }

  groupList(list) {
    const j = list
      .filter((string) => !string.endsWith('00'))
      .map((string) => string.replace(string.slice(-3), ''))

    return [...new Set(j)]
  }

  inputText = (ele) => {
    this.setState({
      text: ele.target.value.toUpperCase()
    })
  }

  render() {
    return (
      <>
        <BreadCrumbs />
        <div className="row">
          <div className="col">
            <SearchBox
              text={this.state.text}
              label="Futures Symbol"
              inputFunc={this.inputText}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <FilterList
              label="Full List"
              list={this.state.list}
              text={this.state.text}
              link={URLS.MARKET_WATCH}
            />
          </div>
          <div className="col">
            <FilterList
              label="Group List"
              list={this.state.group}
              text={this.state.text}
            />
          </div>
        </div>
      </>
    )
  }
}
