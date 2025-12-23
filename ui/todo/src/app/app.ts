import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common'
import { HttpClientModule, HttpClient} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo');
  tasks:any[]=[];
  newtask="";

  APIURL="http://localhost:8000/"

  constructor(private http:HttpClient){}
  ngOnInit() {
    this.get_tasks();
  }

  get_tasks() {
    this.http.get<any[]>(this.APIURL+"get_tasks").subscribe((res)=>{
      this.tasks=res;
    })
  }
  add_task() {
    let body=new FormData();
    body.append('task',this.newtask);
    this.http.post(this.APIURL+"add_task",body).subscribe((res)=>{
      this.get_tasks();
      this.newtask="";

    })
    
  }

  delete_task(id:any) {
    let body=new FormData();
    body.append('id',id);
    this.http.post(this.APIURL+"delete_task",body).subscribe((res)=>{
      this.get_tasks();
    })
  }
}

