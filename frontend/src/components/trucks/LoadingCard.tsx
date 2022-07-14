import {Card, Placeholder} from 'react-bootstrap'


export function LoadingCard() {
  /*
  * This is a loading card. It's actually a different type of card than the one we display in the end.
  * That is because I started with this card and switched the final display to a slightly better ui
  * library than bootstrap, but this card has a nicer loading state.
  *
  * Long term I would add a similar loading state to the other card for consistency or just use a loading spinner.
  * */
  return (
    <div className="d-flex justify-content-around">
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top"/>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6}/>
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
            <Placeholder xs={6}/> <Placeholder xs={8}/>
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6}/>
        </Card.Body>
      </Card>
    </div>
  );
}
