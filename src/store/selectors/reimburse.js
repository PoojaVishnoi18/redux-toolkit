import { createSelector } from "@reduxjs/toolkit";

export const selectReimburseState = state => state.reimbursement

export const selectReimburseList = createSelector(
  selectReimburseState,
  reimburseState => reimburseState.reimburseList
)

export const selectSelectedReimburse = createSelector(
  selectReimburseState,
  reimburseState => reimburseState.selectedReimburse
)



