import {SignUpForm} from "./SignUpForm";
import {LoginForm} from "./LoginForm";
import {useParams} from "react-router";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export const Login = () => {
    const {t} = useTranslation();
    const {type} = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 bg-white rounded offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">{t("registration")}</h3>
                            <SignUpForm />
                            <p>
                                {t("alreadyHaveAnAccount")}{" "}
                                <a
                                    role="button"
                                    className={"alert-danger"}
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    {t("toComeIn")}
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">{t("entrance")}</h3>
                            <LoginForm />
                            <p>
                                {t("doNotHaveAnAccountYet")}{" "}
                                <a
                                    role="button"
                                    className={"alert-danger"}
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    {t("register")}
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}