import React from 'react'
import {Text,View,TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned:false,
            scannedData:'',
            buttonState: 'normal',
            Author: '',
            StoryTitle: '',
            Story: '',
        }
    }
    getCameraPermissions=async(id)=>{
     const {status} = await Permissions.askAsync(Permissions.CAMERA)
     this.setState({
         hasCameraPermissions: status==='granted',
         buttonState:id,
         scanned:'false',
     })
    }
    handleBarCodeScanned=async({type,data}) => {
    this.setState({
        scanned: true,
        scannedData:data,
        buttonState:this.state.buttonState,
    })
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if(buttonState !== 'normal' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if (buttonState==='normal'){

        return (
            <View style = {{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <View>
                <Text style = {{textAlign: 'center',fontSize:30}}>
                 STORY WRITER!
                </Text>
                </View>
                <View style = {styles.inputView}>
                 <TextInput
                 style = {styles.inputBox}
                 placeholder = 'Title of your story!'
                 value = {this.state.storyTitle}
                 />
                 <View>
                 <TextInput
                 style = {styles.inputBox}
                 placeholder = 'Write your name here!'
                 value = {this.state.Author}
                 />
                 </View>
                 <View>
                <TextInput
                 style = {styles.inputBox}
                 placeholder = 'Write your Story!'
                 value = {this.state.Story}
                 />
                </View>
               
                </View>
                <View style = {styles.inputView}>
               <TouchableOpacity style= {styles.scanButton} >
                    <Text style = {styles.buttonText}>
                        Submit your story!
                    </Text>
                </TouchableOpacity>
                </View>
           </View>
        )
    }
  }
}
const styles = StyleSheet.create({
    inputView:{
        flexDirection: 'row',
        margin:20,
    },
    inputBox:{
        width:200,
        height:40, 
        borderWidth:1.5,
        borderBottomWidth:0,
        fontSize:20,
    },
    scanButton:{
        backgroundColor: '#2196f3',
       width:125,
       borderWidth:1.5,
       borderLeftWidth:0
    },
})