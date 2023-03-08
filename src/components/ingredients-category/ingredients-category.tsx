import React, {useRef, FC} from "react";
import styles from './ingredients-category.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch} from 'react-redux'
import { deleteConstructorMainIngredient } from "../../services/actions/actionCreators";
import {useDrag, useDrop} from 'react-dnd'

type TIngredientsCategory = {
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  keyDelete: number;
}

const IngredientsCategory:FC<TIngredientsCategory> = ({id, text, price, thumbnail, index, moveIngredient, keyDelete}) => {

const dispatch = useDispatch();

    const ref = useRef<HTMLLIElement>(null)
    const [{ handlerId }, drop] = useDrop({
      accept: 'mains',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item: any, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex: number = item.index
        const hoverIndex: number = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect: any = ref.current?.getBoundingClientRect()
        const hoverMiddleY: number =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY: number = clientOffset!.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        moveIngredient(dragIndex, hoverIndex)
        item.index = hoverIndex
      },
    })
    const [{ isDragging }, drag] = useDrag({
      type: 'mains',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
  


    return(
        <li ref={ref} className={`ml-4 mr-4 ${styles.fill__element}`} style = {{opacity}} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text = {text}
                price = {price}
                thumbnail= {thumbnail}
                handleClose = {() => {
                    dispatch(deleteConstructorMainIngredient(keyDelete))
                }}
            />
        </li>
    )
}

export default IngredientsCategory;