import React, { useState, useEffect, useCallback, useContext } from 'react'
import { SafeAreaView, View, Text, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
// import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

// const imgDir = FileSystem.documentDirectory + 'images/';

// const ensureDirExists = async () => {
//   const dirInfo = await FileSystem.getInfoAsync(imgDir);
//   if(!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
//   }
// }

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const AgregarAnuncios = ({navigation}) => {

  const {idUser} = useContext(AuthContext);

  // Permisos
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const [image, setImage] = useState(null);
  const [cameraPermissionInformation, requestPermission]=ImagePicker.useMediaLibraryPermissions();
  // const [loading, setLoading] = useState(false);

  // Campos a llenar
  let [imagen, setImagen] = useState('');
  let [titulo, setTitulo] = useState('');
  let [descripcion, setDescripcion] = useState('');

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
          setImagenCorrecta("Se ha subido la imagen correctamente")
        }
      }
      catch {
        setImagenError('Por favor, inserte la imagen del anuncio');
      }
    }
    catch {
      setImagenError('Por favor, inserte la imagen del anuncio');
    }
    

    // if (!image) {
    //   console.log("No seleccionó imagen")
    // } else {
    //   console.log("namefoto", image.assets[0].fileName)
    // }

    // if (image.assets[0]) {
    //   console.log("namefoto", image.assets[0].fileName)
    // } else {
    //   console.log("No seleccionó imagen")
    // }

    // subirImg(image);
    // try {

    // let respuestaSubida = await FileSystem.uploadAsync(`${BASE_URL}/anuncios_subir_img`, image.assets[0].uri, {
    //   httpMethod: 'POST',
    //   uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //   fieldName: 'file'
    // });
    // let imgen = respuestaSubida.body
    // console.log(imgen)

    // }
    // catch {
    //   console.log("error")
    // }
    
    // image.assets[0].fileName = new Date().getTime()+'.jpg'
    // setImage(image.assets)
    // console.log(image.assets[0])
    // const formdata = new FormData()
    // formdata.append('file', JSON.stringify(image))
    // formdata.append('file',{
    //   uri: image.assets[0].uri,
    //   type: image.assets[0].type,
    //   filename: image.assets[0].fileName,
    // })

    // let res = await fetch(
    //   BASE_URL+'/anuncios_subir_img',
    //   {
    //     method: 'post',
    //     body: formdata,
    //     headers: {
    //       "Content-Type" : 'multipart/form-data',
    //     }
    //   }
    // )
    // let respuesta = await res.json();
    // console.log(respuesta,"respuestaaaaaa")
    // var config = {
    //   headers: {
    //     "Content-Type" : 'multipart/form-data',
    //   },
    //   transformRequest: () => {
    //     return formdata
    //   }
    // }
    // let subida = await axios.post(`${BASE_URL}/anuncios_subir_img`, formdata, config);
    
    // subirImg(image)
    // var config = {
    //   method: 'post',
    //   url: `${BASE_URL}/anuncios_subir_img`,
    //   data: formdata,
    //   headers: {
    //     "Content-Type" : 'multipart/form-data',
    //   },
    // };
    // axios(config)
    // .then((response) => {
    //   let resp = response.data;
    //   if (resp == 'No hay archivos') {
    //     setImagenError('Por favor, incerte la imagen del anuncio');
    //   } else {
    //     console.log(resp)
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }
  // const subirImg = async(image) => {

  //   try {
  //     await FileSystem.uploadAsync(`${BASE_URL}/anuncios_subir_img`, image.assets[0].uri, {
  //       httpMethod: 'POST',
  //       uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  //       fieldName: 'file'
  //     });
  //   }
  //   catch {
  //     console.log("error")
  //   }
    // var config = {
    //     method: 'post',
    //     url: `${BASE_URL}/anuncios_subir_img`,
    //     data: image.assets[0].uri,
    //     headers: {
    //       "Content-Type" : 'multipart/form-data',
    //     },
    //     transformRequest: () => {
    //       return image.assets[0].uri
    //     }
    //   };
    // axios(config)
    // .then((response) => {
    //   let resp = response.data;
    //   if (resp == 'No hay archivos') {
    //     setImagenError('Por favor, inserte la imagen del anuncio');
    //   } else {
    //     console.log(resp)
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })

    // const formdata = new FormData()
    // formdata.append('file', JSON.stringify(image.assets[0]))

    // let res = await fetch(
    //   BASE_URL+'/anuncios_subir_img',
    //   {
    //     method: 'post',
    //     body: formdata,
    //     headers: {
    //       "Content-Type" : 'multipart/form-data',
    //     }
    //   }
    // )
    // let respuesta = await res.json();
    // console.log(respuesta,"respuestaaaaaa")
    
  // }

  // const subirImg = async (uri) => {
  //   setLoading(true)

  //   await FileSystem.uploadAsync(`${BASE_URL}/anuncios_subir_img`, uri, {
  //     httpMethod: 'POST',
  //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  //     fieldName: 'file'
  //   });

  //   setLoading(false)
  //   console.log(uri)
  // }

  // let imagePreview=<Text style={styles.previewText}>No image taken yet</Text>




  // useEffect(() => {
  //   (async () => {
  //     const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === 'granted');
  //   })();
  // }, [])

  // const seleccionarImagen = async () => {

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4,3],
  //     quality: 1,
  //   });

  //   console.log(result)

    // if (!result.canceled) {
    //   setImage(result);
    // }
    // if (useLibrary) {
    //   result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   })
    // } else {
    //   result = await ImagePicker.launchCameraAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   })
    // }
   

    // const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // })

    // if (!result.canceled) {

    // }
  // };

  // if (hasGalleryPermission === false) {
  //   return <Text>No hay acceso al almacenamiento interno</Text>
  // }
  
  // const openGallery = () => {
  //   let options = {
  //       // maxHeight: 200,
  //       // maxWidth: 200,
  //       mediaType: 'photo',
  //       quality: 1,
  //       // selectionLimit: 1,
  //       includeBase64: true,
  //   }

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log("Se canceló la carga")
  //     } else if (response.errorCode == 'permission') {
  //       console.log('Permiso no consedido');
  //     } else if (response.errorCode == 'others') {
  //       console.log(response.errorMessage);
  //     } else {
  //       console.log(response)
        // const formdata = new FormData()
        // formdata.append('file',{
        //   uri: response.assets[0].uri,
        //   type: response.assets[0].type,
        //   name: response.assets[0].fileName,
        // })
        // var config = {
        //   method: 'post',
        //   url: `${BASE_URL}/anuncios_subir_img`,
        //   data: formdata,
        //   headers: {
        //     "Content-Type" : 'multipart/form-data',
        //   },
        // };
        // axios(config)
        // .then((response) => {
        //   let resp = response.data;
        //   if (resp == 'No hay archivos') {
        //     setImagenError('Por favor, incerte la imagen del anuncio');
        //   } else {
        //     console.log(resp)
        //   }
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
    //   }
    // })

    // const images = await launchImageLibrary(options);

    // console.log(images.assets[0])
    // const formdata = new FormData()
    // formdata.append('file',{
    //   uri: images.assets[0].uri,
    //   type: images.assets[0].type,
    //   name: images.assets[0].fileName,
    // })
    // // formdata.append('file',JSON.stringify([]))
    
    // var config = {
    //   method: 'post',
    //   url: `${BASE_URL}/anuncios_subir_img`,
    //   data: formdata,
    //   headers: {
    //     "Content-Type" : 'multipart/form-data',
    //   },
    // };
    // axios(config)
    // .then((response) => {
    //   let resp = response.data;
    //   if (resp == 'No hay archivos') {
    //     setImagenError('Por favor, incerte la imagen del anuncio');
    //   } else {
    //     console.log(resp)
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })

    // FormData.append('form',JSON.stringify([]))
  // }


  // Submit
  const handleSubmit = () => {
    validateImagen();
    validateTitulo();
    validateDescripcion();
  };

  const handleCreacion = () => {
    if (!imagenError && !tituloError && !descripcionError) {
      agregarAnuncio(idUser, titulo, descripcion, imagen);
    }
  };

  const agregarAnuncio = (fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc) => {

    var config = {
      method: 'get',
      url: `${BASE_URL}/anuncios_imagenes/${img_anunc}`,
    };
    axios(config)
    .then((response) => {
      let resp = response.data;
      if (resp == 'No hay registros') {
        
        // Guardar el registro
        var config_reg = {
          method: 'post',
          url: `${BASE_URL}/anuncios_agregar`,
          data: {
            fk_id_admin_anunc, titulo_anunc, desc_anunc, img_anunc
          }
        };
        axios(config_reg)
        .then((response2) => {
          let resp2 = response2.data;
          if (resp2 == 'Se agregó correctamente el anuncio') {
            Alert.alert('¡Hecho!', 'Se ha creado correctamente el anuncio', [
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
        // Alert.alert('Ups!', resp, [
        //   {
        //     text: 'Ok'
        //   }
        // ])
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

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
            <Text style={styles.titulo}>Creación de anuncio</Text>
            <Text style={styles.subtitulo}>En este espacio puede crear un nuevo anuncio</Text>
            <Text style={[styles.subtitulo, {marginTop: 6}]}>Seleccione la imagen y escriba el título y descripción que tendrá el anuncio</Text>
            <View style={styles.lineaTexto}/>
          </View>
          <ScrollView>
            <View style={styles.cont_1}>
              <View style={styles.campo}>
                {/* <TextInput
                  style={styles.input}
                  placeholder='Imagen'
                  placeholderTextColor={'#666'}
                  value={imagen}
                  onChangeText={setImagen}
                  onBlur={validateImagen}
                /> */}
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
                style={styles.btnCrear}
                onPressIn={handleSubmit}
                onPressOut={handleCreacion}
              >
                <Text style={styles.TextCrear}>Añadir</Text>
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
    btnCrear: {
      // marginVertical: 20,
      backgroundColor: '#7ED321',
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      // marginTop: 45,
      width: deviceWidth-130,
    },
    TextCrear: {
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
    // container_vista: {
    //   // justifyContent: 'center',
    //   flex: 1,
    //   paddingTop: 20,
    //   paddingHorizontal: 30,
    // },
    // cont_1 : {
    //   flexGrow: 1,
    //   justifyContent: 'center',
    // },
    // cont_2 : {
    //   flexGrow: 2,
    //   justifyContent: 'flex-start',
    // },
    // contenedor_encabezado: {
    //   paddingHorizontal: 10,
    //   paddingVertical: 20,
    //   marginBottom: 40,
    // },
    // title: {
    //   fontFamily:'sans-serif',
    //   fontSize: 26,
    //   textAlign: 'center',
    //   fontWeight: '800',
    //   marginVertical: 18,
    // },
    // subtitle: {
    //   fontFamily:'sans-serif',
    //   fontSize: 15,
    //   textAlign: 'center',
    //   lineHeight: 23,
    // },
    // lineaTexto: {
    //   marginTop: 15,
    //   alignSelf: 'center',
    //   // paddingHorizontal: 50,
    //   width: 50,
    //   height: 2,
    //   backgroundColor: '#7ED321'
    // },
    // input: {
    //   height: 45,
    //   fontSize: 15,
    //   borderColor: '#e2e2e2',
    //   // borderStyle: 0,
    //   backgroundColor: '#e2e2e2',
    //   borderWidth: 1,
    //   borderRadius: 10,
    //   marginTop: 20,
    //   paddingHorizontal: 10,
    //   paddingLeft: 20,
    // },
    // error: {
    //   color: 'red',
    //   padding: 10,
    // },
    // separator: {
    //   height: 30,
    // },
    // btnLogin: {
    //   // marginVertical: 20,
    //   alignSelf: 'center',
    //   backgroundColor: '#7ED321',
    //   paddingVertical: 10,
    //   paddingHorizontal: 20,
    //   borderRadius: 10,
    //   marginBottom: 20,
    //   width: deviceWidth-130,
    // },
    // btnRecupContra: {
    //   // marginVertical: 20,
    //   backgroundColor: '#73c120',
    //   alignSelf: 'center',
    //   paddingVertical: 10,
    //   paddingHorizontal: 20,
    //   borderRadius: 10,
    //   width: deviceWidth-130,
    // },
    // btnText: {
    //   textAlign: 'center',
    //   color: '#fff',
    //   fontWeight: '800',
    //   fontSize: 16,
    // }
});
  

export default AgregarAnuncios
