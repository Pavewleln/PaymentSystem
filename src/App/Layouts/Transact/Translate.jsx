import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import {useDispatch, useSelector} from "react-redux";
import {getCreditCardsList, loadCardsList, TranslateMoney, translateMoneySuccess} from "../../Store/myCreaditCard";
import {createHistory} from "../../Store/history";
import {getCurrentUserId} from "../../Store/users";
import {createNotice} from "../../Store/notice";
import s from './Translate.module.scss'

export const Translate = () => {
    const {cardId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUserId = useSelector(getCurrentUserId())
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        recipient: '',
        sum: ''
    });
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')

    const validatorConfig = {
        recipient: {
            isRequired: {
                message: "Получатель обязателен"
            },
            undefinedRecipient: {
                message: "Пользователя с таким номеров карты не существует"
            }
        },
        sum: {
            isRequired: {
                message: "Сумма обязательна для заполнения"
            },
            limitMoney: {
                message: "У вас не хватает денег"
            },
            isMaxLength: {
                message: "Длина суммы не может превышать длину счета"
            },
            isContainDigitDot: {
                message: "Можно отправлять только целые числа"
            },
            isMoney: {
                message: "Нельзя отправлять 0"
            }
        }
    };

    useEffect(() => {
        if(cards) dispatch(loadCardsList());
    }, []);
    useEffect(() => {
        if(cards) validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(TranslateMoney(myCardId, removeCardSum, recipientCardId, addCardSum))
        dispatch(createHistory(myCardId, Number(data.sum), recipientCardId, recipientAmountOfMoney, date, myCardNumber, Number(data.recipient), myCardCurrency))
        dispatch(createNotice(currentUserId, Number(data.sum), recipientCardAuthorName, recipientAmountOfMoney, date, myCardNumber, Number(data.recipient), myCardCurrency, recipientCardCurrency))
        setData({
            recipient: '',
            sum: ''
        })
        navigate("/completed")
    };
    const cards = useSelector(getCreditCardsList())
    if (!cards) return "loading"

    const myCardId = (cards.filter(c => c._id === cardId)).map(c => c._id)
    const myCardNumber = (cards.filter(c => c._id === cardId)).map(c => c.numberCard)
    const myCardSum = (cards.filter(c => c._id === cardId)).map(c => c.amountOfMoney)
    const removeCardSum = Number(myCardSum) >= Number(data.sum) ? Number(myCardSum) - Number(data.sum) : 0
    // Конвертировать сумму в доллары
    const myCardCurrency = (cards.filter(c => c._id === cardId)).map(c => c.currency)
    const myAmountOfMoney = myCardCurrency === "BTN"
        ? data.sum * 20509.40
        : myCardCurrency === "AMD"
            ? data.sum * 0.0025
            : myCardCurrency === "BNB"
                ? data.sum * 294.42
                : data.sum * 54.70

    const recipientCardId = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c._id)
    const recipientCardAuthorName = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c.userId)
    const recipientCardSum = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c.amountOfMoney)
    // Конвертировать сумму в валюту счета получателя
    const recipientCardCurrency = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c.currency)
    const recipientAmountOfMoney = recipientCardCurrency == "BTN"
        ? myAmountOfMoney / 20509.40
        : recipientCardCurrency == "AMD"
            ? myAmountOfMoney / 0.0025
            : recipientCardCurrency == "BNB"
                ? myAmountOfMoney / 294.42
                : myAmountOfMoney / 54.70
    const addCardSum = Number(myCardSum) >= Number(data.sum) ? Number(recipientCardSum) + recipientAmountOfMoney : 0
    const validate = () => {
        const errors = validator(data, validatorConfig, myCardSum, recipientCardId);
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
        <form onSubmit={handleSubmit} className={s.form}>
            <p>Счет карты: {myCardSum} {myCardCurrency}</p>
            <TextField
                label={"Номер карты получателя"}
                type={"cardNum"}
                name="recipient"
                value={data.recipient}
                onChange={handleChange}
                error={errors.recipient}
            />
            <TextField
                label={`Сумма перевода (${myCardCurrency})`}
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
    );
}