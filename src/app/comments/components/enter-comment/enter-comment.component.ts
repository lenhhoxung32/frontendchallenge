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
import { User } from '../../models/user.model';
import { persist } from '../../validators';

@Component({
  selector: 'ml-enter-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enter-comment.component.html',
  styleUrls: ['./enter-comment.component.scss']
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
