import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ModalComponent } from "../../../sub-components/modal/modal.component";

export function openDialog(dialog: MatDialog,_content:string,_dialog_title:string,_color:string): Observable<any> {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      content: _content,
      dialog_title: _dialog_title,
      color: _color
    };
    dialogConfig.width = '25%';

    const dialogRef = dialog.open(ModalComponent, dialogConfig);

    return dialogRef.afterClosed();
    // .subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }