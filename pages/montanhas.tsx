/* eslint-disable @next/next/no-img-element */
// page to consume /api/best-hills

import { useEffect, useState } from "react";
import { Hill } from "./api/best-hills";

const Montanhas = () => {
    const [montanhas, setMontanhas] = useState<Hill[]>([]);
    useEffect( () => {
        fetch("/api/best-hills")
        .then(res => res.json())
        .then(({data}) => {
            setMontanhas(data.hills)
        })
    }, []);
    return (
        <div>
            <h1>Montanhas</h1>
            <ul>
                {montanhas.map(montanha => (
                    <li key={montanha.id}>
                        <h2>{montanha.name}</h2>
                        <p>{montanha.location}</p>
                        <p>{montanha.height}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Montanhas