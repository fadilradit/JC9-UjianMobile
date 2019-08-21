import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'




import Fire from '../firebase'

class AddDiaryScreen extends Component {

    state = {
        title: '',
        diary: '',
        date: ''
    }

    // variable tanggal akan di isi tanggal yang dipilih oleh user
    

    addDiary = async () => {
        await Fire.database().ref(`diary/${this.props.uid}`)
        .push({
            title: this.state.title,
            diary: this.state.diary,
            date: this.state.date
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Buat Data Karyawan</Text>
                    <View style={styles.wrapper}>
                    <Item rounded>
                            <Input
                                placeholder='Nama'
                                onChangeText={(text) => this.setState({date: text})}
                            />
                        </Item>
                        <Item rounded>
                            <Input
                                placeholder='Usia'
                                onChangeText={(text) => this.setState({title: text})}
                            />
                        </Item>
                        <Item rounded>
                        <Input
                            placeholder = 'Jabatan'
                            onChangeText={(text) => this.setState({diary: text})}
                        />
                        </Item>
                        <View style={styles.button}>
                            <Button block onPress={this.addDiary}>
                                <Text>Masukan</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddDiaryScreen)