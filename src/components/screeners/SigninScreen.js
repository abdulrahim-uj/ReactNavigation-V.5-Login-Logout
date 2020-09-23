import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonLinearGradient from 'react-native-linear-gradient';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon_Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../Context';

const SigninScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_TextInputChange: false,
        secureTextEntry: true,
    })
    /* The fnSignIn from App.js Declared */
    const { fnSignIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if(val.length != 0){
            setData({
                ...data,
                email: val,
                check_TextInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_TextInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return(
        <SafeAreaView style={ Styles.initialContainer }>
            <StatusBar backgroundColor="#523F86" barStyle="light-content" />
            <View style={ Styles.initialContainer }>
                <Animatable.View animation="bounceInRight" style={ Styles.header }>
                    <Text style={ Styles.textHeader }>Sign In</Text>
                </Animatable.View>
                <Animatable.View animation="fadeInUpBig" style={ Styles.footer }>
                    <Text style={ Styles.textFooter }>Email</Text>
                    <View style={ Styles.action }>
                        <Icon_FontAwesome 
                            name="user-o"
                            color="#CFC7C8"
                            size={20}
                        />
                        <TextInput 
                            placeholder="Enter your email-id "
                            autoCapitalize="none"
                            style={ Styles.textInput }
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_TextInputChange ? 
                            <Animatable.View animation="bounceIn">
                                <Icon_Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                        : null}
                    </View>
                    <Text style={ [Styles.textFooter, {marginTop: 10}] }>Password</Text>
                    <View style={ Styles.action }>
                        <Icon_Feather 
                            name="lock"
                            color="#CFC7C8"
                            size={20}
                        />
                        <TextInput 
                            placeholder="Enter your password "
                            secureTextEntry={data.secureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={ Styles.textInput }
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? 
                                <Icon_Feather 
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            :
                                <Icon_Feather 
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={ Styles.button }>
                        <TouchableOpacity style={ Styles.signIn } onPress={() => {fnSignIn()}}>
                            <ButtonLinearGradient
                                colors= {['#E54040', '#EC2540']}
                                style={ Styles.signIn }
                            >
                                <Text style={ Styles.textSign }>Sign In</Text>
                            </ButtonLinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Signup')}
                            style={ [Styles.signIn, {borderColor: "#736567", borderWidth: 1, marginTop: 15}] }
                        >
                            <Text style={[Styles.textSign, {color: "#EC2540"}]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
}



const Styles = StyleSheet.create({
    initialContainer: {
        flex: 1,
        backgroundColor: "#523F86"
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    textHeader: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
    },
    textFooter: {
        color: "#523F86",
        fontSize: 18,
    },
    action: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#523F86",
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#000",
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    }
});



export default SigninScreen;