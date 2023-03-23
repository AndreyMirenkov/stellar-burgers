import { TIngredient } from "./ingredient"

type TData = {
    ingredient: TIngredient;
    count: number;
}

export type TDataWatchOrder = {
    number: number | null, 
    name: string, 
    data: Array<TData>, 
    infoDate: string, 
    price: number | null, 
    statusText: string,
    styleStatus: string,
  }