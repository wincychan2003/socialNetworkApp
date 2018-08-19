import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail } from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class Comments extends Component{

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
      }
    
      componentDidMount() {
        const {navigation} = this.props;
        const postId = navigation.getParam('postId')
        this.getUsers(postId);
      }
    
      
      getUsers = (postId) => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
         .then((response) => {
             console.log(response)
          this.setState({comments: response.data});
         })
        .catch((error)=>{
           console.log(error);
        });
      }
    
      renderButtons() {
        return this.state.comments.map((item) => {
            return (
              <Card key={item.id}>
              <CardItem header bordered>
                <Text>{item.name}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    {item.body}
                  </Text>
                </Body>
              </CardItem>
              <CardItem header bordered>
                <Text>{item.email}</Text>
              </CardItem>
            </Card>
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