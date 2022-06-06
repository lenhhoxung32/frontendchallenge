import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Comment, Edit, ReplyDto } from '@ml/comments/models';
import { testData } from '@ml/comments/services/data';
import { forkJoin, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { CommentsService } from './comments.service';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'comments-app-local-storage',
  { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class CommentsStorageService implements CommentsService {
  commentsKey = 'comments';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  private save(comments: Comment[]) {
    this.storage.setItem(this.commentsKey, JSON.stringify(comments));
  }

  getComments(): Observable<Comment[]> {
    return this.supported().pipe(
      map(() => this.storage.getItem(this.commentsKey)),
      map((value: string | null) =>
        value ? JSON.parse(value) : testData.comments
      )
    );
  }

  deleteComment(id: number): Observable<boolean> {
    return this.getComments().pipe(
      // filter in first level
      map((comments) => comments.filter((comment) => comment.id !== id)),
      // filter in second level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          replies: c.replies.filter((r) => r.id !== id),
        }))
      ),
      tap((comments) => this.save(comments)),
      map(() => true)
    );
  }

  private _createId(): Observable<number> {
    return this.getComments().pipe(
      map(
        (comments) =>
          comments.length +
          comments.reduce((acc, comment) => acc + comment.replies.length, 0)
      )
    );
  }

  private _generateComment(
    user: User,
    content: string,
    replyingTo: string | undefined = undefined
  ): Observable<Comment> {
    return this._createId().pipe(
      map((id) => ({
        id,
        user,
        content,
        score: 0,
        replyingTo,
        replies: [],
        createdAtTimestamp: new Date().getTime(),
      }))
    );
  }

  addComment(user: User, content: string): Observable<Comment> {
    return forkJoin([
      this.getComments(),
      this._generateComment(user, content),
    ]).pipe(
      map(([comments, comment]) => ({
        comments: [...comments, comment],
        comment,
      })),
      map(({ comments, comment }) => ({
        comments: comments.sort((a, b) =>
          b.score === a.score ? 1 : b.score - a.score
        ),
        comment,
      })),
      tap(({ comments }) => this.save(comments)),
      map(({ comment }) => comment)
    );
  }

  addReply(
    replyDto: ReplyDto
  ): Observable<{ commentId: number; comment: Comment }> {
    const { content, toUserName, myUser, toCommentId } = replyDto;
    return forkJoin([
      this.getComments(),
      this._generateComment(myUser, content, toUserName),
    ]).pipe(
      // Check in first level
      map(([comments, reply]) => ({
        comments: comments.map((c) => ({
          ...c,
          replies: c.id === toCommentId ? [...c.replies, reply] : c.replies,
        })),
        reply,
      })),
      // check in second level
      map(({ comments, reply }) => ({
        comments: comments.map((c) => {
          const found = c.replies.find((r) => r.id === toCommentId);
          if (found) return { ...c, replies: [...c.replies, reply] };
          return c;
        }),
        reply,
      })),
      tap(({ comments }) => this.save(comments)),
      map(({ comments, reply }) => ({ commentId: toCommentId, comment: reply }))
    );
  }

  editComment(edit: Edit): Observable<boolean> {
    const { id, content } = edit;
    return this.getComments().pipe(
      // First level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          content: c.id === id ? content : c.content,
        }))
      ),
      // Second level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          replies: c.replies.map((r) => ({ ...r, content: r.id === id ? content : r.content })),
        }))
      ),
      tap((comments) => this.save(comments)),
      map(() => true)
    );
  }

  upScore(commentId: number): Observable<boolean> {
    return this.getComments().pipe(
      // First level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          score: c.id === commentId ? c.score + 1 : c.score,
        }))
      ),
      // Second level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          replies: c.replies.map((r) => ({
            ...r,
            score: r.id === commentId ? r.score + 1 : r.score,
          })),
        }))
      ),
      tap((comments) => this.save(comments)),
      map(() => true)
    );
  }
  downScore(commentId: number): Observable<boolean> {
    return this.getComments().pipe(
      // First level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          score: c.id === commentId ? Math.max(c.score - 1, 0) : c.score,
        }))
      ),
      // Second level
      map((comments) =>
        comments.map((c) => ({
          ...c,
          replies: c.replies.map((r) => ({
            ...r,
            score: r.id === commentId ? Math.max(r.score - 1, 0) : r.score,
          })),
        }))
      ),
      tap((comments) => this.save(comments)),
      map(() => true)
    );
  }
}
