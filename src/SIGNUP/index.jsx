import { ArrowLeftIcon, CircleHelp } from "lucide-react";
import React, { useEffect, useState } from "react";


const SignUp = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        surname: '',
        day: '',
        month: '',
        year: '',
        gender: 'Female',
        email: '',
        password: ''

    })
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const days = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31
    ]
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May',
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'
    ];
    
    const genders = isMobile ? ['Female', 'Male',] : ['Female', 'Male', 'Other'];



    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleSteps = (e) => {
        e.preventDefault();
        if (step < totalSteps) setStep(step + 1);  
    }

    const handlepPrevStep = () => {
        if (step >  1) setStep(step - 1)
    }
    
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) setIsMobile(true);
        }
        checkMobile();
        
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile);

    }, [])


    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    }


    return (
        <div className="w-full min-h-screen bg-gray-200 flex md:rounded-md flex-col gap-5 md:justify-center items-center">
            <div className="brand-name text-2xl text-green-500 font-medium md:text-3xl md:font-bold">
                <h1>Metastra</h1>
            </div>
            <div className="sign-up-container w-full h-full md:w-auto md:h-[90vh] md:bg-white">
                <div className="sign-up-content flex flex-col items-center md:border-b md:border-gray-400">
                    <h2 className="text-2xl font-medium md:text-3xl ">Create a new account</h2>
                    <p className="text-sm md:text-base">It's fast and free</p>
                </div>
                <form className="mt-6 space-y-7 md:space-y-4">
                    <div className="grid w-full grid-cols-2 gap-3 px-2 ">
                        {(step === 1 || !isMobile) && (
                            <>
                                <input
                                    className="w-full h-12 md:w-48 md:h-9 outline-none px-2 border rounded-md border-gray-400"
                                    type="text"
                                    name="firstname"
                                    onChange={handleFormData}
                                    value={formData.firstname}
                                    placeholder="First name"
                                />
                                 <input
                                    className="outline-none h-12 md:h-9 border rounded-md px-2 border-gray-400"
                                    type="text"
                                    name="surname"
                                    onChange={handleFormData}
                                    value={formData.surname}
                                    placeholder="Surname"
                                /> 
                            </>
                        )}
                         

                    </div>
                    {(step === 2 || !isMobile) && (
                        <div className="date-of-birth ">
                        <div className="label flex p-3 gap-1">
                            <p className="text-sm">Date of birth</p>
                            <CircleHelp  className="w-5 h-5 text-white fill-gray-700"/>
                        </div>
                        <div className="grid grid-cols-3 px-7 place-items-center md:px-4">
                            <div className="day">
                                    <select
                                        onChange={handleFormData}
                                        name="day"
                                        value={formData.day}
                                        className="w-20 h-8 md:w-32 md:h-9 outline-none rounded-md border border-gray-300">
                                    <option value="">Day</option>
                                    {days.map((day, index) => (
                                        <option key={index} value={day}>{day}</option>
                                        
                                    ))}

                                </select>
                            </div>
                            <div className="month">
                                    <select
                                        onChange={handleFormData}
                                        name="month"
                                        value={formData.month}
                                        className="w-20 h-8 md:w-32 md:h-9  outline-none border rounded-md border-gray-300">
                                    <option value=''>Month</option>
                                    {months.map((month, index) => (
                                        <option key={index} value={month}>
                                            {month}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div className="year">
                                    <select
                                        onChange={handleFormData}
                                        name="year"
                                        value={formData.year}
                                        className="w-20 h-8 md:w-32 md:h-9 outline-none border rounded-md border-gray-300">
                                        <option value=''>Year</option>
                                        {years.map((year, index) => (
                                            <option key={index} value={year}>
                                                {year}
                                            </option>
                                        ))}

                                </select>
                            </div>
                        </div>  
                    </div>
                    )}
                    {(step === 3 || !isMobile) && (
                        <div className="gender px-4 ">
                        <div className="flex items-center gap-1">
                            <span className="text-sm">Gender</span>
                            <CircleHelp className="w-5 h-5 text-white fill-gray-700" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 py-2 place-items-center md:px-0">
                                {genders.map((gender, index) => (
                                    <label
                                        key={index}
                                        className="flex justify-between rounded-md md:cursor-pointer w-32 h-9 p-2 border border-gray-300 items-center">
                                        <span>{gender}</span>
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={handleFormData}
                                            value={gender}
                                            checked={formData.gender === gender}
                                        />

                                    </label>
                            ))}
                        </div>
                    </div>
                    )}
                    {(step === 4 || !isMobile) && (
                        <div className="emailAndNumberAndPassword space-y-2.5 w-full p-4">
                        <input
                            className="w-full h-10 outline-none border px-2 border-gray-400 rounded-md"
                            type="text"
                            placeholder="Mobile number or email address"
                        />
                        <input
                            className="w-full h-10 outline-none border px-2 border-gray-400 rounded-md"
                            type="password"
                            placeholder="New password"
                        />
                        <p className="text-xs text-gray-500">
                            People who use our service may have uploaded your contact information to<br />Metastra.
                            <a className="text-blue-500" href=""> Learn more</a>
                        </p>
                        <p className="text-xs text-gray-500">
                            By clicking sign Up, you agree to our
                            <a className="text-blue-500 hover:underline" href=""> Terms, </a>
                            <a className="text-blue-500 hover:underline" href="">Privacy policy</a>
                            <span> and </span>
                            <a className="text-blue-500 hover:underline" href="">cookie policy</a>
                        </p>
                    </div>
                    )}
                    <div className={`btn w-full md:flex justify-center ${isMobile && step === 4 ? 'flex' : 'hidden'}`}>
                        <button className="bg-green-500 shadow-2xl text-white text-xl font-medium w-48 rounded-md h-10">
                            Sign Up
                        </button>

                    </div>

                    {isMobile && (
                        <div className={`flex justify-center items-center text-white font-normal ${step === 4 ? 'hidden' : 'flex'}`}>
                            <button onClick={handleSteps} className="w-11/12 shadow h-12 rounded-xl bg-blue-700">
                                Next
                            </button>
                        </div>
                    )}
                    
                    
                </form>
            </div>
            <div className="absolute w-full top-0 p-2 md:hidden">
                <ArrowLeftIcon onClick={handlepPrevStep} className="text-gray-700"/>

            </div>
            

        </div>
    )
    
}

export default SignUp;

