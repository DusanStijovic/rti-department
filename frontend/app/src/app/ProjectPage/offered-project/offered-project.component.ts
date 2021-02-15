import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import OfferedProject from '../../model/OfferedProject';
import { OfferedProjectService } from '../../services/offered-project.service';

@Component({
  selector: 'app-offered-project',
  templateUrl: './offered-project.component.html',
  styleUrls: ['./offered-project.component.css']
})
export class OfferedProjectComponent implements OnInit {

  constructor(private offeredProjectService: OfferedProjectService, private router: Router) { }

  ngOnInit(): void {
    this.readAllOfferedProject();
  }

  readAllOfferedProject() {
    this.offeredProjectService.getAllOfferedProjects().subscribe((offeredProjects: OfferedProject[]) => {
      this.offeredProjects = offeredProjects;
    }, (err: any) => { this.router.navigate(['/error']) });
  }

  offeredProjects: OfferedProject[];
}

