import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {FilterValue, GoodsType, GoodType, ShoplistsType} from "./typisation";
import ShoppingList from "./ShoppingList";
import AddItemForm from "./components/AddItemForm";
function App() {

  const shoplist1 = v1()
  const shoplist2 = v1()

  const [shoplists, setShoplists] = useState<ShoplistsType[]>([
    {id: shoplist1, title: "What to buy", filter: "All"},
    {id: shoplist2, title: "What to buy today", filter: "All"},
  ])

  const [goods, setGoods] = useState<GoodsType>({
    [shoplist1]: [
      {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
      {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
      {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
      {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    ],
    [shoplist2]: [
      {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
      {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
      {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
      {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    ],
  })


  function changeFilterValue(shoplistId: string, filter: FilterValue) {

    setShoplists(shoplists.map(el=>el.id===shoplistId?{...el,filter}:el))

  }

  function addGoods(shoplistId: string, title: string) {
    const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
    const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
    const addNewGoods = {
      id: v1(),
      title: title,
      expectedPrice: `$${getRandomNumberForExpectedPrice}`,
      realPrice: '$' + getRandomNumberForRealPrice,
      inCart: false
    }
      setGoods({...goods,[shoplistId]:[...goods[shoplistId],addNewGoods]})

  }

  function deleteGoods(shoplistId: string, goodsId: string) {
    setGoods({...goods,[shoplistId]:goods[shoplistId].filter(el=>el.id!==goodsId)})

  }

  function changeGoodsStatus(shoplistId: string, goodsId: string, inChecked: boolean) {

    setGoods({...goods,[shoplistId]:goods[shoplistId].map(el=>el.id===goodsId ? {...el, inCart: inChecked}:el)})

  }

  function deleteShopList(shoplistId: string) {

    setShoplists(shoplists.filter(el=>el.id!==shoplistId))

  }

  function  updateGoodsTitle(shoplistId: string, id:string,newTitle: string) {

    setGoods({
      ...goods,
      [shoplistId]: goods[shoplistId].map(el => el.id === id? {...el, title: newTitle} : el)
    })
  }


  function updateShopListsTitle( shoplistId: string, newTitle:string) {
  setShoplists(shoplists.map(el=>el.id===shoplistId?{...el,title:newTitle}:el))
  }

  const mappedShoplists = shoplists.map(el => {

    let filteredGoods: Array<GoodType> = []

    if (el.filter === 'All') {
      filteredGoods = goods[el.id]
    }
    if (el.filter === 'Not to buy') {
      filteredGoods = goods[el.id].filter(el => !el.inCart)
    }
    if (el.filter === 'Bought') {
      filteredGoods = goods[el.id].filter(el => el.inCart)
    }

    return (
        <ShoppingList
            key={el.id}
            title={el.title}
            goods={filteredGoods}
            addGoods={addGoods}
            changeFilterValue={changeFilterValue}
            deleteGoods={deleteGoods}
            changeGoodsStatus={changeGoodsStatus}
            filter={el.filter}
            deleteTodoList={deleteShopList}
            shoplistId={el.id}
            updateGoodsTitle={updateGoodsTitle}
            updateShopListsTitle={updateShopListsTitle}
        />
    )
  })


  function addGoodShopList(newTitle:string) {
    let NewShoplistId = v1()
    let newList:ShoplistsType = {id:NewShoplistId,title:newTitle,filter:'All'}
    setShoplists([...shoplists,newList])
    setGoods({...goods,[NewShoplistId]:[]})
  }
  

  return (
    <div className="App">
      <AddItemForm callback={addGoodShopList}/>
      {mappedShoplists}
    </div>
  );
}

export default App;
