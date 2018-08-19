import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body, Left} from "native-base";
import axios from 'axios';

export default class UserDetails extends Component {

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
                this.setState({photos: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    renderContent() {
        return this.state.photos.map((item) => {
            return (
                <Card key={item.id}>
                    <CardItem header bordered>
                        <Text>{item.name}</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Username:</Text>
                        </Left>
                        <Body>
                        <Text>{item.username}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Email:</Text>
                        </Left>
                        <Body>
                        <Text>{item.email}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Address:</Text>
                        </Left>
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
                    <CardItem>
                        <Left>
                            <Text>Phone:</Text>
                        </Left>
                        <Body>
                        <Text>{item.phone}</Text>
                        </Body>
                    </CardItem>

                    <CardItem>
                        <Left>
                            <Text>Website:</Text>
                        </Left>
                        <Body>
                        <Text>{item.website}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Company Name:</Text>
                        </Left>
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
                    <CardItem>
                        <Left>
                            <Text>Company Catch Phrase:</Text>
                        </Left>
                        <Body>
                        <Text>
                            {item.company.catchPhrase}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Company Business:</Text>
                        </Left>
                        <Body>
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
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }

}
