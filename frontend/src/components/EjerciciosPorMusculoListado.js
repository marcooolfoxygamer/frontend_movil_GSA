import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { BASE_URL } from '../config';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// const ruta_img = '../assets/images/anuncios/';

const EjerciciosPorMusculoListado = ({ navigation, item }) => {

    const { pkfk_musculo, pkfk_ejercicio, imagen_ejerc } = item

    let url_img = `${BASE_URL}/images/ejercicios_gifs/`;
    // console.log('url', BASE_URL+img_anunc);
    // let imagen = '../assets/images/anuncios/'+imagen_ejerc;

    return (
        <View style={{marginBottom: 10}}>
            <View style={styles.contenedor_img}>
                <Image
                    source={{uri: url_img+imagen_ejerc}}
                    style={styles.img}
                />
            </View>
            <View style={styles.contenedor_texto}>
                <Text style={styles.titulo}>{pkfk_ejercicio}</Text>
                { pkfk_ejercicio == 'Leg-press' && (
                    <Text style={styles.descripcion}>
                        Sentad@ en el la silla de la prensa, con los pies planos en la plataforma y los hombros separados,
                        suelte el seguro manual y baje lentamente la carga llevando las rodillas hacia el pecho. Cuando las rodillas estén en un ángulo de 90°,
                        haga una pausa y luego suba lentamente el peso. Para proteger las rodillas, detenga el movimiento justo antes de que las piernas
                        estén completamente extendidas. Durante el movimiento, no levante los glúteos de la silla.
                    </Text>
                )}
                { pkfk_ejercicio == 'Extension de pierna' && (
                    <Text style={styles.descripcion}>
                        Ajuste la máquina de extensión de piernas de manera que cuando se siente, sus rodillas estén al borde de la silla y sus tobillos estén debajo del reposapiés.
                        Siéntese con la espalda bien apoyada en el respaldo, sosteniendo los objetos que se encuentran a los lados de la silla con sus manos.
                        Luego, extienda las piernas hasta que estén completamente extendidas. Aguante la carga un momento contrayendo los cuádriceps, y luego vuelva a la posición baja.
                    </Text>
                )}
                { pkfk_ejercicio == 'Copa triceps' && (
                    <Text style={styles.descripcion}>
                        Sentad@ en una silla, con la espalda recta, agarrando una mancuerna con ambas manos, las palmas de las manos en el interior de un disco,
                        coloque la mancuerna sobre la cabeza, con los brazos extendidos y los tríceps bien contraídos. Baje los antebrazos por detrás de la cabeza hasta que los codos formen un ángulo de 90°.
                        Luego extienda los antebrazos, volviendo a la posición inicial.
                    </Text>
                )}
                { pkfk_ejercicio == 'Rompecraneos' && (
                    <Text style={styles.descripcion}>
                        Acostad@ en la silla, con los pies en el suelo o en el la silla, sostenga la barra sobre su pecho, agarre en posición de pronación,
                        las manos ligeramente más cerradas que el ancho de los hombros. Posteriormente, flexione lentamente los antebrazos sin separar demasiado los codos,
                        llevando la barra a la parte superior de la cabeza. Luego vuelva a la posición inicial y repita el proceso.
                    </Text>
                )}
                { pkfk_ejercicio == 'Curl con mancuernas' && (
                    <Text style={styles.descripcion}>
                        De pie, con las rodillas ligeramente dobladas y la espalda recta. Sujete una mancuerna en cada mano, en un agarre neutral a lo largo del cuerpo.
                        Sin mover el pecho, eleve la mancuerna doblando los antebrazos. Mantenga su mano en un agarre neutral.
                        Contraiga los bíceps, y luego vuelva lentamente a la posición inicial. Mantenga el codo cerca del cuerpo durante el movimiento.
                        Alterne el movimiento realizándolo con un brazo y luego con el otro.
                    </Text>
                )}
                { pkfk_ejercicio == 'Dominadas' && (
                    <Text style={styles.descripcion}>
                        Agarre la barra con un agarre en pronación, con la cabeza ligeramente levantada, las manos separadas a una distancia superior a la de los hombros y los codos ligeramente doblados.
                        Realice un movimiento de elevación llevando la barbilla hacia la barra. Luego, vuelva lentamente a la posición inicial.
                    </Text>
                )}
                { pkfk_ejercicio == 'Puente isometrico' && (
                    <Text style={styles.descripcion}>
                        Acuéstese boca arriba sobre la colchoneta. Doble las rodillas y lleve los pies hacia usted, déjelos de forma plana en el suelo. Extienda los brazos a los costados con las palmas hacia abajo.
                        Luego, apoyándose con los talones, levante las caderas del suelo hasta que las rodillas, las caderas y los hombros formen una línea recta. Apriete sus glúteos y mantenga su núcleo reforzado. Haga una pausa y luego baje las caderas a la posición inicial.
                    </Text>
                )}
                { pkfk_ejercicio == 'Curl nordico' && (
                    <Text style={styles.descripcion}>
                        Acuéstese boca abajo en la máquina de 'curl de piernas tumbado o acostado' con la parte trasera de los tobillos presionando el reposapiés. Agarre los reposamanos.
                        Posteriormente, apoyad@ firmemente en la silla, flexione las piernas lo máximo posible. Mantenga la carga por un momento en la posición alta contrayendo los músculos isquiotibiales, luego vuelva lentamente a la posición inicial.
                    </Text>
                )}
                { pkfk_ejercicio == 'Jalon al pecho' && (
                    <Text style={styles.descripcion}>
                        Sentad@, con los muslos bajo las partes acolchadas, la barra agarrada en supinación, manos separadas a la anchura de los hombros. Manteniendo la espalda recta.
                        Tire de la barra hasta la parte superior del pecho. Mantenga la contracción por un momento, los hombros bien atrás antes de volver lentamente a la posición inicial.
                    </Text>
                )}
                { pkfk_ejercicio == 'Remo brazo' && (
                    <Text style={styles.descripcion}>
                        Coloque su rodilla izquierda y mano izquierda en una silla, con el pecho paralelo al suelo. Mantenga el pie derecho en el suelo y agarre la mancuerna con la mano derecha. Manteniéndola cerca de su cuerpo, levante la parte superior de su brazo derecho hasta que esté paralelo al suelo.
                        Realice una extensión del brazo derecho. Cuando esté completamente extendido, contraiga su trícep por un momento antes de volver a la posición inicial. Una vez que haya completado su serie, haga lo mismo con el otro brazo.
                    </Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // contenedor_anuncios: {
    //     alignItems: 'center',
    //     width: deviceWidth-90,
    //     height: deviceHeight-930,
    // },
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
    contenedor_texto: {
        fontFamily:'sans-serif',
        marginTop: 10,
        marginHorizontal: 10
    },
    titulo: {
        fontSize: 22,
        color: '#7ED321',
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal: 5,
    },
});

export default EjerciciosPorMusculoListado