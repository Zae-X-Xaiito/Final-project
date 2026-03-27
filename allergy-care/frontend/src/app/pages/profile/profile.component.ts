import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  settings: any = {};
  isEditing = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = { ...this.authService.currentUserValue };
    this.loadSettings();
  }

  loadSettings() {
    this.authService.getSettings().subscribe({
      next: (s) => this.settings = s,
      error: (err) => console.error('Failed to load settings', err)
    });
  }

  updateSettings(key: string, value: any) {
    this.settings[key] = value;
    this.authService.updateSettings(this.settings).subscribe({
      next: () => console.log('Settings persisted'),
      error: (err) => console.error('Failed to persist settings', err)
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    if (!this.user.fullName || !this.user.email) return;

    this.authService.updateProfile({ fullName: this.user.fullName, email: this.user.email }).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.isEditing = false;
        
        // Correctly update the AuthService state and LocalStorage
        const updatedUser = { ...this.authService.currentUserValue, fullName: this.user.fullName, email: this.user.email };
        this.authService.updateLocalUser(updatedUser);
      },
      error: (err) => alert('Failed to update profile.')
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
