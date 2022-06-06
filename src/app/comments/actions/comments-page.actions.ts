import { createAction, props } from '@ngrx/store';
import { Edit, ReplyDto } from '@ml/comments/models';
import { User } from '../models/user.model';

export const enter = createAction('[Comments Page] Enter');

export const setDeleteId = createAction(
  '[Comments Page] Set Delete Id',
  props<{ id?: number }>()
);

export const deleteComment = createAction(
  '[Comments Page] Delete Comment',
  props<{ id: number }>()
);

export const addComment = createAction(
  '[Comments Page] Add Comment',
  props<{ user: User; content: string }>()
);

export const addReply = createAction(
  '[Comments Page] Add Reply',
  props<{ replyDto: ReplyDto }>()
);

export const editComment = createAction(
  '[Comments Page] Edit Comment',
  props<{ edit: Edit }>()
);

export const upScore = createAction(
  '[Comments Page] Up Score ',
  props<{ commentId: number }>()
);

export const downScore = createAction(
  '[Comments Page] Down Score ',
  props<{ commentId: number }>()
);

