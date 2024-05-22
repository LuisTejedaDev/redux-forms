import {StyleSheet, TextInput} from "react-native"
import {useSelector} from "react-redux"
import {selectValues} from "../slices/formSlice"
import {useForm} from "../hooks"

export default ({property, ...rest}) => {

    const {handleInputChange} = useForm()
    
    const values = useSelector(selectValues)
    const {[property]: value} = values

    return(
        <TextInput 
            value={value}
            onChangeText={(text) => handleInputChange(property, text)}
            style={styles.input}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 8
    }
})