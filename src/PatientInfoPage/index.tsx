import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import {
  useParams
} from 'react-router-dom';

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientInfoPage = () => {

  const [{ sensitivePatients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {

    const fetchSensitivePatient = async () => {
      if (!Object.keys(sensitivePatients).includes(id) ){
        try {
          const { data: sensitivePatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "ADD_SENSITIVE_PATIENT", payload: sensitivePatient });
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchSensitivePatient();
  }, [dispatch]);

  const patient: Patient | undefined = Object.entries(sensitivePatients).find(p => p[0] === id)?.[1];
  
  if(patient) {

    const GenderIcon = () => {
      switch(patient.gender) {
        case "male":
          return <Icon name="mars" />;
        case "female":
          return <Icon name="venus" />;
        default:
          return <Icon name="genderless" />;
      }

    };

    return (
      <div className="App">
        <Container textAlign="center">
          <h3>Patient information</h3>
        </Container>
        <div>
          <h2>{patient.name} <GenderIcon/></h2>
          <p>ssn: {patient.ssn}</p>
          <p>Occupation: {patient.occupation}</p>
        </div>
      </div>
    );
  } else {
    return(<div>Patient not found</div>);
  }
};

export default PatientInfoPage;