import React from "react";
import { Container, Row, Col} from "react-bootstrap"
function Footer(){
    return(
        
        <footer className="bg-dark text-light py-3" expand="lg" collapseOnSelect>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; ProShop</Col>
                </Row>
            </Container>
        </footer>
        
    )
}

export default Footer