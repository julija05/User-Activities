import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

import TimePicker from 'timepicker.js/dist/timepicker'


export default function CreateActivity({ auth }) {
    const [state, setState] = useState({
        activityTimeSpend: '',
    })

    const refTimePicker = useRef()

    const today = new Date().toISOString().substr(0, 10); // Get today's date in the format "YYYY-MM-DD"
    const { data, setData, post, processing, errors, reset } = useForm({
        activityDateFrom: '',
        activityTimeSpend: '',
        activityDescription: '',
        user_id: auth.user.id,
    });


    useEffect(() => {
        const timepicker = new TimePicker(refTimePicker.current, {
            lang: 'en',
            theme: 'dark'
        }
        );

        timepicker.on('change', (evt) => {
            
            if (!evt.minute) {
                evt.minute = 0
            }
            if (!evt.hour) {
                evt.hour = 0
            }
            setData('activityTimeSpend', (parseInt(evt.hour) * 3600 + parseInt(evt.minute) * 60).toString())
            setState({
                ...state,
                activityTimeSpend: evt.hour + ":" + evt.minute
            })
        })

        refTimePicker.current.onclick =()=> {
            timepicker.show()
        }
        timepicker.show()

    }, [])

    const submit = (e) => {
        e.preventDefault();
        data.activityDateFrom = moment(data.activityDateFrom).format("yyyy-MM-DD");
        post(route('activities.store'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Activity</h2>}
        >
            <Head title="CreateActivity" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    </div>
                </div>
            </div>
            <div className=''>
            <form onSubmit={submit}>
                <div class=" sm:flex sm:flex-row sm:justify-center sm:items-center ">
                    <div className="py-12 m-4">
                        <div className="">
                            <InputLabel htmlFor="date" value="Activity Date" />
                            <input min={today}
                                id="activityDateFrom"
                                name="activityDateFrom"
                                type="date"
                                value={data.activityDateFrom}
                                onChange={(e) => setData('activityDateFrom', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {errors.activityDateFrom && <div className='text-red-500 m-3'>{errors.activityDateFrom}</div>}
                    <div className="py-12 m-4">
                        <div className="">
                            <InputLabel htmlFor="date" value="Time Spend" />
                            <div ref={refTimePicker}> &nbsp;
                                {state.activityTimeSpend}
                            </div>
                        </div>
                    </div>
                </div>
                {errors.activityTimeSpend && <div className='text-red-500 m-3'>{errors.activityTimeSpend}</div>}
                <div class=" w- sm:flex sm:flex-col sm:justify-center sm:items-center">
                    <InputLabel htmlFor="date" value="Description" />
                    <textarea id="activityDescription" value={data.activityDescription} maxLength={50}
                        required onChange={(e) => setData('activityDescription', e.target.value)} name='activityDescription' rows="4" class="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Short description (max:50)..."></textarea>
                    {errors.activityDescription && <div className='text-red-500 m-3'>{errors.activityDescription}</div>}
                    <PrimaryButton className='mt-5'>Create</PrimaryButton>
                </div>
            </form>
            </div>
        </AuthenticatedLayout>
    );
}
