import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pictures: any[] = [];

  constructor(public navCtrl: NavController, private camera: Camera,
    public alertCtrl: AlertController) {

  }

  takePhoto() {
    // Take picture using camera plugin with its options

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // add captured images in one list to show in UI.
      this.pictures.push('data:image/jpeg;base64,' + imageData);
     }, (err) => {
      this.displayErrorAlert(err);
     });
    
  }

  displayErrorAlert(err){
    // show alert if any error occurred while capture images
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while taking picture',
       buttons: ['OK']
     });
     alert.present();
  }

}
