import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {getCreditCardsList, loadCardsList, TranslateMoney} from "../../Store/myCreaditCard";
import {validator} from "../../Utils/validator";
import TextField from "../form/textField";
import {getCurrentUserId} from "../../Store/users";
import {createHistory} from "../../Store/history";

export const AddMoneyPopup = ({addMoney}) => {
    const navigate = useNavigate()
    const cards = useSelector(getCreditCardsList())
    const currentUserId = useSelector(getCurrentUserId())
    const {cardId} = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState("Выберите карту");
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        sum: ''
    });
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')

    const validatorConfig = {
        sum: {
            isRequired: {
                message: "Сумма обязательна для заполнения"
            },
            limitMoney: {
                message: "У вас не хватает денег"
            }
        }
    };

    useEffect(() => {
        if (cards) dispatch(loadCardsList());
    }, []);
    useEffect(() => {
        if (cards) validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(TranslateMoney(recipientCardId, removeCardSum, myCardId, addCardSum))
        setData({
            sum: ''
        })
        navigate("/completed")
    };
    const changeSelect = ({target}) => {
        setValue(target.value);
    }
    if (!cards) return "loading"
    const myCardId = (cards.filter(c => c._id === cardId)).map(c => c._id)
    const myCardSum = (cards.filter(c => c._id === cardId)).map(c => c.amountOfMoney)
    const myCardNumbers = ((cards.filter(c => c.userId === currentUserId)).filter(c => c._id !== cardId)).map(c => c.numberCard)
    const recipientCardSum = cards.filter(c => c.numberCard == value).map(c => c.amountOfMoney)
    const recipientCardId = cards.filter(c => c.numberCard == value).map(c => c._id)

    const removeCardSum = Number(recipientCardSum) >= Number(data.sum) ? Number(recipientCardSum) - Number(data.sum) : 0
    const addCardSum = Number(recipientCardSum) >= Number(data.sum) ? Number(myCardSum) + Number(data.sum) : 0

    const validate = () => {
        const errors = validator(data, validatorConfig, recipientCardSum, recipientCardId);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div onClick={addMoney} className={"p-4 m-2 position-fixed top-0 w-100 h-100 "}
             style={{left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
            <Modal.Dialog onClick={e => e.stopPropagation()}
                          className={"p-5 bg-white rounded-4 w-50 position-relative"}>
                <Modal.Header>
                    <Modal.Title>Пополнение карты</Modal.Title>
                </Modal.Header>

                <Modal.Body className={"w-100"}>
                    <p>Вы можете пополнить карту только с других своих карт или попросите друга. Данные о переводах между своими картами не остаются в истории</p>
                    <form onSubmit={handleSubmit} className={"m-auto p-5 w-50"}>
                        {myCardNumbers.length < 1
                            ? <div>У вас только одна карта</div>
                            : <div><p>Выберите карту</p><select value={value} onChange={changeSelect} className={"bg-white border rounded-3"}
                                      style={{paddingLeft: '20px', paddingTop: '5px', paddingRight: '48px', paddingBottom: '5px'}}>
                                <option>Выберите карту</option>
                                {myCardNumbers.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            </div>}
                        <TextField
                            label="Сумма перевода"
                            name="sum"
                            value={data.sum}
                            onChange={handleChange}
                            error={errors.sum}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Пополнить
                        </button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className={"m-2"} onClick={addMoney}>Отмена</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}