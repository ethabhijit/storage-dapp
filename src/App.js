import { useState, useContext } from "react";
import { Container, Button, Card, Form, Spinner } from "react-bootstrap";
import { StorageContext } from "./context/StorageContext";

import "./App.css";

const App = () => {
  const [formData, setFormData] = useState(0);
  const { connectWallet, currentAccount, dataValue, setData, loading } =
    useContext(StorageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(formData);
    setFormData("");
  };

  return (
    <Container className="mt-4">
      <Card style={{ width: "18rem" }}>
        {currentAccount ? (
          <Card.Body>
            <Card.Title>Data value is {dataValue}</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
                <Form.Control
                  type="number"
                  placeholder="Enter new value"
                  onChange={(e) => setFormData(e.target.value)}
                  value={formData}
                  disabled={loading}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading || !formData}
              >
                {!loading ? (
                  <>Set value</>
                ) : (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      className="mx-1"
                    />
                    Loading...
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
        ) : (
          <Card.Body>
            <Button variant="primary" onClick={connectWallet}>
              Connect Metamask
            </Button>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default App;
