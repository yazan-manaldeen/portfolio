import {Injectable} from "@angular/core";
import {CustomSnackbarComponent} from "@app/components/custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        buttonText: action,
        action: () => {
          this.snackBar.dismiss();
        },
      },
      duration: 3000
    });
  }
}
