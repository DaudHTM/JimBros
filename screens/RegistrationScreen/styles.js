import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    datePicker: {
        flex: 1
    },
    registrationText: {
        fontSize: 25,
        marginLeft: "8%",
        marginTop: 35,
        fontWeight: "bold"
    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "8%",
        marginRight: "8%",
        paddingLeft: "5%"
    },
    newbdinput:{
        backgroundColor: 'white',
     
      
        height: 48,
        borderRadius: 5,
        width:200,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft:20,
    },
    BirthDate: {
        height: 48,

        overflow: 'hidden',

        marginTop: 10,
        marginBottom: 10,
        marginLeft: "0%",
        marginRight: "8%",

        position: 'relative',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    BirthdateInput: {
        paddingRight: 21,
        backgroundColor: 'white',
        flex: 1,
        height: 100,
        paddingLeft: 10,
        borderRadius: 5,
        marginLeft: "8%"

    },

    button: {
        backgroundColor: '#788eec',
        marginLeft: "8%",
        marginRight: "8%",
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})