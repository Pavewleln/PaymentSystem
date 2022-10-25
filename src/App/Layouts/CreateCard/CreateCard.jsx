import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import RadioField from "../Common/form/radioField";
import {useNavigate} from "react-router";
import {
    createNewCard,
    getAllBanksList,
    getCreditCardsList,
    loadBanksNameList,
    loadCardsList
} from "../Store/myCreaditCard";
import {getCurrentUserData, getCurrentUserId, getIsLoggedIn} from "../Store/users";
import SelectField from "../Common/form/selectField";
import {validator} from "../Utils/validator";

export const CreateCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        bank: '',
        license: false,
        format: 'electronic'
    });

    const currentUserData = useSelector(getCurrentUserData())
    const isLoggedIn = useSelector(getIsLoggedIn());
    const banks = useSelector(getAllBanksList())
    const currentUserId = useSelector(getCurrentUserId())
    const cards = useSelector(getCreditCardsList())

    useEffect(() => {
        dispatch(loadCardsList());
    }, [isLoggedIn]);
    useEffect(() => {
        dispatch(loadBanksNameList());
    }, [isLoggedIn]);
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        },
        bank: {
            isRequired: {
                message:
                    "Это поле обязательно"
            }
        }
    };
    if(!cards) {
        return;
    }
    if (banks) {
        const myCreditCards = cards.filter((p) => p.userId === currentUserId)
        const myBanks = myCreditCards.map((c) => c.bank)
        const busyBanks = banks.map((c) => c.name)
        const set = new Set(myBanks);
        const allowedBanks = busyBanks.filter(item => !set.has(item))

        const handleChange = (target) => {
            setData((prevState) => ({
                    ...prevState, [target.name]: target.value
                })
            )
        }
        const handleSubmit = (e) => {
            e.preventDefault()
            const isValid = validate();
            if (!isValid) return;
            dispatch(createNewCard(data, currentUserData.name))
            navigate('/profile')
        }

        const banksList = allowedBanks.map((b) => ({
            label: b,
            value: b
        }));
        return (
            <form onSubmit={handleSubmit} className={"p-4 m-5"}>
                <SelectField
                    label="Выбери карту"
                    defaultOption={banksList.length !== 0 ? "Можно выбрать только карту, которой у вас еще нет" : "У вас есть все карты нашего банка"}
                    options={banksList}
                    name="bank"
                    error={errors.bank}
                    onChange={handleChange}
                    value={data.bank}
                />
                <RadioField
                    options={[
                        {name: "Прислать карту на ваш адрес", value: "real"},
                        {name: "Создать электронную", value: "electronic"}
                    ]}
                    value={data.format}
                    name="format"
                    onChange={handleChange}
                    label="Какой формат карты вам нужен"
                />
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        )
    } else {
        return (
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
            </div>
        )
    }
}