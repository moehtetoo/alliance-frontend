import { TEInput, TERipple } from "tw-elements-react";
const Login = () => {
  return (
    <section className="h-screen">
      <div className="h-full px-6 py-24 bg-blue-100">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
        <div
        className="block rounded-lg bg-white w-2/5 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="text-4xl text-center mb-6 text-blue-600">
                Login
            </div>
            <form>
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
              ></TEInput>

              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
              ></TEInput>
              <TERipple rippleColor="light" className="w-full">
                <button
                  type="button"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Sign in
                </button>
              </TERipple>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
