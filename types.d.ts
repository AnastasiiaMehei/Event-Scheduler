import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

declare module "react-redux" {
  interface DefaultRootState extends RootState {}

  export function useDispatch<TDispatch = ThunkDispatch<RootState, undefined, AnyAction>>(): TDispatch;
  export function useSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}
