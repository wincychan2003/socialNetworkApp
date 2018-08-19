import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, ListItem, Left, Right, Radio } from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class Todos extends Component{

    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }
  
    componentDidMount() {
      const {navigation} = this.props;
      const id = navigation.getParam('id');
      this.getPosts(id);
    }
  
    getPosts = (id) => {
      axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
      .then((response) => {
        this.setState({data: response.data});
      })
      .catch((error)=>{
          console.log(error);
      });
    }
      
      renderButtons() {
        return this.state.data.map((item) => {
            return (
              <ListItem key={item.id} selected={true}>
            <Left>
              <Text>{item.title}</Text>
            </Left>
            <Right>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={item.completed}
              />
            </Right>
          </ListItem>
            );
        });
    }
    
      render() {
        return (
          <Container>
            <Content padder>
                {this.renderButtons()}
            </Content>
          </Container>
        );
      }
    
}
