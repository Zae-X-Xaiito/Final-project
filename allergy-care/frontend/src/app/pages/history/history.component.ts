import { Component, OnInit } from '@angular/core';
import { SymptomService } from '../../services/symptom.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  constructor(
    private symptomService: SymptomService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Symptom History - AllergyCare');
    this.metaService.updateTag({ name: 'description', content: 'Review your complete history of logged symptoms and triggers.' });
    this.loadHistory();
  }

  loadHistory() {
    this.symptomService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
      },
      error: (err) => {
        console.error('Failed to load history', err);
      }
    });
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this log?')) {
      this.symptomService.deleteSymptom(id).subscribe({
        next: () => {
          this.history = this.history.filter(item => item.id !== id);
        },
        error: (err) => alert('Failed to delete item.')
      });
    }
  }
}
