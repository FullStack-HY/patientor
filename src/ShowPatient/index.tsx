/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";

const ShowPatient = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

    let patient = patients[id];

    try {
        patient = toPatient({ ...patient });
    } catch (e) {
        if (!patient.ssn && !fetchStatus.current.hasFetched) {
            fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
        } else {
            console.error(e);
        }
    }

    useEffect(() => {
        const getPatient = async () => {
            fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
            try {
                const { data: fetchedPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(fetchedPatient));
                fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
            } catch (e) {
                console.error(e);
            }
        };

        if (fetchStatus.current.shouldFetch) {
            void getPatient();
        }
    }, [id, dispatch]);

    return (
        <div>
            <Container textAlign="center">
                <h3>Patient info</h3>
            </Container>
            <h4>{patient.name} </h4>
            <div><strong>SSN:</strong> {patient.ssn}</div>
            <div><strong>Date of Birth:</strong> {patient.dateOfBirth} </div>
            <div><strong>Occupation:</strong> {patient.occupation}</div>
        </div >
    );
};


export default ShowPatient;
