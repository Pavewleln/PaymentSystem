import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import CheckBoxField from "../../Common/form/checkBoxField";
import {getAuthError, login} from "../../Store/users";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export const LoginForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthError());
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: t("isRequiredEmail")
            },
            isEmail: {
                message: t("isEmailEmail")
            }
        },
        password: {
            isRequired: {
                message: t("isRequiredPassword")
            },
            isCapitalSymbol: {
                message: t("isCapitalSymbolPassword")
            },
            isContainDigit: {
                message: t("isContainDigitPassword")
            },
            min: {
                message: t("minPassword"),
                value: 8
            }
        },
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(login(data));
        navigate("/home")
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={t("email")}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={t("password")}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                {t("remainInTheSystem")}
            </CheckBoxField>
            { loginError && <p className={"text-danger"}>{loginError}</p> }
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                {t("toComeIn")}
            </button>
        </form>
    );
}