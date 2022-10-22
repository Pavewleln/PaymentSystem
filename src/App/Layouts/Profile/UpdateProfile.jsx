import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, getCurrentUserId, updateUserData} from "../../Store/users";
import {validator} from "../../Utils/validator";
import TextField from "../../Common/form/textField";
import RadioField from "../../Common/form/radioField";
import TextAreaField from "../../Common/form/textAreaField";
import CheckBoxField from "../../Common/form/checkBoxField";
import {useNavigate} from "react-router";
import {updateUserDataNotice} from "../../Store/notice";

export const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUserId = useSelector(getCurrentUserId())
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        dispatch(updateUserData({
            ...data
        }));
        dispatch(updateUserDataNotice(currentUserId, date))
        navigate(`/profile`)
    };
    useEffect(() => {
        if (currentUser && !data) {
            setData({
                ...currentUser
            });
        }
    }, [currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

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
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container">
            <div className="row m-3">
                <div className="col-md-6 offset-md-3 shadow p-4 p-2 rounded-4 bg-white">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
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
                                    {name: "Мужчина", value: "male"},
                                    {name: "Женщина", value: "female"},
                                    {name: "Другое", value: "other"}
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
                                Подтвердить изменение профиля
                            </CheckBoxField>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
}