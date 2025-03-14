//An interface for a Candidate object that will contain the data displayed on the card.
export default interface Candidate {
    readonly Name: string | null;
    readonly Username: string | null;
    readonly Location: string | null;
    readonly Avatar: string | null;
    readonly Email: string | null;
    readonly html_url: string;
    readonly Company: string | null;
}