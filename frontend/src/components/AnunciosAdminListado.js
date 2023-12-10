import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// const ruta_img = '../assets/images/anuncios/';

const AnunciosAdminListado = ({ navigation, item, getAnuncios }) => {

    const { id_anunc, fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc, estado_anunc } = item

    let url_img = `${BASE_URL}/images/`;


    const eliminarAnuncio = (id_anunc) => {
        Alert.alert(
            'Confirmación de decisión', 'Está segur@ de que desea eliminar el anuncio?', [
                { text: 'Si', onPress: () => {
                    var config = {
                        method: 'delete',
                        url: `${BASE_URL}/anuncios_eliminacion/${id_anunc}`,
                    };
                
                    axios(config)
                    .then(function (response) {
                        Alert.alert(
                            '¡Hecho!', 'Se eliminó correctamente el anuncio', [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        setTimeout(() => {
                                            getAnuncios();
                                        }, 100)
                                    },
                                  }
                            ]
                        )
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
                }},
                { text: 'No', onPress: () => {
                    console.log("No eliminó");
                }},
            ]
        )
    }


    return (
        <View style={styles.content}>
            <View style={styles.tableContainer}>
                <View style={styles.outerTableContainer}>
                    <View style={styles.innerTableContainer}>
                    {/* <View style={styles.table}> */}
                        {/* <View style={styles.tableHeader}>
                        </View> */}
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={[styles.cell, { borderRightWidth: 0 }]}>
                                <Text style={styles.label}>Imagen</Text>
                                <View style={styles.contenedor_img}>
                                    <Image
                                        source={{uri: url_img+img_anunc}}
                                        style={styles.img}
                                    />
                                </View>
                            </View>
                            {/* <View style={styles.cell}>
                                <Text style={styles.label}>Id. aprendiz</Text>
                                <Text style={styles.value}>{fk_id_aprend_asis}</Text>
                            </View>
                            <View style={[styles.cell, { borderRightWidth: 0 }]}>
                                <Text style={styles.label}>Nombre del aprendiz</Text>
                                <Text style={styles.value}>{nom1_user} {ape1_user} {ape2_user}</Text>
                            </View> */}
                            {/* <View style={[styles.cell, { borderRightWidth: 0 }]}>  
                                <Text style={styles.label}>P. Apellido:</Text>
                                <Text style={styles.value}>{ape1_user}</Text>
                            </View> */}
                        </View>
                        <View style={{height:5}} />
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Id. administrador creador</Text>
                                <Text style={styles.value}>{fk_id_admin_anunc}</Text>
                            </View>
                            <View style={[styles.cell, { borderRightWidth: 0 }]}>
                                <Text style={styles.label}>Titulo anuncio</Text>
                                <Text style={styles.value}>{titulo_anunc}</Text>
                            </View>
                            {/* <View style={[styles.cell, { borderRightWidth: 0 }]}>
                                <Text style={styles.label}>Antecedente #1</Text>
                                <Text style={styles.value}>{fk_anteced_salud_sel}</Text>
                            </View> */}
                        </View>
                        <View style={{height:5}} />
                        <View style={[styles.tableRow, {borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Descripcion</Text>
                                <Text style={styles.value}>{desc_anunc}</Text>
                            </View>
                            {/* <View style={styles.cell}>
                                <Text style={styles.label}>Fecha asistencia</Text>
                                <Text style={styles.value}>{fecha_asis_estandar}</Text>
                            </View> */}
                            <View style={styles.cell_acciones}>
                                <Text style={styles.label}>Acciones</Text>
                                <View style={styles.cont_acciones}>
                                    <Pressable style={styles.btnEdicion}
                                        onPress={() => navigation.navigate('Edicion anuncio', {id_anunc: id_anunc})}
                                    >
                                        <Text style={styles.textoAccion}>Editar</Text>
                                    </Pressable>
                                    <Pressable style={styles.btnEliminar}
                                        onPress={() => eliminarAnuncio(id_anunc)}
                                    >
                                        <Text style={styles.textoAccion}>Eliminar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        // <View style={styles.contenedor}>
        //     <View style={styles.division}>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_id]}>Identificación del instructor: <Text style={styles.text_data}>{id_instruc_asis}</Text></Text>
        //         </View>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_id]}>Identificación del aprendiz: <Text style={styles.text_data}>{fk_id_aprend_asis}</Text></Text>
        //         </View>
        //     </View>

        //     <View style={styles.division}>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_nomb]}>Nombre del aprendiz: <Text style={styles.text_data}>{nom1_user} {ape1_user} {ape2_user}</Text></Text>
        //         </View>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_correo]}>Correo aprendiz: <Text style={styles.text_data}>{correo_sena_user}</Text></Text>
        //         </View>
        //     </View>

        //     <View style={styles.division}>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_ant1]}>Antecedente #1: <Text style={styles.text_data}>{fk_anteced_salud_sel}</Text></Text>
        //         </View>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_ant2]}>Antecedente #2:
        //             { !anteced_salud_inp ? 
        //                 <Text style={styles.text_data}> Ninguno</Text>
        //             : <Text style={styles.text_data}> {anteced_salud_inp}</Text>
        //             }
        //             </Text>
        //         </View>
        //         <View style={styles.row}>
        //             <Text style={[styles.campo, styles.text_fecha]}>Fecha asistencia: <Text style={styles.text_data}>{fecha_asis_estandar}</Text> </Text>
        //         </View>
        //     </View>

        //     <View style={[styles.division,styles.acciones]}>
        //         <Pressable
        //             style={styles.btnEdicion}
        //             onPress={() => navigation.navigate('Edicion asistencia', {id_registro_asis: id_registro_asis})}
        //         >
        //             <Text style={styles.textoAccion}>Editar</Text>
        //         </Pressable>
        //         <Pressable
        //             style={styles.btnEliminacion}
        //             onPress={() => eliminarAsistencia(id_registro_asis)}
        //         >
        //             <Text style={styles.textoAccion}>Eliminar</Text>
        //         </Pressable>
        //     </View>
        // </View>
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
    contenedor_img: {
        alignSelf: 'center',
        width: 260,
        height: 260,
        // backgroundColor: 'green'
    },
    img: {
        width: '100%',
        height: '100%',
        // resizeMode: 'center'
        resizeMode: 'contain'
        // maxWidth: 300,
        // maxHeight: 300,
    },
    cell_acciones: {
        flex: 1,
        padding: 4,
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
        paddingHorizontal: 5,
    },
    cont_acciones: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignContent: 'center',
        alignItems: 'center',
        // alignItems: 'center',
    },
    btnEdicion: {
        backgroundColor:"#eecd10",
        justifyContent: 'center',
        alignContent: 'center',
        height: 25,
        width: 48,
        borderRadius: 6,
    },
    btnEliminar: {
        backgroundColor:"#ee1010",
        justifyContent: 'center',
        alignContent: 'center',
        height: 25,
        width: 48,
        borderRadius: 6,
    },
    textoAccion: {
        fontSize: 10,
        textAlign: 'center',
    },
    // contenedor: {
    //     backgroundColor: 'rgb(247, 247, 247)',
    //     borderWidth: 0.5,
    //     borderColor: 'rgb(247, 247, 247)',
    //     marginBottom: 30,
    //     paddingTop: 15,
    //     borderRadius: 15,
    // },
    // division: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-between',
    //     marginVertical: 5,
    //     paddingHorizontal: 20,
    // },
    // acciones: {
    //     borderTopWidth: 1,
    //     borderTopColor: '#9c9c9c',
    //     justifyContent: 'space-around',
    //     marginVertical: 0,
    //     marginTop: 10,
    //     alignItems: 'center',
    //     alignContent: 'center',
    //     paddingHorizontal: 0,
    //     width: '100%',
    //     height: 40,
    // },
    // campo: {
    //     fontFamily:'sans-serif',
    //     fontSize: 13,
    //     fontWeight: '900',
    // },
    // text_data: {
    //     fontWeight: '400',
    // },

    // btnEdicion: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //     // backgroundColor: 'rgb(220, 161, 12)',
    //     backgroundColor: 'rgba(255, 215, 113, 0.42)',
    //     borderRightWidth: 1,
    //     borderRightColor: '#9c9c9c',
    //     height: '100%',
    //     width: '100%',
    //     borderBottomLeftRadius: 15,
    // },
    // btnEliminacion: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //     // backgroundColor: 'rgb(238, 70, 70)',
    //     backgroundColor: 'rgba(238, 70, 70, 0.367)',
    //     height: '100%',
    //     width: '100%',
    //     borderBottomRightRadius: 15,
    // },
    // textoAccion: {
    //     fontSize: 13,
    //     textAlign: 'center',
    // }
});

export default AnunciosAdminListado