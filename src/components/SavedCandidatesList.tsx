import Candidate from "../interfaces/Candidate.interface";

interface savedCandidatesProps {
    savedCandidates: Candidate [];

}


const SavedCandidatesList = ({ savedCandidates }: savedCandidatesProps) => {
    return (
        <tbody>
            {savedCandidates.map((candidate) => (
                <tr>
                    <td><img src={`${candidate.Avatar}`} alt={`${candidate.Username}`} className="avatar"/></td>
                    <td>{candidate.Name}</td>
                    <td>{candidate.Location}</td>
                    <td>{candidate.Email}</td>
                    <td>{candidate.Company}</td>
                    <td><button>Reject</button></td>
                </tr>
            ))}
        </tbody> 
    );
};

export default SavedCandidatesList;
