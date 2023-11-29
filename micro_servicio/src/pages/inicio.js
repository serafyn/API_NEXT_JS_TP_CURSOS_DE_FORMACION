import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


export default function Inicio({ loggedIn }) {
    const [isLoggedIn, setLoggedIn] = useState(loggedIn);
    const [data, setData] = useState([]);
    const [newStudent, setNewStudent] = useState({
        course_id: '',
        student_name: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/getCourse');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm('¿Estás seguro que deseas borrar este curso?');
            if (confirmDelete) {
                await axios.delete(`/api/deleteStudent?id=${id}`);
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleAddStudent = async () => {
        try {
            await axios.post('/api/createStudent', newStudent);
            fetchData();
            setNewStudent({
                course_id: '',
                student_name: '',
            });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleEdit = async (id, newName, newCourseId) => {
        try {
            await axios.put(`/api/updateStudent?id=${id}`, { student_name: newName, course_id: newCourseId });
            fetchData();
        } catch (error) {
            console.error('Error editing student:', error);
        }
    };

    return (
        <Layout>

            <Container className="d-flex justify-content-center align-items-center vh-50">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID del Curso</th>
                            <th>Nombre del Curso</th>
                            <th>Nombre del Estudiante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.course_id}>
                                <td>{item.course_id}</td>
                                <td>{item.course_name}</td>
                                <td>{item.user_name}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(item.user_id)}>
                                        Borrar
                                    </Button>
                                    <Button
                                        variant="info"
                                        className="mx-2"
                                        onClick={() => handleEdit(item.user_id, 'NuevoNombre', 'NuevoCourseID')}>
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Container className='my-5'>
                <Form>
                    <Form.Group controlId="formCourseId">
                        <Form.Label>Course ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Course ID"
                            value={newStudent.course_id}
                            onChange={(e) => setNewStudent({ ...newStudent, course_id: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStudentName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Student Name"
                            value={newStudent.student_name}
                            onChange={(e) => setNewStudent({ ...newStudent, student_name: e.target.value })}
                        />
                    </Form.Group>
                    <Row>
                        <Button variant="success" onClick={handleAddStudent}>
                            Add Student
                        </Button>
                    </Row>
                </Form>
            </Container>

        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { COOKIE_TOKEN } = parseCookies(context);
    let loggedIn = false;

    if (COOKIE_TOKEN === 'COOKIE_TOKEN') {
        loggedIn = true;
    }

    return {
        props: {
            loggedIn,
        },
    };
}
