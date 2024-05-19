import React from 'react'
import imagineNotFound from '../../assets/images/notfound.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './NotFound.module.scss';
import { Home } from '../../assets/icons/iconsMUI';
const NotFound = () => {
    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <img src={imagineNotFound} alt='Pagina nu a fost gasita' className={styles.imagineNotFound} />
                </Col>
                <Col className='mt-5'>
                    <Row><p className={styles.ntf}>#404</p></Row>
                    <Row className='mt-5'><p className={styles.ntf2}>Aha! Vezi? Și tu poți greși!</p></Row>
                    <Row><p className={styles.ntf3}>( sau am greșit noi )...</p></Row>
                    <Row><p className={styles.ntf2}>... indiferent care e situația, probabil ar trebui</p></Row>
                    <Row><p className={styles.ntf2}><a href='/'>să mergi la pagina principală <Home/></a></p></Row>
                </Col>
            </Row>
        </Container>
    )
}
export default NotFound;