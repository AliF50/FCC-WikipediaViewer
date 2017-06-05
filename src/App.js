import React, { Component } from 'react';
import jsonp from 'jsonp';
import logo from './logo.svg';
import articleIcon from './images/seo-article-icon.png'
import {Button, Row, Col, Form, FormGroup, Grid, Media, ControlLabel, FormControl} from 'react-bootstrap';
import './App.css';

function Links(props){
  return (
    <Grid>
      <Row className = "show-grid">
        <Col xs = {9} xsOffset = {1}>
          <Media>
            <Media.Left align="middle">
              <img width={64} height={64} src={articleIcon} alt="Image"/>
            </Media.Left>
            <Media.Body>
               <Media.Heading><a href = {props.link} target = "_blank">{props.title}</a></Media.Heading>
                <p>{props.desc}</p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Grid>
    );
}

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

    jsonp('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=' + search, null, function(err, data){
      if(err){
        console.log(err.message);
      }else{
        console.log(data.query.pages);
        for(var i = 0; i < data.query.pages.length; i++){
          searchResults.push
        }
      }
    }.bind(this));
}

  onChange(e){
    this.setState({search: e.target.value});
  }

  render() {
    return (
      <div>
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
             <Button onClick = {() => this.show(this.state.search)}>Search</Button>
             <Button><a href = "https://en.wikipedia.org/wiki/Special:Random" target = "_blank">Random Article</a></Button>
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
