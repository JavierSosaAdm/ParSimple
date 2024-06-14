import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  userList: { data: User, id: string }[] = [];
  filter: { data: User, id: string }[] = [];
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private authService = inject(AngularFireAuth)
  public users: {data: User}[] = [];
  private currentEmail: string | null | undefined = '';
  // private currentUser: 

  ngOnInit(): void {
    this.authService.authState.subscribe(async (user) => {
      console.log('user: -->', user?.email); 
      this._authService.getCurrentUser().subscribe(async (data) => {
      
        this.currentEmail = data?.email;
        console.log('email: -->', this.currentEmail);
        await this._userService.getUsers().subscribe((users) => {
            this.userList = users
            this.filter = this.userList.filter(user => user.data.email === this.currentEmail)
            console.log('filter', this.filter);
            return this.filter
        })
      })
    })   
  }
}
