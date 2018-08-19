import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail } from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class UserDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
          photos: []
        };
      }
    
      componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.getUsers(id);
      }
    
      
      getUsers = (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
         .then((response) => {
             console.log(response)
          this.setState({photos: response.data});
         })
        .catch((error)=>{
           console.log(error);
        });
      }
    
      renderButtons() {
        return this.state.photos.map((item) => {
            return (
              <Card key={item.id}>
              <CardItem header bordered>
                <Text>Name: {item.name}</Text>
              </CardItem>
              <CardItem header bordered>
                <Text>Username: {item.username}</Text>
              </CardItem>
              <CardItem header bordered>
                <Text>Email: {item.email}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    {item.address.street}
                  </Text>
                  <Text>
                    {item.address.suite}
                  </Text>
                  <Text>
                    {item.address.city}
                  </Text>
                  <Text>
                    {item.address.zipcode}
                  </Text>
                </Body>
              </CardItem>
              <CardItem header bordered>
                <Text>{item.phone}</Text>
              </CardItem>
              
              <CardItem header bordered>
                <Text>{item.website}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    {item.company.name}
                  </Text>
                  <Text>
                    {item.company.catchPhrase}
                  </Text>
                  <Text>
                    {item.company.bs}
                  </Text>
                </Body>
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
