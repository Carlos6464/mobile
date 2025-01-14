import React, {useState, createContext, ReactNode, useEffect} from "react";
import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextDate = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string
}

type AuthProviderProps  = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string
}


export const AuthContext = createContext({} as AuthContextDate);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const isAuthenticated = !!user.name;
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const userInfo = await AsyncStorage.getItem("@sujeitopizzaria")
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common[`Authorization`] = `Bearer ${hasUser.token}`
                setUser({
                   id: hasUser.id,
                   name: hasUser.name,
                   email: hasUser.email,
                   token: hasUser.token 
                }) 
            }

            setLoading(false)
        }

        getUser()
    }, [])

    const signIn = async ({ email, password}:SignInProps ) => {
        setLoadingAuth(true)

        try {
           const response = await  api.post('/auth/login',{email, password})
           const {id, name, token} = response.data;
           const data = {...response.data}
           await AsyncStorage.setItem("@sujeitopizzaria", JSON.stringify(data))
           
           api.defaults.headers.common[`Authorization`] = `Bearer ${token}`
           setUser({
             id,
             name,
             email,
             token
           })
           setLoadingAuth(false)
        } catch (error) {
            console.log('Error ao acessar: ', error);
            setLoadingAuth(false)
        }
    }

    const signOut = async () => {
        await AsyncStorage.clear().then(() => {
            setUser({
                id:'',
                name:'',
                email:'',
                token:''
            })
        })
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, loadingAuth, loading, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
