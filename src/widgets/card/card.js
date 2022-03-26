import '../../css/app.css';
import '../../css/card.css';
function Card() {
  return (
    <div className="card">
      <div className="card-header">
        Test Card
      </div>
      <div className="card-body">
        This is the body of the card
      </div>
      <div className="card-footer">
          <a> Card action</a>
      </div>
    </div>
  );
}

export default Card;
