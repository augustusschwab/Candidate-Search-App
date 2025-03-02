import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser} from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';
 

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    Name: '',
    Username: '',
    Location: '',
    Avatar: '',
    Email: '',
    html_url: '',
    Company: '',
  })

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async() => {
        const users: any = await searchGithub();//Search Github for a list of users.
        const userNames: string[] = users.map((user:any) => user.login) //Extracts the username from each object in the response array from Github.
        
        //Creates an array of settled promises with data containing user information in the value key.
        const userData: any = await Promise.allSettled(userNames.map(async (user: string) => searchGithubUser(user)));
        //Map each object in the userData into an array of type Candidate.
        const candidates: Candidate[] = userData
          .filter((user: any) => user.status === "fulfilled" && user.value.login !== undefined)//Ensure only fulfilled promises and valid usernames are added to the array.
          .map((user:any) => {
            const Candidate: Candidate = {
              Name: user.value.name,
              Username: user.value.login,
              Location: user.value.location,
              Avatar: user.value.avatar_url,
              Email: user.value.email,
              html_url: user.value.html_url,
              Company: user.value.company,
              }
          return Candidate;
        });
        
        //Sets the candidates variable to the found candidates.
        setCandidates(candidates);

        //Sets the current candidate displayed as the first candidate in the candidates array.
        if(candidates.length > 0){
          setCurrentCandidate(candidates[0]);
        };
    };

    //Calls the function to get candidates from GitHub.
    fetchCandidates();
  }, [])

  //Function to save a candidate to local storage.
  const addToSavedCandidates = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (typeof storedSavedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(currentCandidate);
    localStorage.setItem(
      'savedCandidates',
      JSON.stringify(parsedSavedCandidates)
    );

    //Removes the candidate from the array of candidates that will be displayed and sets the current candidate to a new candidate.
    //Since the candidate at the first point in the array is the one that is displayed first this one is removed then the one that takes it's place will be displayed.
    if(candidates.length > 0){
      candidates.splice(0,1);
      setCurrentCandidate(candidates[0]);
    };
  }

  //Function to reject a candidate and remove it from the candidates array.
  const rejectCandidate = () => {
    candidates.splice(0,1);
    setCurrentCandidate(candidates[0]);
    console.log(candidates.length);
    console.log(candidates[0]);
  }

  return (
    <>
      <h1>CandidateSearch</h1>
      <CandidateCard 
        candidate={currentCandidate}
      />
      <div className='buttons'>
        <button onClick={addToSavedCandidates}>Add</button>
        <button onClick={rejectCandidate}>Subtract</button>
      </div>
    </>
  ); 
};

export default CandidateSearch;
