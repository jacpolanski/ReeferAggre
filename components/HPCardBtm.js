import React from "react";
import { Button, Card, CardGroup } from "react-bootstrap";

export const HPCardBtm = () => {
  return (
    <CardGroup>
      <Card className="my-1 px-5 py-2">
        <Card.Body>
          <Card.Title className="mb-2 text-center">
            <h3 className="welcome-reeferaggre">Welcome in ReeferAggre,</h3>
          </Card.Title>
          <Card.Text>
            light-weight and quick daily Reefer readings aggregator with auto
            malfunction detection, that also allows you to manually enter
            readings and custom Unit alarms.
          </Card.Text>
          <hr className="my-3" />
          <Card.Text>
            For easy access by clicking below button you will find added company
            Reefer Units manual and procedures
          </Card.Text>
          <Button variant="primary">Open CRM</Button>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};
