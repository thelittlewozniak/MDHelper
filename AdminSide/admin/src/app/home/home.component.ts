import { Component, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  ngOnInit() {
      this.qrScannerComponent.getMediaDevices().then(devices => {
          console.log(devices);
          const videoDevices: MediaDeviceInfo[] = [];
          for (const device of devices) {
              if (device.kind.toString() === 'videoinput') {
                  videoDevices.push(device);
              }
          }
          if (videoDevices.length > 0) {
              let choosenDev;
              for (const dev of videoDevices) {
                  if (dev.label.includes('back')) {
                      choosenDev = dev;
                      break;
                  }
              }
              if (choosenDev) {
                  this.qrScannerComponent.chooseCamera.next(choosenDev);
              } else {
                  this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
              }
          }
      });

      this.qrScannerComponent.capturedQr.subscribe(result => {
          console.log(result);
          let u = new User();
          u.username = result;
          this.http.post('https://wamdhelperapi.azurewebsites.net/api/User', u).subscribe(
            (res) => {
              console.log(res);
              if (res) {
                this.snackBar.open(result + ' added', 'ok', {
                  duration: 2000,
                });
              }
            }, (err) => {
              console.log(err);
            }
          );
      });
  }
}
