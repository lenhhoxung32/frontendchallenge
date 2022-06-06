import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { persist } from '../validators';

@Component({
  selector: 'ml-enter-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit($event)"
      class="flex flex-col gap-8 bg-white p-4 mb-20 rounded-md- md:flex-row md:gap-5 md:p-6"
    >
      <!-- user -->
      <a *ngIf="user" class="hidden md:!block" routerLink="/">
        <div>
          <img
            class="min-w-10 min-h-10 rounded-full"
            [src]="avatar"
            [alt]="user.username"
          />
        </div>
      </a>
      <!-- end user -->

      <textarea
        #textarea
        formControlName="comment"
        placeholder="Add a comment.."
        cols="30"
        rows="3"
        class="block resize-none"
      ></textarea>

      <!-- send button -->
      <div class="hidden md:block">
        <button [disabled]="form.invalid" type="submit" class="btn btn-primary">
          {{ submitButtonName }}
        </button>
      </div>
      <!-- end send button -->

      <div class="flex justify-between items-center md:hidden">
        <!-- user -->
        <a *ngIf="user" routerLink="/">
          <img
            class="w-10 h-10 rounded-full"
            [src]="avatar"
            [alt]="user.username"
          />
        </a>
        <!-- end user -->

        <!-- send button -->
        <button [disabled]="form.invalid" type="submit" class="btn btn-primary">
          {{ submitButtonName }}
        </button>
        <!-- end send button -->
      </div>
    </form>
  `,
})
export class EnterCommentComponent implements OnInit, AfterViewInit {
  @Input() submitButtonName = 'Send';
  @Input() user?: User;
  @Input() preWrite = '';
  @Input() focus = false;

  @Output() enter = new EventEmitter<string>();
  form!: FormGroup;

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  constructor(private readonly _fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.focus) this.textarea.nativeElement.focus();
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      comment: [this.preWrite, [Validators.required, persist(this.preWrite)]],
    });
  }

  get avatar(): string {
    return this.user!.image.webp;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    // double check form validity
    if (this.form.invalid) return;

    const comment = this.form.value.comment as string;
    if (comment === this.preWrite) {
      alert('Please enter a comment');
      return;
    }

    this.enter.emit(comment);
    this.form.reset({ comment: '' });
  }
}
