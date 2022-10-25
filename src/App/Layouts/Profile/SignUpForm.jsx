import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import RadioField from "../../Common/form/radioField";
import CheckBoxField from "../../Common/form/checkBoxField";
import TextAreaField from "../../Common/form/textAreaField";
import {signUp} from "../../Store/users";

export const SignUpForm = () => {
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
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        location: {
            isRequired: {
                message: "Место жительства обязательно для заполнения"
            }
        },
        telephone: {
            isRequired: {
                message: "Телефон обязателен для заполнения"
            }
        },
        dateOfBirth: {
            isRequired: {
                message: "Дата рождения обязательна"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: `Имя должно состоять минимум из 3 символов`,
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
                placeholder={"Имя"}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                placeholder={"Почта"}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                placeholder={"Пароль"}
            />
            <TextField
                label="Дата рождения"
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                placeholder={"дд.мм.гггг"}
            />
            <TextField
                label="Телефон"
                type="tel"
                name="telephone"
                value={data.telephone}
                onChange={handleChange}
                error={errors.telephone}
                placeholder={"+7 (___) __-__"}
            />
            <TextAreaField
                label={"Место жительства"}
                value={data.location}
                error={errors.location}
                onChange={handleChange}
                name={"location"}
                placeholder={"Место жительства"}
            />
            <TextAreaField
                label={"О себе"}
                value={data.description}
                onChange={handleChange}
                name={"description"}
                placeholder={"О себе"}
            />
            <RadioField
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" },
                    { name: "Другое", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Зарегистрироваться
            </button>
        </form>
    );
}