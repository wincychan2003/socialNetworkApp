/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import axios from 'axios';
import _ from 'lodash';
import { createStackNavigator } from 'react-navigation';
import Posts from './src/Screens/Posts';
import Comments from './src/Screens/Comments';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const RootStack = createStackNavigator(
  {
    Posts: Posts,
    Comments: Comments,
  },
  {
    initialRouteName: 'Posts',
  }
);

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      users: []
    };

  }

  componentDidMount() {
    this.getUsers();
    this.getPosts();
  }

  async getUserName(data){
    return new Promise(resolve => {
      let posts = [];
      _.forEach(data, (post) => {
        if(post && post.userId) {
          let userIndex = _.findIndex(this.state.users, (user) => user.id === post.userId);
          if(userIndex>=0){
            post.userName = this.state.users[userIndex].name;
          } else {
            post.userName = 'anonymous';
          }
          posts.push(post);
        }
      });
      resolve(posts);
    });
}
  getPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => this.getUserName(response.data)) 
    .then((data) => {
      this.setState({data});
    })
    .catch((error)=>{
       console.log(error);
    });
  }
  getUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
     .then((response) => {
      this.setState({users: response.data});
     })
    .catch((error)=>{
       console.log(error);
    });
  }

  renderButtons() {
    return this.state.data.map((item) => {
        return (
          <Card key={item.id}>
          <CardItem header bordered>
            <Text>{item.title}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {item.body}
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>{item.userName}</Text>
          </CardItem>
        </Card>
        );
    });
}

  render() {
    return (
      <Container>
        <Header />
        <Content padder>
            {/* {this.renderButtons()} */}
            <RootStack/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
