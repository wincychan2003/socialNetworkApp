import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body, Button, Left, Right, Icon} from "native-base";
import axios from 'axios';
import Settings from '../Configs/Settings'

/**
 * Users is component to view all user in card item list,
 * each user have buttons to view the detail of user and their todo list
 *
 * state:
 *  users: list of user
 *
 * Author: Wincy Chan
 */

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axios.get(`${Settings.api_endpoint}/users`)
            .then((response) => {
                this.setState({users: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    renderContent() {
        return this.state.users.map((item) => {
            return (
                <Card key={item.id}>
                    <CardItem>
                        <Left>
                            <Icon name="ios-person"/>
                            <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.phone}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent
                                    onPress={() => this.props.navigation.navigate('UserDetails', {id: item.id})} block>
                                <Icon active name="ios-contact"/>
                                <Text>View</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate('Todos', {id: item.id})}
                                    block>
                                <Icon active name="ios-list"/>
                                <Text>To-do</Text>
                            </Button>
                        </Right>
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