import { Component, computed, signal } from '@angular/core';
import { SelectComponent } from '../shares/select/select.component';
import { dataType } from './../shares/select/select-option';
import { ApiService } from '../api.service';
import { Question } from '../models/question.model';
import { CardComponent } from '../shares/card/card.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SelectComponent, CardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dataType = dataType;
  questions = 10;
  selectedTCategories = 'any';
  selectedTDifficulties = 'any';
  selectedTTypes = 'any';
  questionLists = signal<Question[]>([]);
  currentIndex = signal(0);
  scores = signal(0);
  constructor(private api: ApiService) {}

  currentQuestion = computed(() => {
    return this.questionLists()[this.currentIndex()];
  });

  getQuestion() {
    const params: Record<string, string> = {
      amount: this.questions.toString(),
    };

    if (this.selectedTCategories !== 'any') {
      params['category'] = this.selectedTCategories;
    }

    if (this.selectedTDifficulties !== 'any') {
      params['difficulty'] = this.selectedTDifficulties;
    }

    if (this.selectedTTypes !== 'any') {
      params['type'] = this.selectedTTypes;
    }

    const queryString = new URLSearchParams(params).toString();

    this.api.getQuestions(`?${queryString}`).subscribe((data) => {
      this.questionLists.set(data.results);
      this.currentIndex.set(0); // reset index
    });
  }

  onAnswerSubmitted(answer: number) {
    console.log(answer);
    this.scores.update(value=>value+answer)
    // const next = this.currentIndex() + 1;
    // if (next < this.questionLists().length) {
    //   this.currentIndex.set(next);
    // } else {
    //   this.currentIndex.set(-1);
    //   console.log('Quiz complete!');
    // }
  }
  nextQuestion() {
    const next = this.currentIndex() + 1;
    if (next < this.questionLists().length) {
      this.currentIndex.set(next);
    } else {
      this.currentIndex.set(-1);
      console.log('Quiz complete!');
    }
  }
}
