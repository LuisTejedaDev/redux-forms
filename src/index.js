import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {addUser, editUser, selectActionType, selectSection, selectTemporalId, selectUsers, setActionType, setSection} from "./slices/userSlice"
import {Input, RadioButton, User} from "./components"
import {selectValues} from "./slices/formSlice"
import {useForm} from "./hooks"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default () => {
    
    const dispatch = useDispatch() 
    const temporalId = useSelector(selectTemporalId)

    let genderData = [
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

    const {handleRestValues} = useForm()

    const users = useSelector(selectUsers)
    const actionType = useSelector(selectActionType)
    const section = useSelector(selectSection)

    const values = useSelector(selectValues)
    const {nombre, gender} = values

    
    const handleClean = () => {
        handleRestValues({
            nombre: null,
            gender: null,
        })
    }

    const handleAdd = () => {
        const nuevo = {
            id: Math.random().toString(),
            name: nombre,
            gender: gender
        }
        dispatch(addUser(nuevo))
        handleClean()
        dispatch(setSection(1))
    }

    const handleEdit = () => {
        const nuevo = {
            name: nombre,
            gender: gender
        }

        dispatch(editUser({id: temporalId, edited: nuevo}))
        handleClean()
        dispatch(setSection(1))
    }

    return(
        <>
            <SafeAreaView style={{backgroundColor: '#4682B4'}}/>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.legendContainer}>
                        <Text style={styles.legend}>{section === 1 ? 'Usuarios' : actionType === 1 ? 'Agregar Usuario' : 'Editar Usuario'}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            dispatch(setSection(section === 1 ? 2 : 1))
                            dispatch(setActionType(1))
                            handleClean()
                        }}
                        style={styles.addButton}>
                        <Material name={section === 1 ? 'plus-circle' : 'close-circle'} size={24} color={section === 1 ? '#4682B4' : '#ff0000'}/>
                    </TouchableOpacity>
                </View>
                
                {
                    section === 1
                    ?
                        <ScrollView style={{height: 'auto', alignSelf: 'stretch'}}>
                            {
                                users.map(x => 
                                    <User {...x}/>
                                )
                            }
                        </ScrollView>
                    :
                        <View style={{flex: 1, alignSelf: 'stretch', paddingHorizontal: 20}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#383838', marginBottom: 20}}>Ingresa tus datos correspondientes</Text>
                            
                            <Input 
                                property={'nombre'}
                                placeholder={'Ingresa tu nombre'}
                            />

                            <RadioButton
                                title={'Selecciona tu género'}
                                property={'gender'}
                                items={genderData}
                            />
                            
                            <View style={{height: 'auto', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                                <TouchableOpacity 
                                    onPress={actionType === 1 ? handleAdd : handleEdit}
                                    style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4682B4'}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>{actionType === 1 ? 'Guardar' : 'Editar'}</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                }
            </View>
            <SafeAreaView style={{backgroundColor: '#4682B4'}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        height: 55,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    legendContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    legend: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#383838'
    },
    addButton: {
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})