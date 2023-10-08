import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, firestore } from '../../config/firebase';
import { Button, Col, Divider, Form, Input, Modal, Space, Tooltip, message } from 'antd';
import { useAuthContext, useSelectDataContext } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where } from 'firebase/firestore';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

export default function Dashboard() {

    const { selectedData, setSelectedData } = useSelectDataContext();
    const [examResults, setExamResults] = useState([]); // State to store exam results data
    const [courses, setCourses] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [attendance, setAttendance] = useState([]); // State to store attendance data
    const [assignments, setAssignments] = useState([]);
    const [reports, setReports] = useState([]);
    const [notices, setNotices] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        console.log("open")
        setShowModal(true);
    };

    const handleCloseModal = () => {
        console.log("close")
        setShowModal(false);
    };

    const openDashboard = () => {
        var element = document.getElementById("sidebarMenu");
        element.classList.add("show");
    }

    const closeDashboard = () => {
        var element = document.getElementById("sidebarMenu");
        element.classList.remove("show");
    }

    const navigate = useNavigate();
    const { user, isAuth, dispatch } = useAuthContext()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                message.success("Signout successful")
                dispatch({ type: "SET_LOGGED_OUT" })
                navigate(`/auth/login/`)
            })
            .catch(err => {
                message.error("Signout not successful")
            })
    }

    const showData = (select) => {
        // Dashboard data
        return (
            <>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    {/* <div className="btn-toolbar mb-2 mb-md-0"> */}
                    {/* <div className="btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                                </div> */}
                    {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                                    <svg className="bi"><use xlink: href="#calendar3"></use></svg>
                                    This week
                                </button> */}
                    {/* </div> */}
                </div>

                <canvas className="my-4 w-100" id="myChart" width="610" height="257" style={{ display: 'block', boxSizing: 'border-box', height: '257px', width: '610px' }}></canvas>

                <h2>Section title</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                                <th scope="col">Header</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,001</td>
                                <td>random</td>
                                <td>data</td>
                                <td>placeholder</td>
                                <td>text</td>
                            </tr>
                            <tr>
                                <td>1,002</td>
                                <td>placeholder</td>
                                <td>irrelevant</td>
                                <td>visual</td>
                                <td>layout</td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>data</td>
                                <td>rich</td>
                                <td>dashboard</td>
                                <td>tabular</td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>information</td>
                                <td>placeholder</td>
                                <td>illustrative</td>
                                <td>data</td>
                            </tr>
                            <tr>
                                <td>1,004</td>
                                <td>text</td>
                                <td>random</td>
                                <td>layout</td>
                                <td>dashboard</td>
                            </tr>
                            <tr>
                                <td>1,005</td>
                                <td>dashboard</td>
                                <td>irrelevant</td>
                                <td>text</td>
                                <td>placeholder</td>
                            </tr>
                            <tr>
                                <td>1,006</td>
                                <td>dashboard</td>
                                <td>illustrative</td>
                                <td>rich</td>
                                <td>data</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>placeholder</td>
                                <td>tabular</td>
                                <td>information</td>
                                <td>irrelevant</td>
                            </tr>
                            <tr>
                                <td>1,008</td>
                                <td>random</td>
                                <td>data</td>
                                <td>placeholder</td>
                                <td>text</td>
                            </tr>
                            <tr>
                                <td>1,009</td>
                                <td>placeholder</td>
                                <td>irrelevant</td>
                                <td>visual</td>
                                <td>layout</td>
                            </tr>
                            <tr>
                                <td>1,010</td>
                                <td>data</td>
                                <td>rich</td>
                                <td>dashboard</td>
                                <td>tabular</td>
                            </tr>
                            <tr>
                                <td>1,011</td>
                                <td>information</td>
                                <td>placeholder</td>
                                <td>illustrative</td>
                                <td>data</td>
                            </tr>
                            <tr>
                                <td>1,012</td>
                                <td>text</td>
                                <td>placeholder</td>
                                <td>layout</td>
                                <td>dashboard</td>
                            </tr>
                            <tr>
                                <td>1,013</td>
                                <td>dashboard</td>
                                <td>irrelevant</td>
                                <td>text</td>
                                <td>visual</td>
                            </tr>
                            <tr>
                                <td>1,014</td>
                                <td>dashboard</td>
                                <td>illustrative</td>
                                <td>rich</td>
                                <td>data</td>
                            </tr>
                            <tr>
                                <td>1,015</td>
                                <td>random</td>
                                <td>tabular</td>
                                <td>information</td>
                                <td>text</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>)
    }

    const ShowProfileData = () => {
        console.log("ShowProfileData")
        // Access user data from your authentication context
        const { user } = useAuthContext();


        return (
            <>
                <div className="card mx-auto mt-5" style={{ width: '20rem' }} >
                    <div className="card-body">
                        <h5 className="card-title">Admin Details</h5>
                        <p>Name: {user.fullName}</p>
                        <p>Email: {user.email}</p>
                        <p>Date of Birth: {user.dob}</p>
                        <p>Role: {user.role}</p>
                        <p>Status: {user.status}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div >
            </>
        );
    }

    useEffect(() => {
        // Define an async function to fetch courses
        const fetchCourses = async () => {
            try {
                const coursesCollection = collection(db, 'course'); // Replace 'courses' with the actual name of your Firestore collection
                const querySnapshot = await getDocs(coursesCollection);

                // Extract course data from the query snapshot and store it in state
                const courseData = [];
                querySnapshot.forEach((doc) => {
                    const course = doc.data();
                    courseData.push({
                        id: doc.id, // Assuming your documents have unique IDs in Firestore
                        ...course,
                    });
                });

                setCourses(courseData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        // Call the fetchCourses function when the component mounts
        fetchCourses();
    }, []);

    useEffect(() => {
        // Define an async function to fetch courses
        const fetchTeacher = async () => {
            try {
                const TeacherCollection = collection(db, 'teachers'); // Replace 'courses' with the actual name of your Firestore collection
                const querySnapshot = await getDocs(TeacherCollection);

                // Extract course data from the query snapshot and store it in state
                const teacherData = [];
                querySnapshot.forEach((doc) => {
                    const teacher = doc.data();
                    teacherData.push({
                        ...teacher,
                    });
                });
                console.log("tststats", teacherData)
                setTeacher(teacherData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        // Call the fetchCourses function when the component mounts
        fetchTeacher();
    }, []);

    const [courseData, setCourseData] = useState({
        name: '',
        code: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleAddCourse = () => {

        let { name, code, description } = courseData

        const course = {
            name, code, description,
            id: Math.random().toString(36).slice(2)
        }
        createDocument(course);
    };

    const createDocument = async (course) => {
        console.log("course", course)
        try {
            const allCourse = doc(collection(db, "course"));

            console.log("allCourse", allCourse)
            // later...
            await setDoc(allCourse, course);
            console.log("allCourse11")
            // Close the modal
            setShowModal(false);
            showCoursesData();

            // setDoc(doc(firestore, "course"), course);
            message.success("A new todo added successfully");
        } catch (e) {
            console.error("Error adding document: ");
        }
    };

    const handleEdite = () => {

    }

    const handleDelete = async (course) => {

        try {
            await deleteDoc(doc(firestore, "course", course.id));
            console.log("setCourses", courses)
            let documentsAfterDelete = courses.filter(doc => doc.id !== course.id)
            // setAllDocuments(documentsAfterDelete)
            setCourses(documentsAfterDelete);
            // setDocuments(documentsAfterDelete)
            message.success("course deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting course")
        }
    }

    const [selectedCourse, setSelectedCourse] = useState([]);
    const editeCourse = async (courseID) => {
        console.log(courseID)
        // Assuming that 'courseID' is the document ID of the course to be updated
        console.log(courseID)
        const courseRef = doc(db, "courses", { courseID });

        try {
            // Update the course document with the new data
            await updateDoc(courseRef, courses);

            console.log("Course updated successfully");
        } catch (error) {
            console.error("Error updating course:", error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    };


    const showCoursesData = () => {
        console.log("showCoursesData")

        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Courses Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Course</Button>

                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Course Id</th>
                                        <th scope="col overflow-hidden">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={course.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{course.name}</td>
                                            <td>{course.code}</td>
                                            <td>{course.id}</td>
                                            <td>{course.description}</td>
                                            <td className='px-0'>
                                                <Button type="primary" className='me-1' icon={<EditOutlined />} data-bs-toggle="modal" id='editeDoc' data-bs-target="#editeModal" onClick={() => editeCourse(course.id)} />
                                                <Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(course) }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edite for course */}
                <div class="modal fade" id="editeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' value={selectedCourse.name} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' value={selectedCourse.code} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' value={selectedCourse.description} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    const showTeachersData = () => {
        console.log("showTeachersData")

        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Teachers Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal1">Add Teachers</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Phone No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacher.map((teacher, index) => (
                                        <tr key={teacher.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.subject}</td>
                                            <td>{teacher.number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    const fetchAttendanceData = async () => {
        try {
            // Replace 'attendance' with the actual name of your Firestore collection for attendance
            const attendanceCollection = collection(db, 'attendance');

            // Assuming you have a field in your attendance documents that stores the student's ID
            const querySnapshot = await getDocs(attendanceCollection);

            const attendanceData = [];
            querySnapshot.forEach((doc) => {
                const attendanceRecord = doc.data();
                attendanceData.push({
                    id: doc.id,
                    ...attendanceRecord,
                });
            });

            setAttendance(attendanceData);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        if (selectedData === 'attendence') {
            fetchAttendanceData();
        }
    }, [selectedData]);

    const showattendenceData = () => {
        return (
            <>
                <div className="card mx-auto mt-5 w-50">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Attendance Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal2">Add Attendance</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((record, index) => (
                                        <tr key={record.id}>
                                            <td>{record.date}</td>
                                            <td>{record.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const fetchExamResultsData = async () => {
        try {
            // Replace 'examResults' with the actual name of your Firestore collection for exam results
            const examResultsCollection = collection(db, 'examResults');

            // Assuming you have a field in your exam results documents that stores the student's ID
            const querySnapshot = await getDocs(examResultsCollection);

            const examResultsData = [];
            querySnapshot.forEach((doc) => {
                const examResultRecord = doc.data();
                examResultsData.push({
                    id: doc.id,
                    ...examResultRecord,
                });
            });

            setExamResults(examResultsData);
        } catch (error) {
            console.error('Error fetching exam results data:', error);
        }
    };

    useEffect(() => {
        if (selectedData === 'results') {
            fetchExamResultsData();
        }
    }, [selectedData]);

    const showResultsData = () => {
        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Exam Result</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal3">Add Result</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Exam Name</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examResults.map((result, index) => (
                                        <tr key={result.id}>
                                            <td>{result.examName}</td>
                                            <td>{result.subject}</td>
                                            <td>{result.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    const showAssignmentsData = () => {
        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Assignment Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal4">Add Assignment</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Assignment Name</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignments.map((assignment, index) => (
                                        <tr key={assignment.id}>
                                            <td>{assignment.assignmentName}</td>
                                            <td>{assignment.subject}</td>
                                            <td>{assignment.dueDate}</td>
                                            <td>{assignment.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const fetchReportData = async () => {
        try {
            // Replace 'reports' with the actual name of your Firestore collection for reports
            const reportsCollection = collection(db, 'reports');

            // Assuming you have a field in your report documents that stores the student's ID
            const querySnapshot = await getDocs(reportsCollection);

            const reportData = [];
            querySnapshot.forEach((doc) => {
                const reportRecord = doc.data();
                reportData.push({
                    id: doc.id,
                    ...reportRecord,
                });
            });

            setReports(reportData);
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    const showReportsData = () => {
        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Report Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal5">Add Report</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Report Name</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((report, index) => (
                                        <tr key={report.id}>
                                            <td>{report.reportName}</td>
                                            <td>{report.subject}</td>
                                            <td>{report.date}</td>
                                            <td>{report.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    useEffect(() => {
        if (selectedData === 'reports') {
            fetchReportData();
        }
    }, [selectedData]);


    const fetchNoticeData = async () => {
        try {
            // Replace 'notices' with the actual name of your Firestore collection for notices
            const noticesCollection = collection(db, 'notices');

            const querySnapshot = await getDocs(noticesCollection);

            const noticeData = [];
            querySnapshot.forEach((doc) => {
                const noticeRecord = doc.data();
                noticeData.push({
                    id: doc.id,
                    ...noticeRecord,
                });
            });

            setNotices(noticeData);
        } catch (error) {
            console.error('Error fetching notice data:', error);
        }
    };

    useEffect(() => {
        if (selectedData === 'notice') {
            fetchNoticeData();
        }
    }, [selectedData]);

    const showNoticesData = () => {
        return (
            <>
                <div className="card mx-auto mt-5 w-100">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Notice Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal6">Add Notice</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Notice Title</th>
                                        <th scope="col">Posted By</th>
                                        <th scope="col">Date Posted</th>
                                        <th scope="col">Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.map((notice, index) => (
                                        <tr key={notice.id}>
                                            <td>{notice.title}</td>
                                            <td>{notice.postedBy}</td>
                                            <td>{notice.datePosted}</td>
                                            <td>{notice.content}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a course */}
                <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    // const showSettingsData = () => {
    //     console.log("showNoticesData")
    // }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <header className="navbar position-absolute sticky-top bg-dark flex-md-nowrap shadow w-100 px-5" style={{ height: '50px', padding: '0px 1%' }} data-bs-theme="dark">
                        <Link className="navbar-brand col-md-3 col-lg-2 text-white" to='/' onClick={() => setSelectedData("dashboard")}>Students Management System</Link>

                        <ul className="navbar-nav flex-row d-md-none">
                            <li className="nav-item text-nowrap">
                                <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" onClick={openDashboard}>
                                    <i className="bi bi-view-list"></i>
                                </button>
                            </li>
                        </ul>
                    </header >

                    <div className="sidebar border border-right float-start col-md-3 col-lg-2 p-0 pt-5" style={{ minHeight: '100%' }}>
                        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel" onClick={() => setSelectedData("dashboard")}>Students Management System</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close" onClick={closeDashboard}></button>
                            </div>

                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" onClick={() => setSelectedData("dashboard")}>
                                            <i className="bi bi-house-fill"></i>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("profile")}>
                                            <i className="bi bi-person-bounding-box"></i>
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("courses")}>
                                            <i className="bi bi-book-half"></i>
                                            Courses
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("teachers")}>
                                            <i className="bi bi-person-workspace"></i>
                                            Teachers
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("attendence")} >
                                            <i className="bi bi-list-check"></i>
                                            Attendence
                                        </Link>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Past Details</span>
                                    <i className="bi bi-card-heading"></i>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("results")}>
                                            <i className="bi bi-file-check"></i>
                                            Results
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("assignments")}>
                                            <i className="bi bi-file-earmark-bar-graph"></i>
                                            Assignments
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("reports")}>
                                            <i className="bi bi-file-earmark-break"></i>
                                            Reports
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("notice")}>
                                            <i className="bi bi-chat-left-text"></i>
                                            Notice
                                        </Link>
                                    </li>
                                </ul>

                                <hr className="my-3" />

                                <ul className="nav flex-column mb-auto">
                                    {/* <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("settings")}>
                                            <i className="bi bi-sliders"></i>
                                            Settings
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={handleLogout}>
                                            <i className="bi bi-door-open-fill"></i>
                                            Sign out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-5">
                        {selectedData === 'profile' && ShowProfileData()}
                        {selectedData === 'courses' && showCoursesData()}
                        {selectedData === 'teachers' && showTeachersData()}
                        {selectedData === 'attendence' && showattendenceData()}
                        {selectedData === 'results' && showResultsData()}
                        {selectedData === 'assignments' && showAssignmentsData()}
                        {selectedData === 'reports' && showReportsData()}
                        {selectedData === 'notice' && showNoticesData()}
                        {/* {selectedData === 'settings' && showSettingsData()} */}
                        {selectedData === 'dashboard' && showData()}
                    </main>

                </div>
            </div>
        </>
    )
}
