import { Form } from '@unform/web';
import Input from './components/Form/input';
import styled from 'styled-components';
import * as Yup from 'yup';
import Dropdown from './components/Form/dropdown';
import React, {useRef, useState} from 'react';
import API from './services/api';
import SuccesAlert from './components/Alerts/SucessAlert';
import FailAlert from './components/Alerts/FailAlert';

const initialData = {
  sexo: 'Masculino',
  tipo_dor_peito: 'ATA',
  resultados_de_eletrocardiograma_em_repouso: 'LVH',
  angina_induzida_por_exercicio: 'Não' ,
  inclinacao_do_segmento_ST_de_pico_do_exercicio: 'Down'
}

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

.toast-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  border-radius: 10px;
}

select {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
}

input {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 5px;
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

span {
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

function App(){
  const formRef = useRef(null);

  const [result, setResult] = useState(null);
  const [status, setStaus] = useState(null);

  async function handleSubmit(data){
    try{
      const schema = Yup.object().shape({
        idade: Yup.number().integer('Idade inválida').positive('Idade inválida').typeError('É necessário um número')
        .lessThan(110, 'Idade muito alta').typeError('É necessário um número'),
        pressao_sanguinea_em_repouso: Yup.number().min(0, 'Valor inválido').lessThan(200, 'Valor inválido').typeError('É necessário um número'),
        colesterol: Yup.number().min(0, 'Valor inválido').typeError('É necessário um número').lessThan(300, 'Valor inválido'),
        frequencia_cardiaca_maxima_alcançada: Yup.number().integer('Deve ser um número inteiro').lessThan(220, 'Valor inválido')
        .min(0, 'Valor inválido').typeError('É necessário um número'),
        oldpeak: Yup.number().typeError('É necessário um número').max(220, 'Valor inválido').min(0, 'Valor inválido'),
      });
      
      await schema.validate(data, {
        abortEarly: false,
      });

      let final_data = {
        "Idade (anos)" : null, 
        "Pressão sanguínea em repouso (mm Hg)" : null,
        "Colesterol (mm/dl)" : null, 
        "Açúcar no sangue em jejum" : null,
        "Frequência cardíaca máxima alcançada" : null, 
        "Oldpeak" : null, 
        "Sexo_F" : null, 
        "Sexo_M" : null,
        "Tipo de dor no peito_ASY" : null, 
        "Tipo de dor no peito_ATA" : null,
        "Tipo de dor no peito_NAP" : null, 
        "Tipo de dor no peito_TA" : null,
        "Resultados de eletrocardiograma em repouso_LVH" : null,
        "Resultados de eletrocardiograma em repouso_Normal" : null,
        "Resultados de eletrocardiograma em repouso_ST" : null,
        "Angina induzida por exercício_N" : null, 
        "Angina induzida por exercício_Y" : null,
        "Inclinação do segmento ST de pico do exercício_Down" : null,
        "Inclinação do segmento ST de pico do exercício_Flat" : null,
        "Inclinação do segmento ST de pico do exercício_Up": null
    }

      final_data['Idade (anos)'] = parseInt(data['idade'])
      final_data['Pressão sanguínea em repouso (mm Hg)'] = parseInt(data['pressao_sanguinea_em_repouso'])
      final_data['Colesterol (mm/dl)'] = parseInt(data['colesterol'])
      final_data['Frequência cardíaca máxima alcançada'] = parseInt(data['frequencia_cardiaca_maxima_alcançada'])
      final_data['Oldpeak'] = parseInt(data['oldpeak'])

      if(data['sexo'] === 'M'){
        final_data['Sexo_F'] = 0
        final_data['Sexo_M'] = 1
      }else{
        final_data['Sexo_F'] = 1
        final_data['Sexo_M'] = 0
      }

      if(data['angina_induzida_por_exercicio'] === 'N'){
        final_data['Angina induzida por exercício_N'] = 1
        final_data['Angina induzida por exercício_Y'] = 0
      }else{
        final_data['Angina induzida por exercício_N'] = 0
        final_data['Angina induzida por exercício_Y'] = 1
      }

      if(data['inclinacao_do_segmento_ST_de_pico_do_exercicio'] === "Down"){
        final_data['Inclinação do segmento ST de pico do exercício_Down'] = 1
        final_data['Inclinação do segmento ST de pico do exercício_Flat'] = 0
        final_data['Inclinação do segmento ST de pico do exercício_Up'] = 0
      }else if(data['inclinacao_do_segmento_ST_de_pico_do_exercicio'] === "Flat"){
        final_data['Inclinação do segmento ST de pico do exercício_Down'] = 0
        final_data['Inclinação do segmento ST de pico do exercício_Flat'] = 1
        final_data['Inclinação do segmento ST de pico do exercício_Up'] = 0
      }else{
        final_data['Inclinação do segmento ST de pico do exercício_Down'] = 0
        final_data['Inclinação do segmento ST de pico do exercício_Flat'] = 0
        final_data['Inclinação do segmento ST de pico do exercício_Up'] = 1
      }

      if(data['tipo_dor_peito'] === 'ASY'){
        final_data['Tipo de dor no peito_ASY'] = 1
        final_data['Tipo de dor no peito_ATA'] = 0
        final_data['Tipo de dor no peito_NAP'] = 0
        final_data['Tipo de dor no peito_TA'] = 0
      }
      else if(data['tipo_dor_peito'] === 'ATA'){
        final_data['Tipo de dor no peito_ASY'] = 0
        final_data['Tipo de dor no peito_ATA'] = 1
        final_data['Tipo de dor no peito_NAP'] = 0
        final_data['Tipo de dor no peito_TA'] = 0
      }
      else if(data['tipo_dor_peito'] === 'NAP'){
        final_data['Tipo de dor no peito_ASY'] = 0
        final_data['Tipo de dor no peito_ATA'] = 0
        final_data['Tipo de dor no peito_NAP'] = 1
        final_data['Tipo de dor no peito_TA'] = 0
      }
      else{
        final_data['Tipo de dor no peito_ASY'] = 0
        final_data['Tipo de dor no peito_ATA'] = 0
        final_data['Tipo de dor no peito_NAP'] = 0
        final_data['Tipo de dor no peito_TA'] = 1
      }
      
      if(data['resultados_de_eletrocardiograma_em_repouso'] === 'LVH'){
        final_data['Resultados de eletrocardiograma em repouso_LVH'] = 1
        final_data['Resultados de eletrocardiograma em repouso_Normal'] = 0
        final_data['Resultados de eletrocardiograma em repouso_ST'] = 0
      }
      else if(data['resultados_de_eletrocardiograma_em_repouso'] === 'Normal'){
        final_data['Resultados de eletrocardiograma em repouso_LVH'] = 0
        final_data['Resultados de eletrocardiograma em repouso_Normal'] = 1
        final_data['Resultados de eletrocardiograma em repouso_ST'] = 0
      }else{
        final_data['Resultados de eletrocardiograma em repouso_LVH'] = 0
        final_data['Resultados de eletrocardiograma em repouso_Normal'] = 0
        final_data['Resultados de eletrocardiograma em repouso_ST'] = 1
      }

      if(data['acucar_no_sangue_em_jejum'] === 'S'){
        final_data['Açúcar no sangue em jejum'] = 1
      }else{
        final_data['Açúcar no sangue em jejum'] = 0
      }

      formRef.current.setErrors([]);

      API.post('/predict', final_data)
      .then(res => {
        setResult(res.data['Result']);
        setStaus(res.status);
      }).catch(erro => {
        console.log(erro);
        setStaus(404);
        setResult(null);
      });

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <Styles>
        <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
          <h1>Heart Failure</h1>
          <label>Idade</label>
          <Input name='idade'/>
          <label>Sexo</label>
          <Dropdown name='sexo' items={[{name: 'Masculino', value: 'M'}, 
                                                        {name: 'Feminino', value: 'F'}]}/>
          <label>Tipo de dor no peito</label>
          <Dropdown name='tipo_dor_peito' items={[{name: 'Atypical Angina', value: 'ATA'}, 
                                            {name: 'Non-Anginal Pain', value: 'NAP'}, 
                                            {name: 'Asymptomatic', value: 'ASY'},
                                            {name: 'Typical Angina', value: 'TA'}]}/>
          <label>Pressão sanguínea em repouso (mm Hg)</label>
          <Input name='pressao_sanguinea_em_repouso'/>
          <label>Colesterol (mm/dl)</label>
          <Input name='colesterol'/>
          <label>Açúcar no sangue em jejum</label>
          <Dropdown name='acucar_no_sangue_em_jejum' items={[{name: 'Sim', value: 'S'}, 
                                            {name: 'Não', value: 'N'}]}/>
          <label>Resultados de eletrocardiograma em repouso</label>
          <Dropdown name='resultados_de_eletrocardiograma_em_repouso' items={[{name: 'LVH', value: 'LVH'}, 
                                            {name: 'Normal', value: 'Normal'}, 
                                            {name: 'ST', value: 'ST'}]}/>
          <label>Frequência cardíaca máxima alcançada</label>
          <Input name='frequencia_cardiaca_maxima_alcançada'/>
          <label>Angina induzida por exercício</label>
          <Dropdown name='angina_induzida_por_exercicio' items={[{name: 'Não', value: 'N'}, 
                                            {name: 'Sim', value: 'S'}]}/>
          <label>Oldpeak</label>
          <Input name='oldpeak'/>
          <label>Inclinação do segmento ST de pico do exercício</label>
          <Dropdown name='inclinacao_do_segmento_ST_de_pico_do_exercicio' items={[{name: 'Down', value: 'Down'}, 
                                            {name: 'Flat', value: 'Flat'}, 
                                            {name: 'Up', value: 'Up'}]}/>
          <button type="submit" className="submitButton">Enviar</button>
        </Form>
        <br/>
        <div className="toast-container">
          {result === 0 && (<SuccesAlert title="Tudo certo!" 
          description="Nosso código não classificou suas características como próprias de um problema no coração"
          recomendation="Se os sintomas persistirem, procure um cardiologista na unidade mais próxima!"/>)}
          
          {result === 1 && (<FailAlert title="Encontramos algo." 
          description="Nosso código classificou suas características como próprias de um problema no coração"
          recomendation="Procure um cardiologista na unidade mais próxima!"/>)}
          
          {(status !== null && status !== 200) && <FailAlert title="Erro interno!" 
            description="Provavelmente nosso servidor está fora do ar!"
            recomendation="Voltaremos em breve."/>}
        </div>
          <br/>
        <footer>
            <span className="text-white text-bold ml-2">Desenvolvedores:</span>
            <span className="text-white text-bold ml-2">Rodrigo</span>
            <a className="badge" href="https://github.com/Raksantos" target="_blank" rel="noopener noreferrer"><i className="text-white fab fa-github"></i></a>
            <a className="badge" href="https://www.linkedin.com/in/rodrigo-santos-da-silva-175538175/" target="_blank" rel="noopener noreferrer"><i className="text-white fab fa-linkedin"></i></a>
            <span className="text-white text-bold ml-2">Gabriel</span>
            <a className="badge" href="https://github.com/souzag" target="_blank" rel="noopener noreferrer"><i className="text-white fab fa-github"></i></a>
            <a className="badge" href="https://www.linkedin.com/in/gabriel-souza-352a64228/" target="_blank" rel="noopener noreferrer"><i className="text-white fab fa-linkedin"></i></a>
        </footer>
      </Styles>
    </>
  );
}

export default App;
