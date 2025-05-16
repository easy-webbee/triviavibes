import { Component, Input } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() question!: Question;
  shuffledAnswers: string[] = [];

  ngOnInit(): void {
    this.shuffleAnswers();
  }

  shuffleAnswers(): void {
    const allAnswers = [
      ...this.question.incorrect_answers,
      this.question.correct_answer,
    ];
    this.shuffledAnswers = this.shuffleArray(allAnswers);
  }

  shuffleArray(array: string[]): string[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
