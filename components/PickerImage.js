globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import { GlobalStyles } from '../Constants/Globalcolors';
import React, { useEffect, useState } from 'react'
import { utils } from '@react-native-firebase/app';

import storage from '@react-native-firebase/storage';
import * as ImagePicker from "expo-image-picker";
import SecondaryButton from './SecondaryButton';


function formatImage (image){
    const uri = image.split('/').pop()
    return uri
}


const PickerImage = ({onImageHandler, imageFile, resetForm}) => {
    const [cameraPermissionInformation, requestPermission] = ImagePicker.useCameraPermissions();
    const [isFetchingImage, setIsFetchingImage] = useState(false)
    const [pickedImage, setPickedImaage] = useState("");
    const [isUploadingFile, setIsUploadingFile] = useState(false)

    const reference = storage().ref(`data_image_one/${formatImage(imageFile)}`);




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

        if(uri){

           const uriImage = formatImage(uri)
              // path to existing file on filesystem
        //   const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${uriImage}`;
        //   console.log(pathToFile, "path upload")
          // uploads file
           try{
            setIsUploadingFile(true)
            const uploadResponse = await reference.putFile(uri);
            setIsUploadingFile(false)

            console.log(uploadResponse)
           }catch(error){
            setIsUploadingFile(false)
            console.log(error, "error uploading file to firebase")
           }

        }
       }else{

       }
    }

    React.useEffect(() => {

    }, [isFetchingImage]);


    let imageContent  =  <Text style={styles.textfallback}>No image picked yet</Text>;

    if(imageFile && !isFetchingImage){
        imageContent = <Image style={styles.image} source={{uri: imageFile}}/>
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
      textAlign: "center",
      color: "#fff"
    },

    image: {
        width: "100%",
        height: "100%"
    }
})