import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, firestore } from '../../config/firebase';
import { Button, Col, Divider, Form, Input, Modal, Space, Tooltip, message } from 'antd';
import { useAuthContext, useSelectDataContext } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where } from 'firebase/firestore';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import courseImage from "../../assets/images/course.jpeg"
import teacherImage from "../../assets/images/teachers.jpeg"
import attendanceImage from "../../assets/images/attendence.jpeg"
import resultImage from "../../assets/images/results.jpeg"
import assignmentImage from "../../assets/images/assignment.jpeg"
import reportImage from "../../assets/images/report.png"
import noticeImage from "../../assets/images/notice.jpeg"


export default function Dashboard() {

    const { selectedData, setSelectedData } = useSelectDataContext();
    const [examResults, setExamResults] = useState([]); // State to store exam results data
    const [courses, setCourses] = useState([]);
    const [attendance, setAttendance] = useState([]); // State to store attendance data
    const [assignments, setAssignments] = useState([]);
    const [reports, setReports] = useState([]);
    const [notices, setNotices] = useState([]);

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
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2 text-center">Dashboard</h1>
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

                {/* <canvas className="my-4 w-100" id="myChart" width="610" height="257" style={{ display: 'block', boxSizing: 'border-box', height: '257px', width: '610px' }}></canvas> */}

                <h2>Section title</h2>
                <div class="row g-3 mb-5">
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("courses")}>
                            <div class="card h-100">
                                <img src={courseImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3>Courses</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("teachers")}>
                            <div class="card h-100">
                                <img src={teacherImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3>Teachers</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("attendence")}>
                            <div class="card h-100">
                                <img src={attendanceImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3>Attendence</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("results")}>
                            <div class="card h-100">
                                <img src={reportImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3 className='d-inline-block'>Results</h3><p className='d-inline-block'>(pending...)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("assignments")}>
                            <div class="card h-100">
                                <img src={assignmentImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3 className='d-inline-block'>Assignments</h3><p className='d-inline-block'>(pending...)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("reports")}>
                            <div class="card h-100">
                                <img src={reportImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3 className='d-inline-block'>Reports</h3><p className='d-inline-block'>(pending...)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("notice")}>
                            <div class="card h-100">
                                <img src={noticeImage} class="card-img-top" alt="course" />
                                <Divider className='mb-0' />
                                <div class="card-body text-center">
                                    <h3 className='d-inline-block'>Notice</h3><p className='d-inline-block'>(pending...)</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )
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
        console.log("jyyy")
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
            // const allCourse = doc(collection(db, "course"));
            const allCourse = doc(firestore, "course", course.id);
            // await setDoc(doc(firestore, "course", course.id), course);

            console.log("allCourse", allCourse)
            // later...
            await setDoc(allCourse, course);
            console.log("allCourse11")
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

            message.success("A new todo added successfully");
        } catch (e) {
            console.error("Error adding document: ");
        }
    };

    useEffect(() => {
        showCoursesData();
    }, [courses])

    const handleDelete = async (course) => {

        try {
            await deleteDoc(doc(firestore, "course", course.id));
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

    const openEditeCourse = async (course) => {
        console.log("course", course)
        const docRef = doc(firestore, "course", course.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const todo = docSnap.data();
            console.log("todo", todo);
            setCourseData(todo);
        } else {
            message.error("Course not found");
        }
    }
    useEffect(() => {
        console.log("editeCourseField111", courseData)
    }, [courseData])

    const editeCourse = async (e) => {
        e.preventDefault()
        console.log("courseData1122", courseData)

        let { name, code, description } = courseData

        if (!name) { return message.error("Please Enter Name") }

        const editedCourseData = {
            ...courseData,
            name, code, description,
        }

        try {
            await setDoc(doc(firestore, "course", editedCourseData.id), editedCourseData);

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

            message.success("Course updated successfully")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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
                                                <Button type="primary" className='me-1' icon={<EditOutlined />} data-bs-toggle="modal" id='editeDoc' data-bs-target="#editeModal" onClick={() => openEditeCourse(course)} />
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
                                        <Input placeholder='Input Course Name' name='name' id='editeName' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' id='editeCode' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' id='editeDesc' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={handleAddCourse}>Add</Button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edite for course */}
                <div class="modal fade" id="editeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edite Course</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Course Name' name='name' value={courseData.name} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Code">
                                        <Input placeholder='Input Course Code' name='code' value={courseData.code} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Description">
                                        <Input placeholder='Input Course Description' name='description' value={courseData.description} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={editeCourse}>Edite</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    // Teacher Tab
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
                setTeachers(teacherData);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        // Call the fetchCourses function when the component mounts
        fetchTeacher();
    }, []);
    const [teachers, setTeachers] = useState([]);
    const [teacherData, setTeacherData] = useState({
        name: '',
        phone: '',
        subject: '',
    });

    const handleTeacherChange = (event) => {
        const { name, value } = event.target;
        setTeacherData({
            ...teacherData,
            [name]: value,
        });
    };

    const handleAddTeacher = () => {
        console.log("jyyy")
        let { name, phone, subject } = teacherData

        const teacher = {
            name, phone, subject,
            id: Math.random().toString(36).slice(2)
        }
        createDocumentTeacher(teacher);
    };

    const createDocumentTeacher = async (teacher) => {
        console.log("teacher", teacher)
        try {
            // const allCourse = doc(collection(db, "course"));
            const allTeacher = doc(firestore, "teachers", teacher.id);
            // await setDoc(doc(firestore, "course", course.id), course);

            // later...
            await setDoc(allTeacher, teacher);
            console.log("allCourse11")
            const coursesCollection = collection(db, 'teachers'); // Replace 'courses' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(coursesCollection);

            // Extract course data from the query snapshot and store it in state
            const teacherData = [];
            querySnapshot.forEach((doc) => {
                const teacher = doc.data();
                teacherData.push({
                    id: doc.id, // Assuming your documents have unique IDs in Firestore
                    ...teacher,
                });
            });

            setTeachers(teacherData);
            message.success("A new Teacher added successfully");

        } catch (e) {
            console.error("Error adding document: ");
        }
    };

    useEffect(() => {
        showTeachersData();
    }, [teachers])

    const handleTeacherDelete = async (teacher) => {

        try {
            await deleteDoc(doc(firestore, "teachers", teacher.id));
            let documentsAfterDelete = teachers.filter(doc => doc.id !== teacher.id)
            // setAllDocuments(documentsAfterDelete)
            setTeachers(documentsAfterDelete);
            // setDocuments(documentsAfterDelete)
            message.success("Teacher deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting Teacher")
        }
    }

    const openEditeTeacher = async (teacher) => {
        // console.log("course", course)
        const docRef = doc(firestore, "teachers", teacher.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const todo = docSnap.data();
            console.log("todo", todo);
            setTeacherData(todo);
        } else {
            message.error("Teacher not found");
        }
    }
    useEffect(() => {
        console.log("editeCourseField111", courseData)
    }, [courseData])

    const editeTeacher = async (e) => {
        e.preventDefault()
        // console.log("courseData1122", courseData)

        let { name, phone, subject } = teacherData

        if (!name) { return message.error("Please Enter Name") }

        const editedTeachersData = {
            ...teacherData,
            name, phone, subject,
        }

        try {
            await setDoc(doc(firestore, "teachers", editedTeachersData.id), editedTeachersData);

            const teachersCollection = collection(db, 'teachers'); // Replace 'courses' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(teachersCollection);

            // Extract course data from the query snapshot and store it in state
            const teacherData = [];
            querySnapshot.forEach((doc) => {
                const teacher = doc.data();
                teacherData.push({
                    id: doc.id, // Assuming your documents have unique IDs in Firestore
                    ...teacher,
                });
            });

            setTeachers(teacherData);

            message.success("Teacher updated successfully")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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
                                    {teachers.map((teacher, index) => (
                                        <tr key={teacher.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.subject}</td>
                                            <td>{teacher.phone}</td>
                                            <td className='px-0'>
                                                <Button type="primary" className='me-1' icon={<EditOutlined />} data-bs-toggle="modal" id='editeDoc' data-bs-target="#editeModal1" onClick={() => openEditeTeacher(teacher)} />
                                                <Button danger icon={<DeleteOutlined />} onClick={() => { handleTeacherDelete(teacher) }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a Teacher */}
                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Teacher</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Teacher Name' name='name' onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Phone">
                                        <Input placeholder='Input Teacher Phone Number' name='phone' onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Subject">
                                        <Input placeholder='Input Teacher Subject' name='subject' onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={handleAddTeacher}>Add</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edite for course */}
                <div class="modal fade" id="editeModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edite Teacher</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Teacher Name' name='name' value={teacherData.name} onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Subject">
                                        <Input placeholder='Input Teacher Subject' name='subject' value={teacherData.subject} onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Phone">
                                        <Input placeholder='Input Teacher Phone' name='phone' value={teacherData.phone} onChange={handleTeacherChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={editeTeacher}>Edite</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    // Attendance Tab
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

    useEffect(() => {
        // Define an async function to fetch courses
        const fetchAttendance = async () => {
            try {
                const attendanceCollection = collection(db, 'attendance'); // Replace 'courses' with the actual name of your Firestore collection
                const querySnapshot = await getDocs(attendanceCollection);

                // Extract course data from the query snapshot and store it in state
                const attendanceData = [];
                querySnapshot.forEach((doc) => {
                    const attendance = doc.data();
                    attendanceData.push({
                        ...attendance,
                    });
                });
                console.log("tststats", attendanceData)
                setAttendances(attendanceData);
            } catch (error) {
                console.error('Error fetching attendances:', error);
            }
        };

        // Call the fetchCourses function when the component mounts
        fetchAttendance();
    }, []);
    const [attendances, setAttendances] = useState([]);
    const [attendanceData, setAttendanceData] = useState({
        name: '',
        date: '',
        status: '',
    });

    const handleAttendanceChange = (event) => {
        const { name, value } = event.target;
        setAttendanceData({
            ...attendanceData,
            [name]: value,
        });
    };

    const handleAddAttendance = () => {
        console.log("jyyy")
        let { name, date, status } = attendanceData

        const attendance = {
            name, date, status,
            id: Math.random().toString(36).slice(2)
        }
        createDocumentAttendance(attendance);
    };

    const createDocumentAttendance = async (attendance) => {
        console.log("attendance", attendance)
        try {
            // const allCourse = doc(collection(db, "course"));
            const allAttendance = doc(firestore, "attendance", attendance.id);
            // await setDoc(doc(firestore, "course", course.id), course);

            // later...
            await setDoc(allAttendance, attendance);
            console.log("allCourse11")
            const coursesCollection = collection(db, 'attendance'); // Replace 'courses' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(coursesCollection);

            // Extract course data from the query snapshot and store it in state
            const attendanceData = [];
            querySnapshot.forEach((doc) => {
                const attendance = doc.data();
                attendanceData.push({
                    id: doc.id, // Assuming your documents have unique IDs in Firestore
                    ...attendance,
                });
            });

            setAttendances(attendanceData);
            message.success("A new attendance added successfully");

        } catch (e) {
            console.error("Error adding document: ");
        }
    };

    useEffect(() => {
        showAttendenceData();
    }, [attendances])

    const handleAttendanceDelete = async (attendance) => {

        try {
            await deleteDoc(doc(firestore, "attendance", attendance.id));
            let documentsAfterDelete = attendances.filter(doc => doc.id !== attendance.id)
            // setAllDocuments(documentsAfterDelete)
            setAttendances(documentsAfterDelete);
            // setDocuments(documentsAfterDelete)
            message.success("attendance deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting attendance")
        }
    }

    const openEditeAttendance = async (attendance) => {
        // console.log("course", course)
        const docRef = doc(firestore, "attendance", attendance.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const todo = docSnap.data();
            console.log("todo", todo);
            setAttendanceData(todo);
        } else {
            message.error("attendance not found");
        }
    }
    useEffect(() => {
        console.log("editeCourseField111", attendanceData)
    }, [attendanceData])

    const editeAttendance = async (e) => {
        e.preventDefault()
        // console.log("courseData1122", courseData)

        let { name, date, status } = attendanceData

        if (!name) { return message.error("Please Enter Name") }

        const editedAttendancesData = {
            ...attendanceData,
            name, date, status,
        }

        try {
            await setDoc(doc(firestore, "attendance", editedAttendancesData.id), editedAttendancesData);

            const attendancesCollection = collection(db, 'attendance'); // Replace 'courses' with the actual name of your Firestore collection
            const querySnapshot = await getDocs(attendancesCollection);

            // Extract course data from the query snapshot and store it in state
            const attendanceData = [];
            querySnapshot.forEach((doc) => {
                const attendance = doc.data();
                attendanceData.push({
                    id: doc.id, // Assuming your documents have unique IDs in Firestore
                    ...attendance,
                });
            });

            setAttendances(attendanceData);

            message.success("attendance updated successfully")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const showAttendenceData = () => {
        return (
            <>
                <div className="card mx-auto mt-5">
                    <div className="card-body">
                        <h5 className="card-title text-center w-75 d-inline-block">Attendance Details</h5>
                        <Button className='w-25' data-bs-toggle="modal" data-bs-target="#exampleModal2">Add Attendance</Button>
                        <Divider />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((attendance, index) => (
                                        <tr key={attendance.id}>
                                            <td>{attendance.name}</td>
                                            <td>{attendance.date}</td>
                                            <td>{attendance.status}</td>
                                            <td className='px-0'>
                                                <Button type="primary" className='me-1' icon={<EditOutlined />} data-bs-toggle="modal" id='editeDoc' data-bs-target="#editeModal2" onClick={() => openEditeAttendance(attendance)} />
                                                <Button danger icon={<DeleteOutlined />} onClick={() => { handleAttendanceDelete(attendance) }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for adding a Attendance */}
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Attendance</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Attendance Name' name='name' onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="date">
                                        <Input placeholder='Input Attendance Date' name='date' onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="status">
                                        <Input placeholder='Input Attendance Status' name='status' onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={handleAddAttendance}>Add</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edite for Attendance */}
                <div class="modal fade" id="editeModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edite Attendance</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Name">
                                        <Input placeholder='Input Attendance Name' name='name' value={attendanceData.name} onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Date">
                                        <Input placeholder='Input Attendance Date' name='date' value={attendanceData.date} onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} lg={24}>
                                    <Form.Item label="Status">
                                        <Input placeholder='Input Attendance Status' name='status' value={attendanceData.status} onChange={handleAttendanceChange} />
                                    </Form.Item>
                                </Col>
                            </div>
                            <div class="modal-footer">
                                <Button className='w-25' data-bs-dismiss="modal">Close</Button>
                                <Button className='w-25' data-bs-dismiss="modal" onClick={editeAttendance}>Edite</Button>

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
                                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                        <span>Education Details</span>
                                        <i className="bi bi-card-heading"></i>
                                    </h6>
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
                                        <Link className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedData("profile")}>
                                            <i className="bi bi-person-bounding-box"></i>
                                            Profile
                                        </Link>
                                    </li>
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
                        {selectedData === 'attendence' && showAttendenceData()}
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
