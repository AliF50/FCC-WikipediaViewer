import React from 'react';
import articleIcon from './images/seo-article-icon.png'
import {Grid, Row, Col, Media} from 'react-bootstrap';

const Links = (props) => {
	return (
    <Grid>
      <Row className = "show-grid">
        <Col xs = {9} xsOffset = {1}>
          <Media>
            <Media.Left align="middle">
              <img width={64} height={64} src={articleIcon} alt="article"/>
            </Media.Left>
            <Media.Body>
               <Media.Heading><a href = {props.link} target = "_blank" rel="noopener noreferrer">{props.title}</a></Media.Heading>
                <p>{props.desc}</p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Grid>
    );
}

export default Links;