import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TextInput, ScrollView, Pressable, TouchableOpacity, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const EdicionAnuncio = ({navigation, route}) => {

  let id_anunc = route.params?.id_anunc;

  const {idUser} = useContext(AuthContext);

  // Permisos
  const [cameraPermissionInformation, requestPermission]=ImagePicker.useMediaLibraryPermissions();

  // Campos a llenar
  let [imagen, setImagen] = useState('');
  let [titulo, setTitulo] = useState('');
  let [descripcion, setDescripcion] = useState('');

  // Campos originales de corroboración
  let [idAdminAnuncOriginal, setIdAdminAnuncOriginal] = useState('');
  let [imagenOriginal, setImagenOriginal] = useState('');
  let [estadoAnuncOriginal, setEstadoAnuncOriginal] = useState('');

  // Errores
  const [imagenError, setImagenError] = useState('');
  const [tituloError, setTituloError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');

  // Información subida correcta de la imagen
  const [imagenCorrecta, setImagenCorrecta] = useState('')

  // Validaciones
  const validateImagen = () => {
    if (!imagen) {
      setImagenError('Por favor, inserte la imagen del anuncio');
    } else {
      setImagenError('');
    }
  };
  const validateTitulo = () => {
    if (!titulo) {
      setTituloError('Por favor, indique el título que tendrá el anuncio');
    } else {
      setTituloError('');
    }
  };
  const validateDescripcion = () => {
    if (!descripcion) {
      setDescripcionError('Por favor, indique la descripción que tendrá el anuncio');
    } else {
      setDescripcionError('');
    }
  };

  // Gestion imagen

  async function verifyPermission(){
    if (cameraPermissionInformation.status===ImagePicker.PermissionStatus.UNDETERMINED){
        const permissionResponse=await requestPermission();

        return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status===ImagePicker.PermissionStatus.DENIED){
        Alert.alert(
            'Permisos no concedidos!',
            'Debe permitir acceder a los archivos del dispositivo para añadir anuncios'
        );
      return false
    }
    return true;
  }
  
  const imagenGuardarHandler = async() => {
    const hasPermission=await verifyPermission()
    if (!hasPermission){
        return;
    }
    try {
      setImagenError('');
      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:1
      });
      try {
        setImagenError('');
        let respuestaSubida = await FileSystem.uploadAsync(`${BASE_URL}/anuncios_subir_img`, image.assets[0].uri, {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file'
        });
        if (respuestaSubida.body == 'No hay archivos') {
          setImagenError(respuestaSubida.body);
        } else {
          let nomb_img_con_comillas = respuestaSubida.body
          let nomb_img = nomb_img_con_comillas.replace(/['"]+/g, '')
          setImagen(nomb_img)
          console.log(nomb_img);
          setImagenCorrecta("Se ha subido la imagen correctamente")
        }
      }
      catch {
        // setImagenError('Por favor, inserte la imagen del anuncio');
      }
    }
    catch {
      // setImagenError('Por favor, inserte la imagen del anuncio');
    }
  }

  // Submit
  const handleSubmit = () => {
    validateImagen();
    validateTitulo();
    validateDescripcion();
  };

  const handleEdicion = () => {
    if (!imagenError && !tituloError && !descripcionError) {

      if (idUser != idAdminAnuncOriginal) {
        Alert.alert('Ups!', 'El anuncio que está editando no fue creado por usted. Por favor, contáctese con la persona que lo creó', [
          {
            text: 'Ok',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate('Listado de anuncios');
              }, 100)
            }
          }
        ])
      } else {
        editarAnuncio(idAdminAnuncOriginal, titulo, descripcion, imagen, estadoAnuncOriginal);
      } 
    }
  };

  const editarAnuncio = (fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc, estado_anunc) => {


    // Corroboración imagen del anuncio (si fue agregada o si es la original del anuncio)
    if (imagenOriginal == img_anunc) {

      // Actualizar el anuncio
      var config_edicion = {
        method: 'put',
        url: `${BASE_URL}/anuncios_edicion/${id_anunc}`,
        data: {
          fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc, estado_anunc
        }
      };
      axios(config_edicion)
      .then((response2) => {
        let resp2 = response2.data;
        if (resp2 == 'Se actualizó correctamente el anuncio') {
          Alert.alert('¡Hecho!', 'Se ha actualizado correctamente el anuncio', [
            {
              text: 'Ok',
              onPress: () => {
                setTimeout(() => {
                  navigation.navigate('Listado de anuncios');
                }, 100)
              },
            }
          ])
        } else {
          Alert.alert('Ups!', resp2, [
            {
              text: 'Ok'
            }
          ])
        }
      })
      .catch((error) => {
        console.log(error);
      })

    } else {

      var config = {
        method: 'get',
        url: `${BASE_URL}/anuncios_imagenes/${img_anunc}`,
      };
      axios(config)
      .then((response) => {
        let resp = response.data;
        if (resp == 'No hay registros') {
          
          // Actualizar el anuncio
          var config_edicion = {
            method: 'put',
            url: `${BASE_URL}/anuncios_edicion/${id_anunc}`,
            data: {
              fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc, estado_anunc
            }
          };
          axios(config_edicion)
          .then((response2) => {
            let resp2 = response2.data;
            if (resp2 == 'Se actualizó correctamente el anuncio') {
              Alert.alert('¡Hecho!', 'Se ha actualizado correctamente el anuncio', [
                {
                  text: 'Ok',
                  onPress: () => {
                    setTimeout(() => {
                      navigation.navigate('Listado de anuncios');
                    }, 100)
                  },
                }
              ])
            } else {
              Alert.alert('Ups!', resp2, [
                {
                  text: 'Ok'
                }
              ])
            }
          })
          .catch((error) => {
            console.log(error);
          })
          
  
        } else {
          setImagenError('Por favor, cambie el nombre de la imagen del anuncio ya que tenemos una con el mismo nombre');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  useEffect(() => {

    // Obtencion datos del anuncio pasado por parámetro

    var config = {
      method: 'get',
      url: `${BASE_URL}/anuncios_listado/${id_anunc}`,
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));

      let campo_resp = response.data[0];
      setIdAdminAnuncOriginal(campo_resp.fk_id_admin_anunc);

      

      setImagen(campo_resp.img_anunc);
      setImagenOriginal(campo_resp.img_anunc);
      setImagenCorrecta("El anuncio tendrá la misma imagen con la que se creó.\nSi desea cambiarla seleccione una nueva.");

      setTitulo(campo_resp.titulo_anunc);

      setDescripcion(campo_resp.desc_anunc);
      
      setEstadoAnuncOriginal(campo_resp.estado_anunc);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  return (
    <SafeAreaView style={{flex:1}}>
        {/* Barra de navegación */}
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{
            // navigation.dispatch(DrawerActions.openDrawer())
            navigation.openDrawer();
            }
          }>
          <Icon
              name="menu"
              size={40}
          />
          </TouchableOpacity>
          <ImageBackground
          source={require('../../assets/images/LogoGsA.png')}
          style={{width:37, height:40}}
          />
        </View>

        {/* Vista */}
        <View style={[styles.container_vista]}>
          <View style={styles.contenedor_encabezado}>
            <Text style={styles.titulo}>Edición de anuncio</Text>
            <Text style={styles.subtitulo}>Edita los datos del anuncio</Text>
            <View style={styles.lineaTexto}/>
          </View>
          <ScrollView>
            <View style={styles.cont_1}>
              <View style={styles.campo}>
                <Pressable
                  style={styles.input}
                  onPress={() => imagenGuardarHandler()}
                >
                  <Text style={styles.textInp}>Imagen del anuncio</Text>
                </Pressable>
                { imagenError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{imagenError}</Text>
                </View> : null }
                { imagenCorrecta ? <View style={styles.correct}>
                    <Text style={styles.correctText}>{imagenCorrecta}</Text>
                </View> : null }
              </View>
              <View style={styles.campo}>
                <TextInput
                  style={styles.input}
                  placeholder='Titulo del anuncio'
                  placeholderTextColor={'#666'}
                  value={titulo}
                  onChangeText={setTitulo}
                  onBlur={validateTitulo}
                />
                { tituloError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{tituloError}</Text>
                </View> : null }
              </View>
              <View style={[styles.campo, {height: 90}]}>
                <TextInput
                  style={[styles.input, styles.descInput]}
                  placeholder='Descripción del anuncio'
                  placeholderTextColor={'#666'}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  onBlur={validateDescripcion}
                />
                { descripcionError ? <View style={styles.error}>
                    <Text style={styles.errorText}>{descripcionError}</Text>
                </View> : null }
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.cont_2}>
              <Pressable
                style={styles.btnEditar}
                onPressIn={handleSubmit}
                onPressOut={handleEdicion}
              >
                <Text style={styles.TextEditar}>Actualizar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#dddddd9c',
      paddingTop: 40,
      padding: 20,
    },
    container_vista: {
      flex: 1,
      backgroundColor: '#ffffffee',
      // paddingTop: 20,s
      paddingHorizontal: 20,
    },
    cont_1 : {
      flexGrow: 1,
      justifyContent: 'center',
    },
    cont_2 : {
      flexGrow: 2,
      justifyContent: 'flex-start',
    },
    contenedor_encabezado: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      // marginBottom: 10,
    },
    titulo: {
      fontFamily:'sans-serif',
      fontSize: 26,
      textAlign: 'center',
      fontWeight: '800',
      marginVertical: 18,
    },
    subtitulo: {
      fontFamily:'sans-serif',
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 5,
    },
    lineaTexto: {
      marginTop: 15,
      alignSelf: 'center',
      width: 50,
      height: 2,
      backgroundColor: '#7ED321'
    },
    separator: {
      height: 30,
    },
    campo: {
      // marginTop: 10,
      height: 'auto',
      // marginBottom: 20,
      marginHorizontal: 8,
      marginBottom: 20,
      // backgroundColor: 'red'
    },
    input: {
      height: 50,
      borderColor: '#e2e2e2',
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: '#e2e2e2',
      fontSize: 13,
      padding:15,
      borderRadius: 10,
    },
    descInput: {
      height: '100%',
      // marginBottom: 80,
    },
    textInp: {
      color: '#5a5a5a',
      fontSize: 13,
    },
    btnEditar: {
      // marginVertical: 20,
      backgroundColor: '#7ED321',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      // marginTop: 45,
      width: deviceWidth-230,
    },
    TextEditar: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '800',
      fontSize: 16,
    },
    error: {
      paddingTop: 10,
      marginLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 15,
    },
    correct: {
      paddingTop: 10,
      marginLeft: 10
    },
    correctText: {
      color: 'green',
      fontSize: 15,
    },
});
  

export default EdicionAnuncio
