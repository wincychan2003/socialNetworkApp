import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Left, Icon, Content, Card, CardItem, Text, Body, Button } from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class Albums extends Component{

    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
    
      }
    
      componentDidMount() {
        this.getUsers().then(
          users => this.getPosts(users)
        ); 
      }
    
      async getUserName(data, users){
        return new Promise(resolve => {
          let posts = [];
          _.forEach(data, (post) => {
            if(post && post.userId) {
              let userIndex = _.findIndex(users, (user) => user.id === post.userId);
              if(userIndex>=0){
                post.userName = users[userIndex].name;
              } else {
                post.userName = 'anonymous';
              }
              posts.push(post);
            }
          });
          resolve(posts);
        });
    }
      getPosts = (users) => {
        axios.get('https://jsonplaceholder.typicode.com/albums')
        .then((response) => this.getUserName(response.data, users)) 
        .then((data) => {
          this.setState({data});
        })
        .catch((error)=>{
           console.log(error);
        });
      }
      getUsers = async () => {
        return new Promise(resolve => {
          axios.get('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            resolve(response.data)
         
          })
          .catch((error)=>{
            console.log(error);
          });
        });
      }
    
      renderButtons() {
        return this.state.data.map((item) => {
            return (
              

             <Card key={item.id}>
            <CardItem>
              <Left>
                <Icon name="ios-person"/>
                <Body>
                  <Text>{item.userName}</Text>
                  <Text note>{item.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => this.props.navigation.navigate('Photos', {albumId: item.id})} block>
                  <Icon active name="ios-albums" />
                  <Text>View</Text>
                </Button>
              </Left>
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