import React, {Component} from 'react';
import {Container, Content, Left, Card, CardItem, Text, Body, Button, Icon} from "native-base";
import axios from 'axios';
import _ from 'lodash';
import Settings from '../Configs/Settings'

/**
 * Posts is component to view all post in list,
 * each post have comment button to navigate comments component to view related 
 * comments
 *
 * state:
 *  data: list of comments
 *
 * Author: Wincy Chan
 */
export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.getUsers().then(users => {
            this.getPosts(users);
        });
    }

    /**
     * Get username by id of user from Users
     * @param {*} data list of albums
     * @param {*} users list of post item
     */
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
        axios.get(`${Settings.api_endpoint}/posts`)
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
            axios.get(`${Settings.api_endpoint}/users`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    resolve(error)
                });
        });
    };

    renderPost() {
        return this.state.data.map((item) => {
            return (
                <Card key={item.id}>
                    <CardItem header bordered>
                        <Body>
                        <Left>
                            <Text>{item.title}</Text>
                            <Text note>
                                {item.body}
                            </Text>
                        </Left>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name="ios-person"/>
                            <Body>
                            <Text>{item.userName}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                    <CardItem footer bordered>
                        <Button onPress={() => this.props.navigation.navigate('Comments', {postId: item.id})} block>
                            <Icon active name="chatbubbles"/>
                            <Text>Comments</Text>
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
                    {this.renderPost()}
                </Content>
            </Container>
        );
    }
}