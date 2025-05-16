import { Component } from '@angular/core';
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
  questions = 10;
  dataType = dataType;
  selectedTCategories = 'any';
  selectedTDifficulties = 'any';
  selectedTTypes = 'any';
  questionLists: Question[] = [];
  constructor(private api: ApiService) {}
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
      this.questionLists = data.results;
      console.log(data);
    });
  }
}
