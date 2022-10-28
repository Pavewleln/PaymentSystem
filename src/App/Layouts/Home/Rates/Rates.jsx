import {Line, LineChart} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import convert from '../../../../img/convert.svg'
import BTN from '../../../../img/BTN.png'
import LTC from '../../../../img/LTM.png'
import ETM from '../../../../img/ETM.png'
import BNB from '../../../../img/BNB.png'
import {getRates} from "../../../Store/rates";
import s from './Rates.module.scss'

export const Rates = () => {
    const dispatch = useDispatch()
    const rates = useSelector(getRates())
    if (rates) {
        const data = [{
            "name": "Page A", "uv": 4000
        }, {
            "name": "Page B", "uv": 3000
        }, {
            "name": "Page C", "uv": 2000
        }, {
            "name": "Page D", "uv": 2780
        }, {
            "name": "Page E", "uv": 1890
        }, {
            "name": "Page F", "uv": 2390
        }, {
            "name": "Page G", "uv": 3490
        }]
        return (
            <div>
                <div className={s.rates}>
                    {Object.values(rates).map((p) => (
                        <div key={p.code} className={s.rate}>
                            <div className={s.rateLeft}>
                                <img
                                    src={(p.code === "BNB" ? BNB : p.code === "AMD" ? ETM : p.code === "LTC" ? LTC : BTN)}/>
                                <p className={s.usd}>{p.code} <img src={convert}/> USD</p>
                                <p className={s.value}>{p.value}</p>
                                <p>-23%</p>
                            </div>
                            <div className={s.rateRight}>
                                <LineChart width={140} height={40} data={data}>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
                                </LineChart>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
}