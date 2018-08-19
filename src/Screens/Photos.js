import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Content, Card, CardItem, Text, Body, Left} from "native-base";
import axios from 'axios';

/**
 * Photos is component to view all phots in list under album,
 * 
 * state:
 *  photos: list of photos
 *
 * Author: Wincy Chan
 */
export default class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const albumId = navigation.getParam('albumId');
        this.getUsers(albumId);
    }

    getUsers = (albumId) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
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
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }

}
