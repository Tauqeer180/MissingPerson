import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
export default class LayoutExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Grid>
          <Col size={50} style={{ backgroundColor: '#635DB7', height: 200 }}></Col>
          <Col size={50} style={{ backgroundColor: '#00CE9F', height: 200}}></Col>
          <Col size={50} style={{ backgroundColor: '#00F', height: 100 }}></Col>
        </Grid>
      </Container>
    );
  }
}
