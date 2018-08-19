import React, {Component} from 'react';
import {Container, Left, Icon, Content, Card, CardItem, Text, Body, Button} from "native-base";
import axios from 'axios';
import _ from 'lodash';

export default class Albums extends Component {

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

    async getUserName(data, users) {
        return new Promise(resolve => {
            let posts = [];
            _.forEach(data, (post) => {
                if (post && post.userId) {
                    let userIndex = _.findIndex(users, (user) => user.id === post.userId);
                    if (userIndex >= 0) {
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
            .catch((error) => {
                console.log(error);
            });
    };

    getUsers = async () => {
        return new Promise(resolve => {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    resolve(response.data)

                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    renderContents() {
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
                    <CardItem footer bordered>
                        <Button onPress={() => this.props.navigation.navigate('Photos', {albumId: item.id})} block>
                            <Icon active name="ios-albums"/>
                            <Text>View</Text>
                        </Button>
                    </CardItem>
                </Card>
            );
        });
    }

    render() {
        return (
            <Container>
                <Content padder>
                    {this.renderContents()}
                </Content>
            </Container>
        );
    }
}