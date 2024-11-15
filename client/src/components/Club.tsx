interface ClubProps {
    presentation: string;
    histoire: string;
}

const Club: React.FC<ClubProps> = ({ presentation, histoire }) => {
    return (
        <div className="club">
            <h2>{presentation}</h2>
            <p>{histoire}</p>
        </div>
    );
};

export default Club;
