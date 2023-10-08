import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { useAuthContext } from '../../contexts/AuthContext'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { Link } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography

export default function Login() {
  const { readUserProfile, dispatch  } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = e => {
    e.preventDefault()

    let { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const createUserProfile = async (user) => {
    let { fullName, dob, file, password, course } = state
    const { email, uid } = user

    const userData = {
      fullName, email, uid, dob, file, password,
      dateCreated: serverTimestamp(),
      status: "active",
      roles: "admin"
    }

    try {
      await setDoc(doc(firestore, "users", uid), userData);
      message.success("A new user has been created successfully")
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } })
    } catch (e) {
      message.error("Something went wrong while creating user profile")
      console.error("Error adding document: ", e);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("user of handle google: ", user);
      await createUserProfile(user);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        message.info("Google sign-in popup was closed by the user.");
      } else {
        message.error("Something went wrong while signing in with Google");
        console.error(err);
      }
    }
  }  

  return (
    <main className='auth backImage'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 trans">
              <Title level={2} className='m-0 text-center'>Login</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input placeholder='Input your email' name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                  <Link to="/auth/forgot-password" className='text-dark'>Forgot Password</Link>
                </Form.Item>
                {/* <Button className='w-100 mt-2' onClick={() => { navigate(`/forgot-password`) }}>Forgot Password</Button> */}

                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleLogin}>Login</Button>
                <p className='mb-0 mt-3 text-center'>New User: <Link to="/auth/register" className='text-danger fw-bold'>Register</Link> </p>
              </Form>

              <Button
                type="default"
                onClick={handleGoogleSignIn}
                style={{ height: "50px", fontWeight: "bold", borderWidth: "5px" }}
                className="w-100 fs-5"
              >
                SIGN IN WITH GOOGLE
              </Button>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
