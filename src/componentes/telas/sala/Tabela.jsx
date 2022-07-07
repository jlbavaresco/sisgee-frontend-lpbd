import { useContext } from 'react';
import SalaContext from './SalaContext';
import Alerta from '../../Alerta';

function Tabela() {

    // pegando as variáveis e métodos do contexto
    const { setObjeto, alerta, setAlerta,
        listaObjetos, remover, setEditar, recuperar } = useContext(SalaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Salas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        numero: "",
                        descricao: "",
                        capacidade: "", 
                        predio : ""
                    });
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhuma sala encontrada</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Número</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Capacidade</th>
                                <th scope="col">Prédio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { remover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>
                                    <td>{objeto.numero}</td>
                                    <td>{objeto.descricao}</td>
                                    <td>{objeto.capacidade}</td>
                                    <td>{objeto.nomepredio}</td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Tabela;