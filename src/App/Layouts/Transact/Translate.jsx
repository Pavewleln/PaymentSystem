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
            isContainDigit: {
                message: "Можно отправлять только целые числа"
            },
            isMoney: {
                message: "Минимальная сумма - 10"
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
        dispatch(createHistory(myCardId, Number(data.sum), recipientCardId, Number(data.sum), date, myCardNumber, Number(data.recipient)))
        dispatch(createNotice(currentUserId, Number(data.sum), recipientCardAuthorName, Number(data.sum), date, myCardNumber, Number(data.recipient)))
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

    const recipientCardId = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c._id)
    const recipientCardAuthorName = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c.userId)
    const recipientCardSum = (cards.filter(c => c.numberCard === Number(data.recipient))).map(c => c.amountOfMoney)
    const addCardSum = Number(myCardSum) >= Number(data.sum) ? Number(recipientCardSum) + Number(data.sum) : 0

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
            <TextField
                label="Номер карты получателя"
                type={"cardNum"}
                name="recipient"
                value={data.recipient}
                onChange={handleChange}
                error={errors.recipient}
            />
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
    );
}