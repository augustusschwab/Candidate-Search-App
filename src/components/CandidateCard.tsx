import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';

type CandidateCardProps = {
    candidate: Candidate
}

const CandidateCard: React.FC<CandidateCardProps> = ({candidate}) => {
    return(
        <section className='candidateCard'>
            <img src={`${candidate.Avatar}`} alt={`${candidate.Username}`} />
            <article>
                {candidate.Name === null ? <h2>Name:</h2> : <h2>{candidate.Name}</h2>}
                <div className="details">
                    <p>
                    <strong>Username:</strong> <a href={`${candidate.html_url}`}>{candidate.Username || " "}</a>
                    </p>
                    <p>
                    <strong>Location:</strong> {candidate.Location}
                    </p>
                    <p>
                    <strong>Email:</strong> {candidate.Email}
                    </p>
                    <p>
                    <strong>Company:</strong> {candidate.Company}
                    </p>
                </div>
            </article>
        </section>
    )
}

export default CandidateCard;