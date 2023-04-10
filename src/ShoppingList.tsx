import React, {ChangeEvent} from 'react';
import {ShoppingListPropsType} from "./typisation";

import './App.css';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import FourKIcon from '@mui/icons-material/FourK';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import {Checkboxed} from "./components/Checkbox";
import Button from "@mui/material/Button";


const ShoppingList:React.FC<ShoppingListPropsType> = ({

    deleteGoods,
    changeFilterValue,
    changeGoodsStatus,
    deleteTodoList,
    filter,
    updateShopListsTitle,
    goods,
    title,
    updateGoodsTitle,
    shoplistId,
    addGoods
                                                      }) => {


        const changeGoodsStatusOnChangeHandler = (id:string,e: ChangeEvent<HTMLInputElement>) => {
            changeGoodsStatus(shoplistId, id, e.currentTarget.checked)
        }



    function updateListsHandler(newTitle:string,st:string) {
        updateShopListsTitle(st,newTitle)
    }
    function updateGoodsHandler(st:string,id:string) {
        updateGoodsTitle(shoplistId,id,st)
    }

    const mappedGoods = goods.map((el, index) => {




        const expectedPriceToNumber = Number(el.expectedPrice.replace('$', '')) // '$5'(какое-то значнение expectedPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после replace) -> 5(конечный результат после Number)
        const realPriceToNumber = +el.realPrice.slice(1) /// '$5'(какое-то значнение realPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после splice(1)) -> 5(конечный результат унарного плюса - +)
        const styleForPrice = expectedPriceToNumber >= realPriceToNumber ? 'goodPrice' : 'badPrice';

        return (
            <div>
                <li key={el.id} className={el.inCart ? 'inCart' : ''}>
                    <div>
                        <DeleteForeverIcon  onClick={() => deleteGoods(shoplistId, el.id)} />
                        <EditableSpan callback={(st)=>updateGoodsHandler(st,el.id)} title={el.title}/>

                    </div>
                    <div className={styleForPrice}>expected price: {el.expectedPrice}</div>
                    <div className={styleForPrice}>real price: {el.realPrice}</div>
                    <span>in cart: </span>
                    <Checkboxed checked={el.inCart} onChange={(e)=>changeGoodsStatusOnChangeHandler(el.id,e)}/>

                </li>
            </div>
        )
    })

    const sumOfGoodsInCart = goods
        .filter(el => el.inCart === true)
        .reduce((previousValue, current) => previousValue + Number(current.realPrice.slice(1)), 0);

    const deleteTodoListHandler = () => {
        deleteTodoList(shoplistId)
    }

    const addGoodHandler = (newTitle: string) => {
        addGoods(shoplistId, newTitle)
    }





    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={(st)=>updateListsHandler(st,shoplistId)}/>
            </h3>
            <DeleteForeverIcon onClick={deleteTodoListHandler} />
            <div>
                <div>

                <AddItemForm callback={addGoodHandler}/>
                </div>
            </div>
            <ul>
                {mappedGoods}
            </ul>

            <div>
                <Button variant="contained" className={filter === "All" ? "activeButton" : ""}
                        onClick={() => changeFilterValue(shoplistId, "All")}
                        disabled={filter === "All"}>All
                </Button>
                <Button variant="contained" className={filter === "Not to buy" ? "activeButton" : ""}
                        onClick={() => changeFilterValue(shoplistId, "Not to buy")}
                        disabled={filter === "Not to buy"}>Not to buy
                </Button>
                <Button variant="contained" className={filter === "Bought" ? "activeButton" : ""}
                        onClick={() => changeFilterValue(shoplistId, "Bought")}
                        disabled={filter === "Bought"}>Bought
                </Button>
            </div>

        </div>
    );
};

export default ShoppingList;