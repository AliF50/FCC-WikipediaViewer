import React, { Component } from 'react';
import Links from './Links.js';
import Main from './Main.js';
import jsonp from 'jsonp';
import {Button, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      searchResults: []
    };
  }

  show(search){ //Have to use JSONP for CORS
    var searchResults = [];
    jsonp('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json', null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data);

        for(var i = 0; i < data[1].length; i++){
          searchResults.push({title: data[1][i], desc: data[2][i], link: data[3][i]});
        }
        this.setState({
          search: data[0],
          searchResults: searchResults
        });
        console.log(this.state.searchResults);
      }
    }.bind(this));
}

  onChange(e){
    this.setState({search: e.target.value});
  }

  render() {
    return (
      <div>
        <Main />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
             <Col componentClass={ControlLabel} sm={2}>
               Search
             </Col>
             <Col sm={4}>
                 <FormControl type="text" placeholder="Search here..." 
                 value = {this.state.search}
                 onChange = {evt => this.onChange(evt)} />
             </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
             <Button onClick = {() => this.show(this.state.search)} bsStyle = "info" id = "button">Search</Button>
             <Button><a href = "https://en.wikipedia.org/wiki/Special:Random" target = "_blank" rel="noopener noreferrer">Random Article</a></Button>
           </Col>
          </FormGroup>
        </Form>
        {this.state.searchResults.map(function(result, i){
            return <Links link = {result.link} title = {result.title} desc = {result.desc} key = {i} />
        })}
      </div>
    );
  }
}

export default App;
