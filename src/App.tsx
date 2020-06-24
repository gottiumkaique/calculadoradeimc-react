import React, { useState, useEffect, ChangeEvent } from "react"
import "./styles.css"

const App: React.FC = () => {
    const imc: Function = (weight: number, height: number) => weight / height ** 2
    const [calc, setCalc] = useState<number>(0)
    const [colorImc, setColorImc] = useState<string>("")
    const [height, setHeight] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0)
    const [button, setButton] = useState<boolean>(false)

    function handleClick(e: any) {
        e.preventDefault()
        setCalc(imc(weight, height).toFixed(2))
        setButton(true)
    }

    useEffect(() => {
        if (calc > 0) {
          if (calc < 18.5) {
            setColorImc("#ff0000")
          }else if (calc < 24.9) {
            setColorImc("#0050ff")
          }else if (calc < 29.9) {
            setColorImc("#ffdd00")
          }else if (calc < 39.9) {
            setColorImc("orange")
          }else if (calc > 40) {
            setColorImc("red")
          }
        }
    }, [calc])

    const handleChangeHeight = (e: ChangeEvent <HTMLInputElement>) => {
        setHeight(Number(e.target.value && e.target.value))
    }

    const handleChangeWeight = (e: ChangeEvent <HTMLInputElement>) => {
        setWeight(Number(e.target.value && e.target.value))
    }

    return(
        <div className="app">
            <h1>Calculadora de IMC</h1>

            <strong><label>Peso: </label></strong>
            <input 
                type="number" 
                step="0.1" 
                placeholder="Digite seu peso"
                onChange={ handleChangeWeight }
            />

            <br/>
            <strong><label>Altura: </label></strong>

            <input 
                type="number" 
                step="0.1" 
                placeholder="Digite sua altura"
                onChange={ handleChangeHeight }
            />

            <br/>

            <button type="submit" onClick={handleClick}>CALCULAR IMC</button>

            <div style={{marginTop: button ? "20px": "0"}}>
                {   
                    button ? 
                    calc > 0 ? <h2>{`O seu imc é ${String(calc).replace(".", ", ")}`}</h2> : 
                    <h2 style={{color: "#dd0000", userSelect: "none"}}>Digite um número válido! </h2> : ""
                }
                <h3 style={{color: colorImc}}>
                    {
                    0 < calc ?
                        calc < 18.5 ? "Magreza" : 
                        calc < 24.5 ? "Peso normal": 
                        calc < 29.9 ? "Sobrepeso" : 
                        calc < 39.9 ? "Obesidade 2": 
                        calc > 40 ? "Obesidade 3" : ""  : ""
                    }
                </h3>
            </div>

        </div>
    )
}

export default App