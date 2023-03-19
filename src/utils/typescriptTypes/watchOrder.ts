import { TIngredient } from "./ingredient"

export type TDataWatchOrder = {
    number: number | null, 
    name: string, 
    array: Array<TIngredient>, 
    infoDate: string, 
    price: number | null, 
    statusText: string,
    styleStatus: string,
  }