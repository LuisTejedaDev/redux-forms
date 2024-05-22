import {Animated, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {selectValues} from '../slices/formSlice'
import {useForm} from '../hooks'

/*

    TODO:
    property --> Es el nombre de la propiedad con el que el usuario quiere que se guarde el valor que se va recuperando.

    required --> Esta propiedad es un booleano
    - true: es obligatorio el campo y muestra el * color rojo frente al title para decirle al usuario que dicho campo es obligatorio llenar.
    - false: al no ser obligatorio el campo no se muestra el * color rojo al usuario.

    title -> Este va a ser el titulo de la sección por ejemplo la sección de elegir género, sería Seleccionar sexo por ejemplo
    
    items -> estos van a ser los elementos del grupo de RadioButton por ejemplo, los elementos de la sección 'Seleccionar sexo' serían:
    Masculino y Femenino, los cuales se recibirían en el siguiente formato de JSON para que el componente funcione correctamente.

    Se pensó el componente de la siguiente manera para que este mismo se encargue de manejar los checked y los que no estan checked, se pueden pasar n cantidad de valores.

    [
        {
            id: 1,
            title: 'Masculino',
            value: 1,
        },
        {
            id: 2,
            title: 'Femenino',
            value: 2,
        },
    ]

*/

export default ({property, title = '', items = []}) => {
    
    const {handleInputChange} = useForm()

    const values = useSelector(selectValues)
    const {[property]: value} = values
    
    const handleChecked = (value) => {
        handleInputChange(property, value)
    }
    
    const Item = ({value: valor, title}) => {        
        return(
            <TouchableOpacity
                style={{height: 'auto', width: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10}}
                onPress={value !== valor ? () => handleChecked(valor) : () => {}}
            >
                <View style={{width: 24, height: 24, borderRadius: 30, borderWidth: 1.5, borderColor: '#adadad', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        value === valor
                        &&
                            <View 
                                style={{
                                    backgroundColor: '#4682B4',
                                    width: 14,
                                    height: 14,
                                    borderRadius: 30,
                                }} 
                            />
                    }
                </View>
                <View style={{height: 'auto', justifyContent: 'center', alignItems: 'center', marginLeft: 5}}>
                    <Text style={{fontSize: 14, fontWeight: '300', color: '#383838'}}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={{height: 'auto', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    items?.map(x => 
                        <Item key={x.id} {...x}/>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#4682B4',
        marginBottom: 5.5,
        marginRight: 3
    },
})