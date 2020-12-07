import React from 'react'
import './App.css';
import Greet from './components/Greet'
import AboutMe from './components/AboutMe'
import Curriculum from './components/Curriculum'
import Projects from './components/Projects'
import { Link, Route, Switch, Redirect } from 'react-router-dom' //=> las llaves hacen referencia a que solo queremos importar esa dependencia de la libreria. en este caso solo "Link" del "react-router-dom"
 
class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      showGreet: true,
      dataFromAPI: [],
      dataYesNo: [],
      admin: false
    }

    // this.someMethod = ()=>{console.log('someMethod')}

    // console.log('CONSTRUCTOR')
  }


  //=> componentDidMount: metodo que se activa solo una vez tras el primer renderizado (y nunca mas)
  componentDidMount(){
    console.log('componentDidMount')
    
    // fetch('https://api.magicthegathering.io/v1/sets')
    //   .then(result => {
    //     return result.json() //=> para pasar info de APIs a formato JSON y poder leerlo y trabajar con el; tanto la llamada a la AIP como tambien este proceso de pasar a JSON son asincronos, por tanto hay que poner ".then" para ambos
    //   }) 
    //   .then(data => {
    //     //console.log(data)
    //     this.setState({dataFromAPI: data})//=> aqui metemos toda la info recogida de la API y pasada a JSON al state, para tener control absoluto y poder modificarla. Segun los "end-points" de los que disponga la API convendrá hacer según qué llamadas a la API que nos interesen en cada caso, para almacenar en el state según que JSON y no tener que procesar mas info de la necesaria 
    //   })
    //   //=> para este caso de doble ".then" no se puede hacer un "promise all" porque son dependientes una de otra, la segunda depende de que se ejecute la primera, y el "promise all" va bien para asegurar que se ejecuta algo tras el cumplimiento de varias ejecuciones pero independientes entre ellas
  
    // fetch('https://yesno.wtf/api')
    //   .then(result => {
    //     return result.json()
    //   })
    //   .then(data2 => {
    //     //console.log(data2)
    //     this.setState({dataYesNo: data2})
    //   })
      // en este "componentDidMount" hemos hecho 2 llamadas distintas a 2 APIs, de manera que cada una se almacene en un valor del state. En el render, se puede ajustar el renderizado condicional para que muestre pantalla/spinner de carga mientras ambas están cargandose y no haga display del "complete loaded" u tra cosa hasta que ambas terminen (o cada una por separado si solo afecta la carga de una de ellas)
  }

  //=> componentDidUpdate: metodo que se activa cada vez que se detecta un cambio en la pagina, es decir, cuando se sobreescribe el state. IMPORTANTE: aunque el nuevo state tenga el mismo contenido que el anterior son objetos distintos en memoria, por tanto se va a detectar siempre como que se está sobreescribiendo y se activa el "componentDidUpdate" (habitualmente viene provocado por el "setState()" y siempre se activa tras el "render")
  // IMPORTANTE: NO se activa tras el primer renderizado, eso solo activa el "componentDidMount"
  componentDidUpdate(prevProps, prevState){ //=> el "componentDidUpdate" puede recibir estos 2 argumentos (los nombres pueden ser cualesquiera pero el orden sí importa), que hacen referencia respectivamente a los 'props' y el 'state' previos a que se actualizara; el acceso a estos elementos es una herramienta que puede ser util en determinados casos
    console.log('componentDidUpdate')
  }

  render() {
    console.log('RENDER')
    return (
      <div className="App">
        {/*<h1>{this.state.counter}</h1>
        <button onClick={()=>this.setState({counter: this.state.counter + 1})}>add 1 to "counter"</button>*/}
        {/* => se pone "this.state.counter + 1" y no "this.state.counter++" porque en el segundo caso se actua directamente sobre esa referencia, el state en este caso, y el state es inmutable; dará error.
          De la primera forma lo que hacemos es coger la referencia del "this.state.counter" y sumar uno, pero no al estado directamente*/}
        {/* <button onClick={()=>this.setState({showGreet: !this.state.showGreet})}>show/hide 'Greet'</button>
        {this.state.showGreet && <Greet counter={this.state.counter}/>}  */}
        {/* ATENCION: a veces la consola no se actualiza a pesar de los cambios que React sí va renderizando y actualizando en la pagina; por eso pueden quedar en consola avisos, mensajes o info sin actualizar. Para ello basta con recargar la pagina del browser */}
        {/*this.state.dataFromAPI ? 'API loaded' : 'loading'*/} {/* => mientras la API carga será falso y aparecerá el mensaje "loading"; y cuando cargue, "dataFromAPI" se rellenará, y ese cambio de estado hará re-renderizar la pagina y entnoces este valor será verdadero, mostrando "API loaded", o un bloque de JSX, o components, etc... */} 
      
        <Link to="/aboutMe">About me</Link> 
        <br />
        <Link to="/curriculum">Curriculum</Link>
        <br />
        <Link to="/projects">Projects</Link>
        
        <Switch>
          {/* POSIBLES FORMAS DE ESCRIBIR "ROUTES" */}
          {/* esta forma, con "render" se utiliza cuando, ademas de renderizar una vista, queremos hacer algo mas; como modificar el state por ejemplo o renderizar con condicionales */}
          <Route path="/curriculum" render={ ()=> ( //=> si ponemos toda la parte de la funcion que sigue sin "{}", JS lo considera en una sola linea y no es necesario el "return"; pero si ponemos "{}" entonces se tiene que poner un return, porque "render" es una funcion y como tal lo necesita para devolver algo. en este caso, con parentesis es como si no tuviera nada, no afecta al return y no lo necesita
            !this.state.admin
              ? <Redirect to="/somePath" /> 
              : <Curriculum />
          )}/>

          {/* => esta forma útil para cuando queremos renderizar el componente, y tambien para pasar params como props */}
          <Route path="/projects/:id/:name" component={Projects}/> {/* poniendo params en el url React pasa esa info dentro de los props que manda por defecto al componente */}

          {/* => estas dos formas parece que funciona tambien; pero son mas inutiles que las demas */}
          <Route path="/aboutMe">
            <AboutMe />
          </Route>
          {/* => como antes pero con condicionales */}
          {/* <Route path="/curriculum">
            {this.state.admin ? <Curriculum /> : <Redirect to="/aboutMe" /> } ==> si aqui en lugar de poner <Redirect to="/aboutMe" renderizamos directamente <AboutMe /> vamos a ver renderizado ese componente en la ruta "/curriculum"; por tanto es necesario el redirect para no alterar las rutas y sus renderizados asociados
          </Route> */}

          
        </Switch>

      </div>
    );
  }
}

//<Router> => conecta la interfaz del usuario con la URL
//<Link> => equivalente al "a" (anchor tag) de HTML. Sirve para crear enlaces hacia rutas
//<Route> => renderizar una interfaz dependiendo de la url pasada
//<switch> => switch returns only the first matching route. envoltorio para las rutas (Routes) para que devuelva solo la primera ruta coincidente con el URL
//<Redirect> => redirecciona a un enlace 

// TIPOS DE "ROUTES":
// 1) envolver el componente en el <Route></Route>: util para hacer un redirect con condicional, pero no parece la mejor forma de hacerlo
// 2) utilizando la propiedad "component": para pasar params con la url mediante props
// 3) utilizando la propiedad "render": util para ejecutar mas funcionalidades ademas de renderizar el component; por ejemplo para actualizar tambien el estado o renderizar algun condicional
      //example: <Route path="/something" render={()=>{ <Something />; this.setState({name: "someone"}) }}/>


export default App;
