import React from "react";
import axios from "axios";
import { Container, Icon, List } from "semantic-ui-react";
import {
  useParams
} from 'react-router-dom';

import { /* Entry,  */Entry, Patient, /* Diagnosis */ } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addSensitivePatient } from "../state";

type DiagnosisCodeProps ={
  diagnoseCodes?: string[];
};

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
          dispatch(addSensitivePatient(sensitivePatient));
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

    const DiagnosesList = ({ diagnoseCodes }: DiagnosisCodeProps) => {
      if (diagnoseCodes) {
        console.log(diagnoseCodes);
        return (<List bulleted>
          {diagnoseCodes.map((code: string) => (
            <List.Item key={code}>{code}</List.Item>
          ))}
        </List>);
      } else {
        return (<List bulleted>
          <List.Item>No related diagnoses found</List.Item>
        </List>);
      }
    };

    const PatientEntries = () => {
      if(patient.entries && patient.entries.length > 0){
        return (
          <div>
            {patient.entries.map((entry: Entry) => (
              <div key={entry.id}>
                <p>{entry.date} <i>{entry.description}</i></p>
                <DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
              </div>
            ))}
          </div>
        );
      } else {
        return(<p>No patient entries available</p>);
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
          <h3>Entries</h3>
          <PatientEntries />
        </div>
      </div>
    );
  } else {
    return(<div>Patient not found</div>);
  }
};

export default PatientInfoPage;