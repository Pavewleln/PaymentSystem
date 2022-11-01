import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import {useDispatch, useSelector} from "react-redux";
import {getCreditCardsList, loadCardsList, TranslateMoney, translateMoneySuccess} from "../../Store/myCreaditCard";
import {getCurrentUserId, getUsersByIds} from "../../Store/users";
import s from './TransactToUser.module.scss'
import {createHistory} from "../../Store/history";
import {createNotice} from "../../Store/notice";

export const TransactToUser = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUserId = useSelector(getCurrentUserId())
    const user = useSelector(getUsersByIds(userId))
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState("Выберите карту");
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
            },
            isContainDigitDot: {
                message: "Можно отправлять только целые числа"
            },
            isMaxLength: {
                message: "Длина суммы не может превышать длину счета"
            },
            isMoney: {
                message: "Нельзя отправлять 0"
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
        dispatch(TranslateMoney(myCardId[0], removeCardSum.toFixed(6), firstRecipientCardId, addCardSum.toFixed(6)))
        dispatch(createHistory(myCardId, Number(data.sum), [firstRecipientCardId], recipientAmountOfMoney.toFixed(6), date, myCardNumber, recipientCardNumber[0], myCardCurrency))
        dispatch(createNotice(currentUserId, Number(data.sum), recipientCardAuthorName, recipientAmountOfMoney.toFixed(6), date, myCardNumber[0], recipientCardNumber[0], myCardCurrency, recipientCardCurrency))
        setData({
            sum: ''
        })
        navigate("/completed")
    };
    const cards = useSelector(getCreditCardsList())
    if (!cards) return "loading"
    const myCardNumber = cards.filter(c => c.numberCard === Number(value)).map(c => c.numberCard)
    const myCardId = cards.filter(c => c.numberCard === Number(value)).map(c => c._id)
    const myCardSum = (cards.filter(c => c.numberCard === Number(value))).map(c => c.amountOfMoney)
    const myCardNumbers = (cards.filter(c => c.userId === currentUserId)).map(c => c.numberCard)
    const removeCardSum = Number(myCardSum) >= Number(data.sum) ? Number(myCardSum) - Number(data.sum) : 0
    const myCardCurrency = (cards.filter(c => c.numberCard === Number(value))).map(c => c.currency)
    const myAmountOfMoney = myCardCurrency === "BTN"
        ? data.sum * 20509.40
        : myCardCurrency === "AMD"
            ? data.sum * 0.0025
            : myCardCurrency === "BNB"
                ? data.sum * 294.42
                : data.sum * 54.70

    const recipientCardId = (cards.filter(c => c.userId === userId)).map(c => c._id)
    const recipientCardNumber = (cards.filter(c => c.userId === userId)).map(c => c.numberCard)
    const firstRecipientCardId = recipientCardId[0]
    const recipientCardSum = (cards.filter(c => c.userId === userId)).map(c => c.amountOfMoney)
    const recipientCardAuthorName = (cards.filter(c => c.userId === userId)).map(c => c.userId)
    // Конвертировать сумму в валюту счета получателя
    const recipientCardCurrency = (cards.filter(c => c.userId === userId)).map(c => c.currency)
    const recipientAmountOfMoney = recipientCardCurrency == "BTN"
        ? myAmountOfMoney / 20509.40
        : recipientCardCurrency == "AMD"
            ? myAmountOfMoney / 0.0025
            : recipientCardCurrency == "BNB"
                ? myAmountOfMoney / 294.42
                : myAmountOfMoney / 54.70
    const addCardSum = Number(myCardSum) >= Number(data.sum) ? Number(recipientCardSum[0]) + recipientAmountOfMoney : 0
    const validate = () => {
        const errors = validator(data, validatorConfig, myCardSum);
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
    const changeSelect = ({target}) => {
        setValue(target.value);
        setData({sum: ''})
    }
    if (myCardNumbers.length < 1) return "Для того, чтобы перевести деньги, заведите карту"
    return recipientCardId.length > 0 ? (
        <form onSubmit={handleSubmit} className={s.form}>
            <h5>Перевод пользователю {user.name}</h5>
            <div>
                <select value={value} className={s.select} onChange={changeSelect}>
                    <option>Выберите карту</option>
                    {myCardNumbers.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>
            <p>Ваш счет: {myCardSum} {myCardCurrency}</p>
            <TextField
                label="Сумма перевода"
                name="sum"
                placeholder={"100.00"}
                value={data.sum}
                onChange={handleChange}
                error={errors.sum}
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Перевести
            </button>
        </form>
    ) : (
        "Вы не можете перевести этому пользователю, так как у него нет карты"
    );
}