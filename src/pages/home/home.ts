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

  //encoded data and text
  encodedText: string = '';
  encodedData: any = {};
  scannedData: any = {};

  constructor(public navCtrl: NavController, private camera: Camera,
    public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner
  ) {

  }

  scanBarcode() {
    this.barcodeScannerOptions = {
      prompt: 'Scan barcode'
    }

    this.barcodeScanner.scan(this.barcodeScannerOptions).then((responseData) => {
      this.scannedData = responseData;
    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

  encodeData() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedText).then((responseData) => {
      this.encodeData = responseData;
    }, (err) => {
      this.displayErrorAlert(err)
    });
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
      this.displayErrorAlert(err);
     });
    
  }

  displayErrorAlert(err){
    // show alert if any error occurred while capture images
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: err,
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
