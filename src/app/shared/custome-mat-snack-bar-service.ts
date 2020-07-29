import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})

export class CustomeMatSnackBarService {

    constructor(private matSnackBar: MatSnackBar) {

    }
    public showSnackBar(message: string, duration?: number): Promise<string> {


        let time = 500;

        if (!isNaN(duration)) {
            time = duration;
        }

        let x: Promise<string> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let snackBar = this.matSnackBar.open(message, null, {
                    duration: 1500
                });
                resolve('success')
            },
                time);

        })

        return x;
    }
}