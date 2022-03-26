import '../../css/card.css';
function Card() {
  return (
    <div className="card">
      <div class="card-header">
        Test Card
      </div>
      <div class="card-body">
        This is the body of the card
      </div>
      <div class="card-footer">
          <a> Card action</a>
      </div>
    </div>
  );
}

export default Card;
