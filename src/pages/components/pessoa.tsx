
import * as React from 'react';
interface Props{
    nome:string,
    cpf:string,
    idade:string,
    descricao:string,
    funcao: any,
    editar:any
};
const Pessoa:React.FC<Props>  = (Props) => {




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

export default Pessoa