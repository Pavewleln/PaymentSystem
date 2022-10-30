import {Line, LineChart} from "recharts";
import convert from '../../../../img/convert.svg'
import BTN from '../../../../img/BTN.png'
import LTC from '../../../../img/LTM.png'
import ETM from '../../../../img/ETM.png'
import BNB from '../../../../img/BNB.png'
import s from './Rates.module.scss'
import {randomInt} from "../../../Utils/randomInt";

export const Rates = () => {
    // const rates = useSelector(getRates())
    const rates = [
        {
            code: 'BNB',
            value: 294.42,
            data: [{
                "name": "Page A", "uv": randomInt(10, 1000)
            }, {
                "name": "Page B", "uv": randomInt(10, 1000)
            }, {
                "name": "Page C", "uv": randomInt(10, 1000)
            }, {
                "name": "Page D", "uv": randomInt(10, 1000)
            }, {
                "name": "Page E", "uv": randomInt(10, 1000)
            }, {
                "name": "Page F", "uv": randomInt(10, 1000)
            }, {
                "name": "Page G", "uv": randomInt(10, 1000)
            }]
        },
        {
            code: 'BTN',
            value: 20509.40,
            data: [{
                "name": "Page A", "uv": randomInt(10, 1000)
            }, {
                "name": "Page B", "uv": randomInt(10, 1000)
            }, {
                "name": "Page C", "uv": randomInt(10, 1000)
            }, {
                "name": "Page D", "uv": randomInt(10, 1000)
            }, {
                "name": "Page E", "uv": randomInt(10, 1000)
            }, {
                "name": "Page F", "uv": randomInt(10, 1000)
            }, {
                "name": "Page G", "uv": randomInt(10, 1000)
            }]
        },
        {
            code: 'LTC',
            value: 54.70,
            data: [{
                "name": "Page A", "uv": randomInt(10, 1000)
            }, {
                "name": "Page B", "uv": randomInt(10, 1000)
            }, {
                "name": "Page C", "uv": randomInt(10, 1000)
            }, {
                "name": "Page D", "uv": randomInt(10, 1000)
            }, {
                "name": "Page E", "uv": randomInt(10, 1000)
            }, {
                "name": "Page F", "uv": randomInt(10, 1000)
            }, {
                "name": "Page G", "uv": randomInt(10, 1000)
            }]
        },
        {
            code: 'AMD',
            value: 0.0025,
            data: [{
                "name": "Page A", "uv": randomInt(10, 1000)
            }, {
                "name": "Page B", "uv": randomInt(10, 1000)
            }, {
                "name": "Page C", "uv": randomInt(10, 1000)
            }, {
                "name": "Page D", "uv": randomInt(10, 1000)
            }, {
                "name": "Page E", "uv": randomInt(10, 1000)
            }, {
                "name": "Page F", "uv": randomInt(10, 1000)
            }, {
                "name": "Page G", "uv": randomInt(10, 1000)
            }]
        }
    ]
    if (rates) {
        return (
            <div className={s.ratesComponent}>
                <div className={s.rates}>
                    {Object.values(rates).map((p) => (
                        <div key={p.code} className={s.rate}>
                            <div className={s.rateLeft}>
                                <img className={s.image}
                                     src={(p.code === "BNB" ? BNB : p.code === "AMD" ? ETM : p.code === "LTC" ? LTC : BTN)}/>
                                <p className={s.usd}>{p.code} <img src={convert}/> USD</p>
                                <p className={s.value}>{p.value}</p>
                                <p className={s.percent}>{randomInt(10, 90) > 50 ? "+" : "-"}{randomInt(10, 90)}%</p>
                            </div>
                            <div className={s.rateRight}>
                                <LineChart width={140} height={40} data={p.data}>
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