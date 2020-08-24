import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-authentication-error-dialog",
  templateUrl: "./authentication-error-dialog.component.html",
  styleUrls: ["./authentication-error-dialog.component.scss"],
})
export class AuthenticationErrorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AuthenticationErrorDialogComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
