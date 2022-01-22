import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_SENSITIVE_PATIENT";
      payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    //TODO Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.

    case "ADD_SENSITIVE_PATIENT":
      return {
        ...state,
        sensitivePatients: {
          ...state.sensitivePatients,
          [action.payload.id]: action.payload
        }
      };
    
    default:
      return state;
  }
};
