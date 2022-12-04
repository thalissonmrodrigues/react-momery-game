import * as C from './App.styles';
import logoImg from './assets/devmemory_logo.png';
const App = () => {
  return (
    <div>
      <C.Container>
        <C.InfoArea>
          <C.Logo>
            <img src={logoImg} alt="logo" width="200" />
          </C.Logo>

          <C.Info>
            ...
          </C.Info>

          <button>Reiniciar</button>
        </C.InfoArea>
        <C.GridArea>

        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;