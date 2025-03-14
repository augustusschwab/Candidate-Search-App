import { useEffect, useState } from 'react';
import SavedCandidatesList from "../components/SavedCandidatesList";
import Candidate from '../interfaces/Candidate.interface';
import { Link } from 'react-router-dom';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  
  useEffect(() => {
    const parsedSavedCandidates = JSON.parse(localStorage.getItem('savedCandidates') as string);
    setSavedCandidates(parsedSavedCandidates);
  }, [])

  const rejectCandidate = (htmlUrl: string) => {
    //Resets the saved candidates to an updated array of candidates with all of the candidates that did not have the passed in url to the function.
    //Returns the updated candidates to setSavedCandidates.
    setSavedCandidates((prevCandidates) => {
      const updatedCandidates = prevCandidates.filter(candidate => candidate.html_url !== htmlUrl);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
  };
  
  return (
    (savedCandidates.length === 0 ? (
      <>
        <h1>NO CANDIDATES ACCEPTED</h1>
        <h2><Link to='/'>Search for New Candidates</Link></h2>
      </>
    ) : (
      <>
        <h1>Potential Candidates</h1>
        <table>
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">GitHub</th>
              <th scope="col">Location</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <SavedCandidatesList 
            savedCandidates={savedCandidates}
            rejectCandidate={rejectCandidate}
          />
        </table>
      </>
    ))
    
  );
};

export default SavedCandidates;
