import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";

export const Completed = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Completed</h1>
            <Button onClick={() => navigate("/home")}>Вернуться на главную</Button>
        </div>
    )
}