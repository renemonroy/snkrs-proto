import { ThreadActionType as ActionType } from '../constants/action-types';

export const selectTag = tag =>
	({ type: ActionType.SELECT_TAG, tag });

export const selectRelated = related =>
	({ type: ActionType.SELECT_RELATED, related });
