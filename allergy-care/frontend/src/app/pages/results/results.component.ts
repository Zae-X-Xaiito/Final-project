import { Component, OnInit } from '@angular/core';
import { SymptomService } from '../../services/symptom.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  latestResult: any = null;

  constructor(
    private symptomService: SymptomService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Analysis Results - AllergyCare');
    this.metaService.updateTag({ name: 'description', content: 'View your personalized AI allergy analysis results.' });
    this.loadLatestResult();
  }

  loadLatestResult() {
    this.symptomService.getHistory().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // Assuming the latest is the first one (sorted by date desc in backend)
          this.latestResult = data[0];
        }
      },
      error: (err) => {
        console.error('Failed to load results', err);
      }
    });
  }
}
