import React, {useRef} from "react";
import styles from './ingredients-category.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux'
import { GET_CONSTRUCTOR_DELETE_MAIN_INGREDIENTS } from "../../services/action";
import {useDrag, useDrop} from 'react-dnd'

function IngredientsCategory({id, text, price, thumbnail, index, moveIngredient}){

const dispatch = useDispatch();

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
      accept: 'mains',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
                    dispatch({type: GET_CONSTRUCTOR_DELETE_MAIN_INGREDIENTS, id: id})
                }}
            />
        </li>
    )
}

IngredientsCategory.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,
}

export default IngredientsCategory;