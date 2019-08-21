import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button, Card, CardItem} from 'native-base'
import {connect} from 'react-redux'
import { NavigationEvents } from 'react-navigation'

import {onLogout} from '../store/actions'

import Fire from '../firebase'

class ProfileScreen extends Component {

    state = {
        user: {}
    }

    onPressLogout = async () => {
        // Logout dari firebase
        await Fire.auth().signOut()
        // Logout dari redux
        this.props.onLogout()

        // kembali ke halaman auth
        this.props.navigation.navigate('Auth')
    }

    getUser = () => {
        Fire.database().ref(`users/${this.props.uid}`)
        .once('value', (snapShot) => {
            // jika user di temukan
            if(snapShot.exists()) {
                this.setState({user: snapShot.val()})
            }
        })
    }

    render() {
        let {fullName, nickName, age, address} = this.state.user
        return (
            <View>
                <NavigationEvents
                    // componentDidMount untuk react-navigation
                    onDidFocus = {() => {
                        this.getUser()
                    }}
                />
                <Card>
                    <CardItem style={styles.list}>
                        <Text style={styles.headerText}>Profile Screen</Text>
                        <Button bordered secondary small onPress={this.onPressLogout}>
                            <Text>Logout</Text>
                        </Button>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem style={styles.list}>
                        <Text>Full Name</Text>
                        <Text>{fullName}</Text>
                    </CardItem>
                    <CardItem style={styles.list}>
                        <Text>Nick Name</Text>
                        <Text>{nickName}</Text>
                    </CardItem>
                    <CardItem style={styles.list}>
                        <Text>Age</Text>
                        <Text>{age}</Text>
                    </CardItem>
                    
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue'
    }

})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps, {onLogout})(ProfileScreen)