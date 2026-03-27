import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SymptomLogComponent } from './pages/symptom-log/symptom-log.component';
import { HistoryComponent } from './pages/history/history.component';
import { ResultsComponent } from './pages/results/results.component';
import { AiChatComponent } from './pages/ai-chat/ai-chat.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ClinicalComponent } from './pages/clinical/clinical.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'symptom-log', component: SymptomLogComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'ai-chat', component: AiChatComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'clinical', component: ClinicalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
