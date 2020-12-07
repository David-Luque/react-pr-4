
import React, {Component} from 'react'
//otra forma de importar "Component" de React y extenderlo al "class" component que creamos
class Greet extends Component {
    //=> para pasar props a un componente de clase se tiene que llamar al "constructor"; en este caso hemos pasado el valor de la propiedad "counter" del state de App al state del componente hijo "Greet"
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         counterGreet: props.counter
    //     }
    // }

    // metodo que se activa cuando el componente en el que se está llamando deja de aparecer en la pagina es decir cuando se desmonta
    componentWillUnmount() {
        console.log('component Greet unmounted')
    }
    
    //ACTUALIZACION: para pasar "props" a un componente de clase parece que ya no hace falta el "constructor"; basta con llamar un "this.props"
    render() {
        return(
            <div className="Greet">
                <h2>Soy Greet{this.props.counter}</h2>
            </div>
        )
    }
}

export default Greet