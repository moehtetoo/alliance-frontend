import { Alert, Button, Card, CardBody, Input, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../api/authApi";
import { Formik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
    const [message, setMessage] = useState(undefined);
    const navigate = useNavigate();
    const onSignUp = (values, setSubmitting) => {
        signUp(values)
        .then((res) => {
            console.log(res)
            toast.success('Sign Up Success')
            navigate('/login')
        })
        .catch((err) => {
            const errorMessage = err.response.data?.message;
            if(errorMessage) {
                setMessage(errorMessage)
            }
        })
        .finally(() => setSubmitting(false))
    }

    return (
        <section className="h-screen">
        <div className="h-full px-6 py-24">
            <div className="flex justify-center">
                <div className="w-1/3">{message && 
                    <Alert 
                        color="red" 
                        variant="outlined" 
                        
                        className="mb-3"
                    >
                        {message}
                    </Alert>}
                </div>
            </div>
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <Card className="mt-6 w-96">
                <CardBody>
                    <Formik
                        initialValues={{fullName: "", username: "", password: ""}}
                        validationSchema={object({
                            fullName: string().required('Required'),
                            username: string().max(50, "Email is too long").email("Invalid emaill address").required("Required"),
                            password: string()
                                .required("Required")
                                .min(8, "Password is too short - should be 8 chars minimum.")
                                .matches(
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                "Include at least one Uppercase, Lowercase, Number and a special character"
                                )
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            onSignUp(values, setSubmitting);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <>
                                <div className="mb-6 text-center">
                                    <Typography variant="h1">Sign Up</Typography>
                                </div>
                                <div className="mb-6">
                                    <Input 
                                        label="Full Name" 
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.fullName && touched.fullName}
                                    />
                                    {errors.fullName && <Typography variant="small" color="red">{errors.fullName}</Typography>}
                                </div>
                                <div className="mb-6">
                                    <Input 
                                        label="Email" 
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.username && touched.username}
                                    />
                                    {errors.username && <Typography variant="small" color="red">{errors.username}</Typography>}
                                </div>
                                <div className="mb-6">
                                    <Input 
                                        label="Password"  
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.password && touched.password}
                                    />
                                    {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <Button 
                                        className="w-full" 
                                        variant="outlined"
                                        onClick={() => navigate('/login')}
                                        loading={isSubmitting}
                                    >
                                        Back
                                    </Button>
                                    <div className="w-40"></div>
                                    <Button 
                                        className="w-full" 
                                        onClick={handleSubmit}
                                        loading={isSubmitting}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </>
                        )}
                    </Formik>
                </CardBody>
            </Card>
            </div>
        </div>
        </section>
    )
}

export default SignUp
