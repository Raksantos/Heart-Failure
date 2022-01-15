import { Form } from '@unform/web';
import Input from './components/Form/input';
import styled from 'styled-components';

const Styles = styled.div`
background: #67BFB3;
padding: 20px;

h1 {
  border-bottom: 1px solid white;
  color: #3d3d3d;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 10px;
  text-align: center;
}

form {
  background: white;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 50px;
  border-radius: 10px;
}

input {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}

label {
  color: #3d3d3d;
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.error {
  color: red;
  font-family: sans-serif;
  font-size: 12px;
  height: 30px;
}

.submitButton {
  background-color: #67BFB3;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  margin: 20px 30%;
  height: 40px;
  border-radius: 5px;
  border: none;
  outlied: none;
  &:hover {
    background-color: #105b72c2;
    cursor: pointer;
  }
}
`;

function App() {

  function handleSubmit(data){
    console.log(data)
  }

  return (
    <>
      <Styles>
        <Form onSubmit={handleSubmit}>
          <h1>Heart Failure</h1>

          <label>Idade</label>
          <Input name='Idade'/>
          <label>Sexo</label>
          <Input name='Sexo'/>
          <label>Tipo de dor no peito</label>
          <Input name='Tipo de dor no peito'/>
          <label>Pressão sanguínea em repouso (mm Hg)</label>
          <Input name='Pressão sanguínea em repouso'/>
          <label>Colesterol (mm/dl)</label>
          <Input name='Colesterol'/>
          <label>Açúcar no sangue em jejum</label>
          <Input name='Açúcar no sangue em jejum'/>
          <label>Resultados de eletrocardiograma em repouso</label>
          <Input name='Resultados de eletrocardiograma em repouso'/>
          <label>Frequência cardíaca máxima alcançada</label>
          <Input name='Frequência cardíaca máxima alcançada'/>
          <label>Angina induzida por exercício</label>
          <Input name='Angina induzida por exercício'/>
          <label>Oldpeak</label>
          <Input name='Oldpeak'/>
          <label>Inclinação do segmento ST de pico do exercício</label>
          <Input name='Inclinação do segmento ST de pico do exercício'/>
          <button type="submit" className="submitButton">Enviar</button>
        </Form>
        <br/><br/>
        <footer>
            <span class="text-white text-bold ml-2">Desenvolvedores:</span>
            <span class="text-white text-bold ml-2">Rodrigo</span>
            <a class="badge" href="https://github.com/Raksantos" target="_blank" rel="noopener noreferrer"><i class="text-white fab fa-github"></i></a>
            <a class="badge" href="https://www.linkedin.com/in/rodrigo-santos-da-silva-175538175/" target="_blank" rel="noopener noreferrer"><i class="text-white fab fa-linkedin"></i></a>
            <span class="text-white text-bold ml-2">Gabriel</span>
            <a class="badge" href="https://github.com/souzag" target="_blank" rel="noopener noreferrer"><i class="text-white fab fa-github"></i></a>
            <a class="badge" href="" target="_blank" rel="noopener noreferrer"><i class="text-white fab fa-linkedin"></i></a>
        </footer>
      </Styles>
    </>
  );
}

export default App;
