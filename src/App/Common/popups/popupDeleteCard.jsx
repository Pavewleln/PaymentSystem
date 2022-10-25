import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import {removeCard} from "../../Store/myCreaditCard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {deletedCreditCardNotice} from "../../Store/notice";
import {getCurrentUserId} from "../../Store/users";
import s from './popus.module.scss'
export const PopupDeleteCard = ({warning, cardData}) => {
    const currentUserId = useSelector(getCurrentUserId())
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const date = new Date().toLocaleString().split(",").slice(0, 1).join(' ')
    const deleteCard = (card) => {
        dispatch(removeCard(card))
        dispatch(deletedCreditCardNotice(currentUserId, date, cardData.numberCard))
        navigate("/completed")
    }
    return (
        <div onClick={warning} className={s.popup}>
            <Modal.Dialog onClick={e => e.stopPropagation()} className={s.dialog}>
                <Modal.Header>
                    <Modal.Title>Вы точно хотите удалить эту карту?</Modal.Title>
                </Modal.Header>

                <Modal.Body className={s.bodyDelete}>
                    <p> Счет будет закрыт навсегда, вы не сможете восстановить деньги, имеющиеся на карте. Вы можете перевести свои деньги на другую карту и только тогда ее удалить.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" className={"m-2"} onClick={warning}>Отмена</Button>
                    <Button variant="danger" className={"m-2"} onClick={() => deleteCard(cardData._id)}>Удалить карту</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}