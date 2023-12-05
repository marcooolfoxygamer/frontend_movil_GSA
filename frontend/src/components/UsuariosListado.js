import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Alert, Button } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import EdicionUsuario from '../screens/Administrador/EdicionUsuario';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// const ruta_img = '../assets/images/anuncios/';

const UsuariosListado = ({ item, navigation }) => {

    const { id_user, tipo_user, nom1_user, ape1_user, ape2_user, correo_sena_user, fk_anteced_salud_sel, anteced_salud_inp, estado_user  } = item


    return (
        <View style={styles.content}>
            <View style={styles.tableContainer}>
                <View style={styles.outerTableContainer}>
                    <View style={styles.innerTableContainer}>
                    {/* <View style={styles.table}> */}
                        {/* <View style={styles.tableHeader}>
                        </View> */}
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Identificación</Text>
                                <Text style={styles.value}>{id_user}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>T. Usuario</Text>
                                <Text style={styles.value}>{tipo_user}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>P. Nombre</Text>
                                <Text style={styles.value}>{nom1_user}</Text>
                            </View>
                            {/* lo que sigue abajo es para quitar una linea que estaba cerrando en cada celda de la parte de la derecha y toco de esta forma y se veia feo :v */}
                            <View style={[styles.cell, { borderRightWidth: 0 }]}>  
                                <Text style={styles.label}>P. Apellido</Text>
                                <Text style={styles.value}>{ape1_user}</Text>
                            </View>
                        </View>
                        <View style={{height:5}} />
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>S. Apellido</Text>
                                <Text style={styles.value}>{ape2_user}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Correo</Text>
                                <Text style={styles.value}>{correo_sena_user}</Text>
                            </View>
                            <View style={[styles.cell, { borderRightWidth: 0 }]}>
                                <Text style={styles.label}>Antecedente #1</Text>
                                <Text style={styles.value}>{fk_anteced_salud_sel}</Text>
                            </View>
                        </View>
                        <View style={{height:5}} />
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Antecedente #2</Text>
                                <Text style={styles.value}>{anteced_salud_inp}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Estado del usuario</Text>
                                <Text style={styles.value}>{estado_user}</Text>
                            </View>
                            <View style={styles.cell_acciones}>
                                <Text style={styles.label}>Acciones</Text>
                                <View style={styles.cont_acciones}>
                                    <Pressable style={styles.btnEdicion}
                                        onPress={
                                            () => navigation.navigate('Edicion usuario', {id_user: id_user})
                                            // () => <EdicionUsuario navigation={navigation} id_user={id_user} getUsuarios={getUsuarios()}/>
                                        }
                                    >
                                        <Text style={styles.textoAccion}>Editar</Text>
                                        {/* <Button
                                            title="Editar"
                                            style={styles.buttonEdit}
                                            color="#FFD700" // Color amarillo
                                            onPress={() => handleEditPress(id_user)} // función que manejará la acción de editar
                                        /> */}
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgb(242, 242, 242)',
      },
    tableContainer: {
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 5,
        marginVertical: 10,
        // marginBottom: 20,
        // marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgb(247, 247, 247)'
    },
    outerTableContainer: {
        marginHorizontal: 10,
    },
    innerTableContainer: {
        // height: 'auto',
        // borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        // marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: 'white'
        // borderBottomWidth: 1
        // marginVertical: 10,
        // borderBottomWidth: 5,
    },
    cell: {
        flex: 1,
        padding: 4,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    cell_acciones: {
        flex: 1,
        padding: 4,
        justifyContent: 'center',
        alignContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 7,
        fontSize: 10,
        textAlign: 'center',
    },
    value: {
        fontSize: 10,
        textAlign: 'center',
        alignSelf: 'center',
    },
    cont_acciones: {
        // flex: 1,
        alignItems: 'center',
    },
    btnEdicion: {
        backgroundColor:"#eecd10",
        justifyContent: 'center',
        alignContent: 'center',
        height: 25,
        width: 50,
        borderRadius: 6,
    },
    textoAccion: {
        fontSize: 12,
        textAlign: 'center',
    },
});

export default UsuariosListado