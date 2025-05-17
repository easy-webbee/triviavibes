import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
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
  @Output() answerSubmit = new EventEmitter<number>();
  shuffledAnswers: string[] = [];
  duration = 15;
  btn_disabled = signal(false)
  timeCountDown = signal(this.duration);
  private interval: any;
  submitAnswer(answer: string) {
    //compare answer

    //timeout no value

    //get point by time left time 10
    console.log(answer,this.question.correct_answer)
    if(answer.includes(this.question.correct_answer)){
      this.answerSubmit.emit(10);
    }else{
      this.answerSubmit.emit(0);
    }
    clearInterval(this.interval);
    this.btn_disabled.set(true)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateTime();
    if (changes['question'] && this.question) {
      this.shuffledAnswers = this.shuffleAnswers([
        ...this.question.incorrect_answers,
        this.question.correct_answer,
      ]);
    }
  }

  shuffleAnswers(answers: string[]): string[] {
    return answers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  updateTime() {
    this.btn_disabled.set(false)
    this.timeCountDown.set(this.duration);
    clearInterval(this.interval);
    let remaining = this.duration;
    this.interval = setInterval(() => {
      remaining--;
      this.timeCountDown.update(() => remaining);
      if (remaining <= 0) {
        clearInterval(this.interval);
        // Optionally trigger timeout logic here
      }
    }, 1000);
  }
}
