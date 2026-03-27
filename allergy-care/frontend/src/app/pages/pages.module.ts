import { NgModule } from '@angular/core';
import { AiChatComponent } from './ai-chat/ai-chat.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ClinicalComponent } from './clinical/clinical.component';
import { ResultsComponent } from './results/results.component';
import { HomeComponent } from './home/home.component';
import { SymptomLogComponent } from './symptom-log/symptom-log.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    SymptomLogComponent,
    HistoryComponent,
    ResultsComponent,
    AiChatComponent,
    FaqComponent,
    ContactComponent,
    ProfileComponent,
    ClinicalComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    WelcomeComponent,
    SymptomLogComponent,
    HistoryComponent,
    ResultsComponent,
    AiChatComponent,
    FaqComponent,
    ContactComponent,
    ProfileComponent,
    ClinicalComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
