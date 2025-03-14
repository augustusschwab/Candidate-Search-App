import Candidate from "../interfaces/Candidate.interface";
import minusIcon from '../assets/minus.png'

interface savedCandidatesProps {
    savedCandidates: Candidate [];
    rejectCandidate: (html_url: string) => void;
}


const SavedCandidatesList = ({ savedCandidates, rejectCandidate }: savedCandidatesProps) => {
    return (
        <tbody>
            {savedCandidates.map((candidate) => (
                <tr key={candidate.html_url}>
                    <td><img src={`${candidate.Avatar}`} alt={`${candidate.Username}`} className="avatar"/></td>
                    <td>{candidate.Name}</td>
                    <td><a href={candidate.html_url}>{candidate.html_url}</a></td>
                    <td>{candidate.Location}</td>
                    <td>{candidate.Email}</td>
                    <td>{candidate.Company}</td>
                    <td><button onClick={() => rejectCandidate(candidate.html_url)} className='minus decision-button'><img src={minusIcon}/></button></td>
                </tr>
            ))}
        </tbody> 
    );
};

export default SavedCandidatesList;
