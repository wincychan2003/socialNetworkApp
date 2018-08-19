import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body} from "native-base";
import axios from 'axios';
import Settings from '../Configs/Settings'

/**
 * Comments is component to view all Comments in list under post,
 * 
 * state:
 *  comments: list of comments
 *
 * Author: Wincy Chan
 */
export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const postId = navigation.getParam('postId');
        this.getUsers(postId);
    }


    getUsers = (postId) => {
        axios.get(`${Settings.api_endpoint}/comments?postId=${postId}`)
            .then((response) => {
                this.setState({comments: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    renderContent() {
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
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }

}
