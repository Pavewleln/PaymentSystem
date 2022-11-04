import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import RadioField from "../../Common/form/radioField";
import CheckBoxField from "../../Common/form/checkBoxField";
import TextAreaField from "../../Common/form/textAreaField";
import {signUp} from "../../Store/users";
import {useTranslation} from "react-i18next";

export const SignUpForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        sex: "male",
        name: "",
        licence: false,
        location: "",
        dateOfBirth: '',
        description: '',
        telephone: ''
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
        location: {
            isRequired: {
                message: t("isRequiredLocation")
            }
        },
        telephone: {
            isRequired: {
                message: t("isRequiredTelephone")
            }
        },
        dateOfBirth: {
            isRequired: {
                message: t("isRequiredDateOfBirth")
            }
        },
        name: {
            isRequired: {
                message: t("isRequiredName")
            },
            min: {
                message: t("minName"),
                value: 3
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
        licence: {
            isRequired: {
                message:
                    t("isRequiredLicense")
            }
        }
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
        const newData = {
            ...data,
        };
        console.log(newData)
        dispatch(signUp(newData));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={t("name")}
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
                placeholder={"Имя"}
            />
            <TextField
                label={t("email")}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                placeholder={t("email")}
            />
            <TextField
                label={t("password")}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                placeholder={t("password")}
            />
            <TextField
                label={t("dateOfBirth")}
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                placeholder={"дд.мм.гггг"}
            />
            <TextField
                label={t("phoneNumber")}
                type="tel"
                name="telephone"
                value={data.telephone}
                onChange={handleChange}
                error={errors.telephone}
                placeholder={"+7 (___) __-__"}
            />
            <TextAreaField
                label={t("placeOfResidence")}
                value={data.location}
                error={errors.location}
                onChange={handleChange}
                name={"location"}
                placeholder={t("placeOfResidence")}
            />
            <TextAreaField
                label={t("description")}
                value={data.description}
                onChange={handleChange}
                name={"description"}
                placeholder={t("description")}
            />
            <RadioField
                options={[
                    {name: t("male"), value: "male"},
                    {name: t("female"), value: "female"},
                    {name: t("other"), value: "other"}
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label={t("sex")}
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                {t("confirmProfileChange")}
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                {t("register")}
            </button>
        </form>
    );
}