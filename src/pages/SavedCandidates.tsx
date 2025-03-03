import { useEffect, useState } from 'react';
import SavedCandidatesList from "../components/SavedCandidatesList";
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  
  useEffect(() => {
    const parsedSavedCandidates = JSON.parse(localStorage.getItem('savedCandidates') as string);
    setSavedCandidates(parsedSavedCandidates);
  }, [])
  
  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col">Reject</th>
          </tr>
        </thead>
        <SavedCandidatesList 
          savedCandidates={savedCandidates}
        />
      </table>

    </>
  );
};

export default SavedCandidates;
