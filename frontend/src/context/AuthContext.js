import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '../config';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    // const [userToken, setUserToken] = useState(null);
    const [rolUser, setRolUser] = useState(null);
    const [idUser, setIdUser] = useState(null);

    const login = (correo_sena_user, contrasena) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/iniciar_sesion`, {
            correo_sena_user,
            contrasena
        })
        .then(res => {
            respuesta = res.data;
            if (respuesta === 'Se encontró') {
                // console.log("Encontró");
                // console.log(contrasena);
                // return 1;
                axios.post(`${BASE_URL}/get_rol_id`, {
                    correo_sena_user,
                    contrasena
                })
                .then(res_2 => {
                    setTimeout(() => {
                        let rol = (res_2.data[0].fk_tipo_user).toString();
                        setRolUser(rol);
                        AsyncStorage.setItem('rolUser', rol);

                        let id_user = (res_2.data[0].id_user).toString();
                        setIdUser(id_user);
                        AsyncStorage.setItem('idUser', id_user);
                    }, 100)

                    // console.log(res_2.data[0].fk_tipo_user);
                    // console.log(`rol: ${rol}`);
                    // console.log(`id: ${id_user}`);
                    // if (respuesta === 'Se encontró') {
                    //     // console.log("Encontró");
                    //     // console.log(contrasena);
                    //     // return 1;
                        
                    // } else {
                    //     alert(respuesta);
                    //     // return 0;
                    //     // console.log(correo_sena_user);
                    // }
                })
                .catch(e => {
                    // return e;
                    console.log(`Login error ${e}`);
                });
            } else {
                alert(respuesta);
                // return 0;
                // console.log(correo_sena_user);
            }
        })
        .catch(e => {
            // return e;
            console.log(`Login error ${e}`);
        });
        // setUserToken('token');
        // AsyncStorage.setItem('userToken', 'token');
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setRolUser(null);
        setIdUser(null);
        // setUserToken(null);
        AsyncStorage.removeItem('rolUser');
        AsyncStorage.removeItem('idUser');
        // AsyncStorage.removeItem('userToken');
        // AsyncStorage.clear()
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let rolUser = await AsyncStorage.getItem('rolUser');
            let idUser = await AsyncStorage.getItem('idUser');
            // let userToken = await AsyncStorage.getItem('userToken');
            setRolUser(rolUser);
            setIdUser(idUser);
            // setUserToken(userToken);
            setIsLoading(false);
        } catch(e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, rolUser, idUser}}>
            {children}
        </AuthContext.Provider>
    );
}