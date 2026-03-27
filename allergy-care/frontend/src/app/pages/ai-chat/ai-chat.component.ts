import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit {
  isAiTyping = false;
  suggestionChips = [
    'How to reduce dust at home?',
    'What is Cedar Fever?',
    'When is pollen highest?',
    'Tips for pet allergies'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  sendChip(chip: string) {
    this.isAiTyping = true;
    // Mock AI response delay
    setTimeout(() => {
      this.isAiTyping = false;
      alert(`The Assistant would now process your question about "${chip}".`);
    }, 2000);
  }
}
