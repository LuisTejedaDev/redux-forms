import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useDispatch} from "react-redux"
import {deleteUser, setActionType, setSection, setTemporalId} from "../../slices/userSlice"
import {useForm} from "../../hooks"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({id, name, gender}) => {
    
    const dispatch = useDispatch()
    const {handleRestValues} = useForm()
    
    return(
        <View style={{height: 55, alignSelf: 'stretch', flexDirection: 'row', paddingHorizontal: 10}}>

            <View style={styles.section}>
                <Material name={gender === 1 ? 'face-man' : 'face-woman'} size={22} color={gender === 1 ? '#0F4C81' : '#E4007F'}/>
            </View>

            <View style={styles.information}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#383838'}}>{name}</Text>
            </View>

            <TouchableOpacity 
                onPress={() => {
                    dispatch(setActionType(2))
                    dispatch(setSection(2))
                    dispatch(setTemporalId(id))
                    handleRestValues({nombre: name, gender: gender})
                }}
                style={styles.section}>
                <Material name={'pencil'} size={22} color={'#4682B4'}/>
            </TouchableOpacity> 
 
            <TouchableOpacity 
                onPress={() => dispatch(deleteUser(id))}
                style={styles.section}>
                <Material name={'trash-can'} size={22} color={'#990000'}/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    information: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
})