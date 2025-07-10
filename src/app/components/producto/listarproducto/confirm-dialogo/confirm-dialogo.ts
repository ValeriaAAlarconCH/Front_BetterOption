import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialogo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule,
  ],
  templateUrl: './confirm-dialogo.html',
  styleUrl: './confirm-dialogo.css'
})
export class ConfirmDialogo {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string },
    private dialogRef: MatDialogRef<ConfirmDialogo>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
