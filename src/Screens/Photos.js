import React, {Component} from 'react';
import { Platform, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail, Left, Right, Button, Icon } from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class Photos extends Component{

    constructor(props) {
        super(props);
        this.state = {
          photos: []
        };
      }
    
      componentDidMount() {
        const {navigation} = this.props;
        const albumId = navigation.getParam('albumId')
        this.getUsers(albumId);
      }
    
      
      getUsers = (albumId) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
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
              {/* <CardItem header bordered>
                <Text>{item.title}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    {item.url}
                  </Text>
                </Body>
              </CardItem>
              <Thumbnail square large source={{uri: item.thumbnailUrl}} />
               */}

            <CardItem>
              <Left>
                <Body>
                  <Text>{item.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: item.url}} style={{height: 150, width: null, flex: 1}}/>
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
