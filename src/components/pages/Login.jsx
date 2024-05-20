import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const onLogin = () => {
        navigate('/')
    }

    return (
        <section className="h-screen">
        <div className="h-full px-6 py-24">
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <Card className="mt-6 w-96">
                <CardBody>
                    <div className="mb-6 text-center">
                        <Typography variant="h1">Login</Typography>
                    </div>
                    <div className="mb-6">
                        <Input label="Email"  />
                    </div>
                    <div className="mb-6">
                        <Input label="Password"  />
                    </div>
                    <Button className="w-full" onClick={onLogin}>Button</Button>
                </CardBody>
            </Card>
            </div>
        </div>
        </section>
    )
}

export default Login
