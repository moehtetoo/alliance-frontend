import { Alert, Button, Card, CardBody, Input, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/authApi";
import { Formik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useToggle } from "react-use";

const Login = () => {
    const [unauthorized, setUnauthorized] = useToggle(false);
    const navigate = useNavigate();
    const onLogin = (values, setSubmitting) => {
        login(values)
        .then((res) => {
            localStorage.setItem('token', res.token);
            navigate('/')
            toast.success('Login Success')
        })
        .catch(() => {
            setUnauthorized();
        })
        .finally(() => setSubmitting(false))
    }

    return (
        <section className="h-screen">
        <div className="h-full px-6 py-24">
            <div className="flex justify-center">
            <div className="w-1/3">{unauthorized && 
            <Alert 
                color="red" 
                variant="outlined" 
                
                className="mb-3"
            >
                Invalid username or password
            </Alert>}</div>
            </div>
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <Card className="mt-6 w-96">
                <CardBody>
                    <Formik
                        initialValues={{username: "", password: ""}}
                        validationSchema={object({
                            username: string().max(50, "Email is too long").email("Invalid emaill address").required("Required"),
                            password: string()
                                .required("Required")
                                // .min(8, "Password is too short - should be 8 chars minimum.")
                                // .matches(
                                // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                // "Include at least one Uppercase, Lowercase, Number and a special character"
                                // )
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            onLogin(values, setSubmitting);
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
                                    <Typography variant="h1">Login</Typography>
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
                                <Button 
                                    className="w-full" 
                                    onClick={handleSubmit}
                                    loading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Formik>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                        OR
                        </p>
                    </div>
                    <Button 
                        className="w-full"
                        variant="outlined"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </Button>
                </CardBody>
            </Card>
            </div>
        </div>
        </section>
    )
}

export default Login
