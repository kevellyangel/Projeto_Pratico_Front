import React, { useState, useEffect, useRef } from "react";
import './TodoList.css';

function TodoList() {
    const listaStorage = localStorage.getItem('Lista');
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) return;
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        inputRef.current.focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    ref={inputRef}
                    type="text"
                    value={novoItem}
                    onChange={(e) => setNovoItem(e.target.value)}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                {lista.length > 0 ? (
                    lista.map((item, index) => (
                        <div
                            key={index}
                            className={item.isCompleted ? "item completo" : "item"}
                            onClick={() => clicou(index)} // Marca como completo ao clicar no item inteiro
                            role="button"
                            aria-pressed={item.isCompleted}
                        >
                            <span>{item.text}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Impede o clique no botão de acionar a conclusão da tarefa
                                    deleta(index);
                                }}
                                className="del"
                                aria-label={`Deletar tarefa ${item.text}`}
                            >
                                Deletar
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>Nenhuma tarefa adicionada</p>
                )}
                {lista.length > 0 && (
                    <button
                        onClick={deletaTudo}
                        className="deleteAll"
                        aria-label="Deletar todas as tarefas"
                    >
                        Deletar Todas
                    </button>
                )}
            </div>
        </div>
    );
}

export default TodoList;