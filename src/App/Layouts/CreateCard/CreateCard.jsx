import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import RadioField from "../../Common/form/radioField";
import {useNavigate} from "react-router";
import {
    createNewCard,
    getAllBanksList,
    getCreditCardsList,
    loadBanksNameList,
    loadCardsList
} from "../../Store/myCreaditCard";
import {getCurrentUserData, getCurrentUserId, getIsLoggedIn} from "../../Store/users";
import SelectField from "../../Common/form/selectField";
import {validator} from "../../Utils/validator";
import s from './CreateCard.module.scss'
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const CreateCard = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        bank: '',
        license: false,
        format: 'electronic',
        currency: 'BTN'
    });
    const currencyArray = ["BTN", "BNB", "LTC", "AMD"]

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
        },
        currency: {
            isRequired: {
                message:
                    "Это поле обязательно"
            }
        }
    };
    if (!cards) {
        return;
    }
    if (banks) {
        const myCreditCards = cards.filter((p) => p.userId === currentUserId)
        const myBanks = myCreditCards.map((c) => c.bank)
        const busyBanks = banks.map((c) => c.name)
        const set = new Set(myBanks);
        const allowedBanks = busyBanks.filter(item => !set.has(item))
        const amountOfMoney = data.currency === "BTN"
            ? 100 / 20509.40
            : data.currency === "AMD"
                ? 100 / 0.0025
                : data.currency === "BNB"
                    ? 100 / 294.42
                    : 100 / 54.70

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
            dispatch(createNewCard(data.bank, data.currency, currentUserData.name, amountOfMoney.toFixed(6)))
            navigate('/profile')
        }

        const banksList = allowedBanks.map((b) => ({
            label: b,
            value: b
        }));
        const currencyList = currencyArray.map((c) => ({
            value: c,
            label: c
        }))
        return (
            <form onSubmit={handleSubmit} className={s.form}>
                <p>{t("availableCurrencies")}</p>
                <SelectField
                    label={t("chooseMap")}
                    defaultOption={banksList.length !== 0 ? t("youCanOnlySelectCardThatYouDoNotHaveYet") : t("youHaveAllTheCardsOfOurBank")}
                    options={banksList}
                    name="bank"
                    error={errors.bank}
                    onChange={handleChange}
                    value={data.bank}
                />
                <SelectField
                    label={t("selectCurrencies")}
                    defaultOption={t("selectCurrencies")}
                    options={currencyList}
                    name="currency"
                    error={errors.currency}
                    onChange={handleChange}
                    value={data.currency}
                />
                <RadioField
                    options={[
                        {name: t("sendCardToYourAddress"), value: "real"},
                        {name: t("createAnElectronic"), value: "electronic"}
                    ]}
                    value={data.format}
                    name="format"
                    onChange={handleChange}
                    label={t("whatCardFormatDoYouNeed")}
                />
                <Button
                    type="submit"
                    disabled={!isValid}
                >
                    {t("create")}
                </Button>
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