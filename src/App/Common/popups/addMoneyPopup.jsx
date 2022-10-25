import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {getCreditCardsList, loadCardsList, TranslateMoney} from "../../Store/myCreaditCard";
import {validator} from "../../Utils/validator";
import TextField from "../form/textField";
import {getCurrentUserId} from "../../Store/users";
import s from './popus.module.scss'

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
        <div onClick={addMoney} className={s.popup}>
            <Modal.Dialog onClick={e => e.stopPropagation()} className={s.dialog}>
                <Modal.Header>
                    <Modal.Title>Пополнение карты</Modal.Title>
                </Modal.Header>

                <Modal.Body className={s.body}>
                    <p className={s.bodyText}>Вы можете пополнить карту только с других своих карт или попросите друга. Данные о переводах
                        между своими картами не остаются в истории</p>
                    <form onSubmit={handleSubmit} className={s.form}>
                        {myCardNumbers.length < 1
                            ? <div>У вас только одна карта</div>
                            : <div>
                                <p>Выберите карту</p>
                                <select value={value} className={s.select} onChange={changeSelect}>
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
                        <Button className={s.button}
                            type="submit"
                            disabled={!isValid}
                        >
                            Пополнить
                        </Button>
                    </form>
                </Modal.Body>

                <Modal.Footer className={s.prev}>
                    <Button variant="secondary" onClick={addMoney}>Отмена</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}