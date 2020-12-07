
import React from 'react'

const Projects = (props) => { //=> se pone props en el argumento del componente funcional como habitualmente; y accedemos con "props.match.params"; para aclarar cualquier duda hacer "console.log()" en cada paso
    console.log(props.match.params)
    return(
        <div className="Projects">
            <h2>soy {props.match.params.name} </h2>
        </div>
    )
}


export default Projects