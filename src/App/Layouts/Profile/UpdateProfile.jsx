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
import {useTranslation} from "react-i18next";

export const UpdateProfile = () => {
    const {t} = useTranslation();
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
                <div className="col-md-7 offset-md-3 shadow p-4 p-2 rounded-4 bg-white">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label={t("name")}
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
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
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                {t("update")}
                            </button>
                        </form>
                    ) : (
                        t("loading")
                    )}
                </div>
            </div>
        </div>
    );
}