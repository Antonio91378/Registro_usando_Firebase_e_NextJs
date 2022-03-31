
import * as React from 'react';
import { DescriptionContent } from './components/description_content';
import {database} from '../../services/firebase';
import { useState, useEffect } from 'react';
import { push, ref, onValue, remove, update, child} from "firebase/database";
import {Pessoa} from './components/pessoa'

interface Props{

}

type Pessoas = {
    chave: string,
    nome: string,
    cpf: string,
    idade: string,
    descricao:string,
};

export const Dashboard:React.FC<Props> = (Props) => {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [idade, setIdade] = useState('')
    const [descricao, setDescricao] = useState('')
    const[busca, setBusca] = useState<Pessoas[]>()
    const[pessoas, setPessoas] = useState<Pessoas[]>()
    const[estaBuscando,setEstaBuscando] = useState(false)
    const[chave,setChave] = useState('')
    const[atualizando,setAtualizando] = useState(false)


    useEffect(()=>{
        const RefPessoas = ref(database,'pessoas')
        return onValue(ref(database,'pessoas'),(snapshot =>{
            const nomee = (snapshot.val()) || 'anonimo'
            
            const resultadoPessoas = Object.entries<Pessoas>(nomee ?? {}).map(([chave, valor]) =>{
                return{
                    'chave': chave,
                    'nome': valor.nome,
                    'cpf' : valor.cpf,
                    'idade' : valor.idade,
                    'descricao': valor.descricao
                }
            })

            setPessoas(resultadoPessoas)

        }))

    },[])

    function gravar(event: React.FormEvent){

        event.preventDefault()
        const dados = {
            nome,
            cpf,
            idade,
            descricao
        }
        push(ref(database,'pessoas'),dados)
        setNome('')
        setCpf('')
        setIdade('')
        setDescricao('')
    }


    function deletar(reff: string){
        const RefPessoass = ref(database,`pessoas/${reff}`)
        remove(RefPessoass)
    }


    function pesquisar(event: { target: HTMLInputElement }){
        const palavra = event.target.value
        if(palavra.length > 0){
            setEstaBuscando(true)
    
            const dados = new Array
    
            pessoas?.map(pessoa =>{
                const regra = new RegExp(event.target.value, "gi")
               if( regra.test(pessoa.nome)){
                dados.push(pessoa)
               }
            })
    
            setBusca(dados)
        }else{
            setEstaBuscando(false)
        }

    }

    function editarDados(pessoa: Pessoas){
        setAtualizando(true)
        setChave(pessoa.chave)
        setNome(pessoa.nome)
        setCpf(pessoa.cpf)
        setIdade(pessoa.idade)
        setDescricao(pessoa.descricao)
    }

    function atualizarContato(){
        const RefPessoasss = ref(database,'pessoas')
        const dados = {
          'nome':  nome,
           'cpf': cpf,
           'idade': idade,
           'descricao': descricao
        }
        
        const antigo = child(RefPessoasss,chave)
        update(antigo,dados)
        setNome('')
        setCpf('')
        setIdade('')
        setDescricao('') 

        setAtualizando(false)

    }


    return (
        <div className='box'>
            <div>
                <form id='form' >
                    <h1>registrar pessoas</h1>
                    <DescriptionContent name='nome' type='text' value={nome} event={(event: { target: { value: React.SetStateAction<string>; }; }) => setNome(event.target.value)}></DescriptionContent>
                    <DescriptionContent name='cpf' type='text' value={cpf} event={(event: { target: { value: React.SetStateAction<string>; }; }) => setCpf(event.target.value)}></DescriptionContent>
                    <DescriptionContent name='idade' type='number' value={idade} event={(event: { target: { value: React.SetStateAction<string>; }; }) => setIdade(event.target.value)}></DescriptionContent>
                    <DescriptionContent name='descrição' type='text' value={descricao} event={(event: { target: { value: React.SetStateAction<string>; }; }) => setDescricao(event.target.value)}></DescriptionContent>
                    {
                        atualizando ?
                        <button  onClick={atualizarContato} type="button">Atualizar</button> :
                        <button onClick={gravar} type="button">salvar</button>
                    }
                </form>
            </div>
            <div>
            <div id='lista'>
                <div id='buscar'>
                    <input onChange={pesquisar} type="text" placeholder='buscar' />
                </div>

                {/* aqui eu tenho dois arrays, um com as letras de busca e o array total, eis a logica para ver qual a ser apresentada */}
                {/* para relembrar acesse https://www.youtube.com/watch?v=RVRpVjdDB9I&ab_channel=PauloFelix */}
                { estaBuscando ?
               busca?.map(pessoa =>{      
                if(busca[0].cpf === undefined)  {
                    return (
                        <p></p>
                    )
                } 
                else{
                    return(
                        <Pessoa editar={()=>editarDados(pessoa)} funcao={() =>{deletar(pessoa.chave)}} idade={pessoa.idade} nome={pessoa.nome} cpf={pessoa.cpf} descricao={pessoa.descricao} />
                    )
                }         
            })
              
              
              :     pessoas?.map(pessoa =>{      
                if(pessoas[0].cpf === undefined)  {
                    return (
                        <p></p>
                    )
                } 
                else{
                    return(
                        <Pessoa editar={()=>editarDados(pessoa)} funcao={() =>{deletar(pessoa.chave)}} idade={pessoa.idade} nome={pessoa.nome} cpf={pessoa.cpf} descricao={pessoa.descricao} />
                    )
                }         
            })
                }
                </div>
            </div>
        </div>
    );
}; 