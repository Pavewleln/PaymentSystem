import {Line, LineChart} from "recharts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import convert from '../../../img/convert.svg'
import BTN from '../../../img/BTN.png'
import LTC from '../../../img/LTM.png'
import ETM from '../../../img/ETM.png'
import BNB from '../../../img/BNB.png'
import {getRates, loadRatesList} from "../../Store/rates";

export const Rates = () => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadRatesList())
    // }, [])
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
                <div className="d-flex">
                    {Object.values(rates).map((p) => (
                        <div key={p.code} className="p-2 m-2 rounded-4 d-flex align-items-center bg-white">
                            <div className={"p-2"}>
                                <img
                                    src={(p.code === "BNB" ? BNB : p.code === "AMD" ? ETM : p.code === "LTC" ? LTC : BTN)}/>
                                <p style={{fontSize: '16px', marginTop: '5px'}}>{p.code} <img src={convert}/> USD</p>
                                <p style={{fontSize: '22px', lineHeight: '0'}}>{p.value}</p>
                                <p>-23%</p>
                            </div>
                            <div className={"p-2"}>
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