import {SignUpForm} from "./SignUpForm";
import {LoginForm} from "./LoginForm";
import {useParams} from "react-router";
import {useState} from "react";

export const Login = () => {
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
                            <h3 className="mb-4">Регистрация</h3>
                            <SignUpForm />
                            <p>
                                Уже есть аккаунт?{" "}
                                <a
                                    role="button"
                                    className={"alert-danger"}
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Вход</h3>
                            <LoginForm />
                            <p>
                                Еще нет аккаунта?{" "}
                                <a
                                    role="button"
                                    className={"alert-danger"}
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Зарегистрироваться
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}