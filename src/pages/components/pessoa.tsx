
import { Dashboard } from '../dashboard';
import * as React from 'react';
import { NOMEM } from 'dns';
interface Props{
    nome:string,
    cpf:string,
    idade:string,
    descricao:string,
    funcao: any,
    editar:any
};
export const Pessoa:React.FC<Props>  = (Props) => {




    return (
        <div id="pessoa">
            <div id='tituloNome'>
                <div>
                <p>{Props.nome}</p> 
                </div>
                <div>
                    <a onClick={Props.editar} href="#">editar</a>
                    <a onClick={Props.funcao} href="#">excluir</a>
                </div>   
            </div>
            <div>
                <p>{Props.cpf}</p>
            </div>
            <div>
                <p>{Props.idade}</p>
            </div>
            <div>
                <p>{Props.descricao}</p>
            </div>
        </div>
    );
};