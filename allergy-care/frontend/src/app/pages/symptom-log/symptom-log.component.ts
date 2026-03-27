import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { SymptomService } from '../../services/symptom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptom-log',
  templateUrl: './symptom-log.component.html',
  styleUrls: ['./symptom-log.component.css']
})
export class SymptomLogComponent implements OnInit {
  isSubmitting = false;
  selectedSymptomIds: string[] = [];
  searchControl = new FormControl('');
  manualDescription = new FormControl('');
  
  commonSymptoms = [
    { id: 'sneezing', label: 'Sneezing', icon: 'air' },
    { id: 'rash', label: 'Rash', icon: 'texture' },
    { id: 'fatigue', label: 'Fatigue', icon: 'battery_low' },
    { id: 'watery-eyes', label: 'Watery Eyes', icon: 'opacity' },
    { id: 'coughing', label: 'Coughing', icon: 'ecg_heart' },
    { id: 'runny-nose', label: 'Runny Nose', icon: 'water_drop' }
  ];

  constructor(
    private symptomService: SymptomService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Log Symptoms - AllergyCare');
    this.metaService.updateTag({ name: 'description', content: 'Select your symptoms for instant AI analysis.' });
  }

  toggleSymptom(id: string) {
    const index = this.selectedSymptomIds.indexOf(id);
    if (index > -1) {
      this.selectedSymptomIds.splice(index, 1);
    } else {
      this.selectedSymptomIds.push(id);
    }
  }

  isSymptomSelected(id: string) {
    return this.selectedSymptomIds.includes(id);
  }

  hasSelection() {
    return this.selectedSymptomIds.length > 0 || this.manualDescription.value;
  }

  onSubmit() {
    this.isSubmitting = true;
    const descriptionList = this.selectedSymptomIds.map(id => this.commonSymptoms.find(s => s.id === id)?.label);
    const description = descriptionList.join(', ') + 
      (this.manualDescription.value ? (descriptionList.length > 0 ? '; ' : '') + this.manualDescription.value : '');
    
    this.symptomService.logSymptom({ description, severity: 'moderate' }).subscribe({
      next: (res) => {
        this.selectedSymptomIds = [];
        this.manualDescription.reset();
        this.isSubmitting = false;
        this.router.navigate(['/results']);
      },
      error: (err) => {
        this.isSubmitting = false;
        alert('Failed to log symptom. Please try again.');
      }
    });
  }
}
