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
        dispatch(TranslateMoney(myCardId[0], removeCardSum, firstRecipientCardId, addCardSum))
        dispatch(createHistory(myCardId, Number(data.sum), [firstRecipientCardId], Number(data.sum), date, myCardNumber, recipientCardNumber[0]))
        dispatch(createNotice(currentUserId, Number(data.sum), recipientCardAuthorName, Number(data.sum), date, myCardNumber[0], recipientCardNumber[0]))
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

    const recipientCardId = (cards.filter(c => c.userId === userId)).map(c => c._id)
    const recipientCardNumber = (cards.filter(c => c.userId === userId)).map(c => c.numberCard)
    const firstRecipientCardId = recipientCardId[0]
    const recipientCardSum = (cards.filter(c => c.userId === userId)).map(c => c.amountOfMoney)
    const recipientCardAuthorName = (cards.filter(c => c.userId === userId)).map(c => c.userId)
    const addCardSum = Number(myCardSum) >= Number(data.sum) ? Number(recipientCardSum[0]) + Number(data.sum) : 0
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
    }

    return recipientCardId.length > 0 ? (
        <form onSubmit={handleSubmit} className={s.form}>
            <h5>Перевод пользователю {user.name}</h5>
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