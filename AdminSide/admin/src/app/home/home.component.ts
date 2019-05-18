import { Component, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar
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
                  if (dev.label.includes('front')) {
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
          this.snackBar.open(result + ' found', 'ok', {
            duration: 2000,
          });
      });
  }
}
