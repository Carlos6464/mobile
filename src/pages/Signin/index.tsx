import React, { useState, useContext} from 'react';
import {    View, 
            Text, 
            StyleSheet,
            Image,
            TextInput,
            TouchableOpacity,
            ActivityIndicator
         } from 'react-native';
import {AuthContext} from '../../contexts/AuthContext'

const SignIn = () => {
    const {signIn, loadingAuth} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email === '' || password === '') return
        await signIn({email, password})
    }

    return (
      <View style={styles.container}>
         <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
         />

         <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Digite seu email'
                placeholderTextColor='#F0F0F0'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                placeholder='Digite sua senha'
                placeholderTextColor='#F0F0F0'
                secureTextEntry={true}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loadingAuth ? (
                    <ActivityIndicator size={25} color="#FFF"/>
                ) : (
                    <Text style={styles.buttonText}>Acessar</Text>
                )}
               
            </TouchableOpacity>
         </View>
      </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E'
    },
    logo: {
        marginBottom: 18
    },
    inputContainer:{
        width: '95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: 34,
        paddingHorizontal: 14
    },
    input:{
        width: '95%',
        height: 50,
        backgroundColor: '#101016',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF'
    },
    button:{
        width:'95%',
        height:50,
        backgroundColor: '#3fffa3',
        borderRadius:4,
        justifyContent:'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#101026'
    }
})
  
export default SignIn;