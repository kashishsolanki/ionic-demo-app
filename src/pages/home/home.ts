import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  //array for captured image's base64 
  pictures: any[] = [];

  //options for BarcodeScanner
  barcodeScannerOptions: BarcodeScannerOptions;

  //encode data and text
  encodedText: string = '';
  encodedData: any = {};
  scannedData: any = {};

  constructor(public navCtrl: NavController, private camera: Camera,
    public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner
  ) {

  }

  scanBarcode() {
    //scan barcode
    this.barcodeScannerOptions = {
      prompt: 'Scan barcode'
    }

    this.barcodeScanner.scan(this.barcodeScannerOptions).then((responseData) => {
      if(responseData.cancelled){
        this.showAlert('Alert', 'No barcode scan');
      }
      else{
        this.scannedData = responseData;
      }
    }, (err) => {
      this.showAlert('Error', err);
    });
  }

  encodeData() {
    //encode text to barcode
    if(this.encodedText.trim()!=""){
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedText).then((responseData) => {
        this.encodeData = responseData;
      }, (err) => {
        this.showAlert('Error', err);
      });  
    }
    else{
      this.showAlert('Alert', 'Please enter text to encode');
    }
  }

  takePhoto() {
    // Take picture using camera plugin with its options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // add captured images in one list to show in UI.
      this.pictures.push('data:image/jpeg;base64,' + imageData);
      localStorage.setItem('pictures', JSON.stringify(this.pictures));
     }, (err) => {
      this.showAlert('Alert', err);
     });
    
  }

  showAlert(alertType, alertMessage){
    // show alert with message
    let alert = this.alertCtrl.create({
       title: alertType,
       subTitle: alertMessage,
       buttons: ['OK']
     });
     alert.present();
  }

  loadPictures(){
    // load pictures on start of application from localStorage
    let storedImages = localStorage.getItem('pictures');
    if(storedImages != undefined) {
      this.pictures = JSON.parse(localStorage.getItem('pictures'));
    }
  }

  ngOnInit() {
    this.loadPictures();
  }

}
