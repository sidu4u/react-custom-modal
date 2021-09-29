// multiple modals stack on top of each other
// open or close modal from inside modal
// open close modal progrmatically(on event/on condition).
import ReactDOM from 'react-dom';
import {useRef,useEffect,useCallback,useState} from 'react';

const modalRoot = document.getElementById('modal');

export function Modal(props){
const el = useRef(document.createElement('div'));
let [isVisible,changeIsVisible] = useState(false);
useEffect(()=>{
    if(isVisible && el.current.hasChildNodes()){
        modalRoot.appendChild(el.current);
    }
    else if(!isVisible && el.current.hasChildNodes()){
        modalRoot.removeChild(el.current);
    }
    return ()=>{
        if(isVisible && el.current.hasChildNodes()){
            modalRoot.removeChild(el.current);
        }
    };
},[isVisible]);

const openModal = useCallback(()=>changeIsVisible(true),[]);

const closeModal = useCallback(()=>changeIsVisible(false),[]);

const render = ()=>props.render(closeModal,openModal);

return ReactDOM.createPortal(<ModalBody render={render}/>,el.current);



}

function Header({heading}){

    return (<h3>{heading}</h3>);
}

function ModalBody(props){


    return (
        <div>
            {props.heading && <Header heading={props.heading}/>}
            {props.render()}
            {props.onOk && <button onClick={props.onOk}>Ok</button>}
            {props.onCancel && <button onClick={props.onCancel}>Cancel</button>}
        </div>
    );
}