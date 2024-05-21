import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { User } from '../../../../models/user.model';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  private _userService = inject(UserService);
  public users: User[] = [];
  ngOnInit(): void {
     this._userService.getUsers().subscribe((data: any) => {
      this.users = data
     });
    console.log(this.users);
    
  }
}
