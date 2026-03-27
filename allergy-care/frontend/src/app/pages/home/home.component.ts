import { Component, OnInit } from '@angular/core';
import { SymptomService } from '../../services/symptom.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faqs: any[] = [];

  constructor(
    private symptomService: SymptomService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('AllergyCare - Personal Symptom Tracker & AI Analysis');
    this.metaService.addTags([
      { name: 'description', content: 'Identify your allergy triggers with AllergyCare symptom tracker and AI-powered clinical insights.' },
      { name: 'keywords', content: 'allergy, symptom tracker, health, triggers, medical analysis' }
    ]);
    this.symptomService.getFaqs().subscribe(data => {
      this.faqs = data;
    }, error => {
      console.warn('Could not load FAQs', error);
      // Fallback
      this.faqs = [
        { question: 'What is AllergyCare?', answer: 'Tracking tool for allergy triggers.' },
        { question: 'How it works?', answer: 'Log symptoms, get analysis.' }
      ];
    });
  }
}
