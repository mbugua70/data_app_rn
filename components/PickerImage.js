import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import SecondaryButton from './SecondaryButton';
import { GlobalStyles } from '../Constants/Globalcolors';


const PickerImage = ({onImageHandler, imageFile, resetForm}) => {
    const [cameraPermissionInformation, requestPermission] = ImagePicker.useCameraPermissions();
    const [isFetchingImage, setIsFetchingImage] = useState(false)
    const [pickedImage, setPickedImaage] = useState();

    async function verifyCameraPermission(){
        if(cameraPermissionInformation.status === ImagePicker.PermissionStatus.UNDETERMINED){
            const iosPermission =  await requestPermission();
            return iosPermission.granted
        }

        if(cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED){
            Alert.alert("Denied Camera Permission", "You need to accept camera permission to continue")
            return false;
        }

        return true;
    }

    async function handleImage(){

       const isPermission =  await verifyCameraPermission()


       if(!isPermission){


        return;
       }

       setIsFetchingImage(true)
       const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16,9],
        quality: 0.5,
       });

       setIsFetchingImage(false)

       if(!image.canceled){

        const uri = image.assets[0].uri;
        setPickedImaage(uri);
        onImageHandler(uri);
       }else{

       }
    }

    React.useEffect(() => {

    }, [isFetchingImage]);


    let imageContent  =  <Text style={styles.textfallback}>No image picked yet</Text>;

    if(imageFile && !isFetchingImage){
        imageContent = <Image style={styles.image} source={{uri: imageFile.image}}/>
    }

    return (
    <View>
      <View style={styles.imageContainer}>
       {imageContent}
      </View>
       <SecondaryButton isFetchingLocation={isFetchingImage} icon="camera" onPress={handleImage}>Take a Picture</SecondaryButton>
    </View>
  )
}

export default PickerImage

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 200,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: GlobalStyles.colors.gray800,
        marginVertical: 18,
    },

    textfallback: {
      textAlign: "center"
    },

    image: {
        width: "100%",
        height: "100%"
    }
})