import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/_services/admin.service';
import { error } from 'protractor';
import { AlertifyService } from 'src/_services/alertify.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;
  constructor(private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, err => {
      this.alertify.error(err);
    });
  }
  approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, err => {
      this.alertify.error(err);
    });
  }
  rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, err => {
      this.alertify.error(err);
    });
  }

}
