import * as fromComments from '@ml/comments/reducers/comments.reducer';
import * as fromRoot from '@ml/reducers';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export const commentsFeatureKey = 'comments';

export interface CommentsState {
  [fromComments.commentsFeatureKey]: fromComments.State;
}

export interface State extends fromRoot.State {
  [commentsFeatureKey]: CommentsState;
}

export function reducers(state: CommentsState | undefined, action: Action) {
  return combineReducers({
    [fromComments.commentsFeatureKey]: fromComments.reducer,
  })(state, action);
}

/**
 * - Selectors
 */
export const selectCommentsState =
  createFeatureSelector<CommentsState>(commentsFeatureKey);

export const selectCommentEntitiesState = createSelector(
  selectCommentsState,
  (state) => state.comments
);


export const {
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: selectTotalComments,
} = fromComments.adapter.getSelectors(selectCommentEntitiesState);


export const selectDeleteId = createSelector(
  selectCommentEntitiesState,
  fromComments.deleteId
);
