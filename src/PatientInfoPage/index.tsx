import React from "react";
import { Container, /* Table,  Button*/ } from "semantic-ui-react";

/*

Create a page for showing a patient's full information in the frontend.

TODO: Fetch the data from the endpoint created in the previous exercise. 
TODO: After fetching the patient information from the backend, add the fetched information to the application's state. Do not fetch the information if it already is in the app state, i.e. if the user is visiting the same patient's information many times.

TODO: Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.

TODO: The Application uses Semantic UI React for styling, which is quite similar to React Bootstrap and MaterialUI that we covered in part 7. You may also use it for the new components but that is up to you since our main focus now is TypeScript.

TODO: The gender is shown with react-semantic-ui component Icon.

TODO: Note that in order to access the id in the url, you need to give useParams a proper type argument:
const { id } = useParams<{ id: string }>();
*/

const PatientInfoPage = () => {
  
  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient information</h3>
      </Container>
      <div>
        <p>[Name] [Gender Icon]</p> {/* TODO */}
        <p>Occupation: </p> {/* TODO */}
        <p>ssn: </p> {/* TODO */}
      </div>
    </div>
  );
};

export default PatientInfoPage;