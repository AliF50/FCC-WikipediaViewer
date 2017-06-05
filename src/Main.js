import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import './Main.css';

const Main = () => {
	return(
		 <Jumbotron>
    		<h1 className = "text-center">Wikipedia Viewer</h1>
    		<p className = "text-center">Returns the top 10 results from your search query.</p>
 		 </Jumbotron>
	)
}

export default Main;