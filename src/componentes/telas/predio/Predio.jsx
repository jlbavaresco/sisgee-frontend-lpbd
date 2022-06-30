import { useState, useEffect } from 'react';
import PredioContext from './PredioContext';
import Tabela from './Tabela';

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaPredios = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaPredios();

            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaPredios()
    }, []);

    return (
       <PredioContext.Provider value={
        {
            alerta, setAlerta, 
            listaObjetos, setListaObjetos,
            recuperaPredios, remover
        }
       }>
            <Tabela/>
       </PredioContext.Provider>
    )
}

export default Predio;