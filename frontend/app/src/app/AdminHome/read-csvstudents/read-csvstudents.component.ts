import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/Student';
import * as xlsx from "xlsx";
import { StudentServiceService } from 'src/app/services/student-service.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-read-csvstudents',
  templateUrl: './read-csvstudents.component.html',
  styleUrls: ['./read-csvstudents.component.css']
})
export class ReadCSVStudentsComponent implements OnInit {

  constructor(
    private studenService: StudentServiceService,
    private encDec: EncrDecrService
  ) { }

  ngOnInit(): void {
  }

  lines = []; //for headings
  linesR = []; // for rows


  students: Student[] = [];

  fileName: string;

  uploadExcel(event: any) {
    this.fileChoosen = true;
    try {
      this.fileName = event.target.files[0].name;
      if (!this.checkExtension(this.fileName)) {
        this.fileChoosen = false;
        return
      }
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = reader.result;
        workBook = xlsx.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
          const sheet = workBook.Sheets[name];
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.students = jsonData[Object.keys(jsonData)[0]];
        console.log(this.students);

      };
      reader.readAsBinaryString(event.target.files[0]);
    } catch (error) {
      console.log('error', error);
    }

  }

  message: string;

  fileChoosen: boolean = false;

  checkExtension(fileName: string) {
    console.log(fileName);
    let regex = /^.*\.(xlsx|csv)$/;
    if (!regex.test(fileName)) {
      this.message = "Format fajla nije odgovarajuci";
      return false;
    }
    return true;
  }

  checkUsername(fileName: string, i) {
    //alert(fileName);
    let regex = /^[a-z]{2}([0-9]{2})([0-9]{4})(d|m|p)@student\.etf\.rs$/;
    if (!regex.test(fileName)) {
      this.message = "Postoje studenti sa neispravnim korisnickim imenom, red u tabeli " + i;
      return false;
    }
    return true;
  }


  dodajStudente() {
    if (!this.fileChoosen) {
      this.message = 'Niste izabrali fajl';
      return;
    }
    if (!this.checkExtension(this.fileName)) {
      return;
    }
    let i = 1;
    for (let one of this.students) {
      if (!this.checkUsername(one.username, i)) {
        return;
      }
      i++;
    }

    i = 1;
    for (let student of this.students) {
      if (!student.password || student.password == '') {
        this.message = 'Postoji student sa neispravnom lozinkom, red u tabeli ' + i;
        return;
      }
      i++;
      student.password = this.encDec.set(environment.key, student.password);
    }
    if (this.students.length == 0) {
      this.message = 'Nema studenata u fajlu';
      return;
    }
    this.studenService.createNewStudents(this.students).subscribe((result: any) => {
      this.message = result;
      for (let student of this.students) {
        student.password = this.encDec.get(environment.key, student.password);
      }
    }, (err) => {
      for (let student of this.students) {
        student.password = this.encDec.get(environment.key, student.password);
      }
    })

    this.fileChoosen = false;
  }

}
