import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import createActivitySvg from '../../../../public/assets/createActivitySvg.svg';
import TimePicker from 'timepicker.js/dist/timepicker';
import SecondaryButton from '@/Components/SecondaryButton';
import { formatTimeSpent } from '@/format/activity';

export default function CreateActivity({ auth, title, value = null, routeFor = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        activityDateFrom: value ? moment(value.activityDateFrom).format('yyyy-MM-DD') : '',
        activityTimeSpend: value ? value.activityTimeSpend : '',
        activityDescription: value ? value.activityDescription : '',
        user_id: auth.user.id,
    });

    const refTimePicker = useRef();

    useEffect(() => {
        const timepicker = new TimePicker(refTimePicker.current, {
            lang: 'en',
            theme: 'dark',
        });

        timepicker.on('change', (evt) => {
            if (evt.minute == null || evt.hour == null) {
                return
            }

            const activityTimeSpend = (parseInt(evt.hour) * 3600 + parseInt(evt.minute) * 60).toString();
            setData(data => ({ ...data, activityTimeSpend: activityTimeSpend}));
        });

        refTimePicker.current.onclick = () => {
            timepicker.show();
        };

        timepicker.show();
    }, []);

    const today = new Date().toISOString().substr(0, 10);

    const submit = (e) => {
        e.preventDefault();
        data.activityDateFrom = moment(data.activityDateFrom).format('yyyy-MM-DD');
        if (value) {
            put(route(`activities.update`, [value.id]), {
                onError: (error) => {
                    setState({ ...state, error: true, errorMessage: error });
                },
                onSuccess: () => {
                    setState({ ...state, success: true, error: false, errorMessage: "" });
                }
            });
            return;
        }
        post(route(`activities.store`), {
            onError: (error) => {
                setState({ ...state, error: true, errorMessage: error });
            },
            onSuccess: () => {
                setState({ ...state, success: true, error: false, errorMessage: "" });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title} Activity</h2>}>
            <Head title="CreateActivity" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"></div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-10">
                <div className="border ml-16 shadow-2xl w-1/2">
                    <form onSubmit={submit}>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            <div className="p-12">
                                <div className="">
                                    <InputLabel htmlFor="date" value="Activity Date" />
                                    <input
                                        min={today}
                                        id="activityDateFrom"
                                        name="activityDateFrom"
                                        type="date"
                                        value={data.activityDateFrom}
                                        onChange={(e) => setData('activityDateFrom', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>}
                            <div className="p-12 ml-16">
                                <InputLabel value="Time Spend" />
                                <div className="">
                                    <div ref={refTimePicker}> &nbsp; {formatTimeSpent(data.activityTimeSpend)}</div>
                                </div>
                            </div>
                        </div>
                        {errors.activityTimeSpend && <div className="text-red-500 m-3">{errors.activityTimeSpend}</div>}
                        <div className="flex flex-col justify-end items-start p-8 mt-28">
                            <InputLabel htmlFor="date" value="Description" />
                            <textarea
                                id="activityDescription"
                                value={data.activityDescription}
                                maxLength={100}
                                required
                                onChange={(e) => setData('activityDescription', e.target.value)}
                                name="activityDescription"
                                rows="7"
                                className="w-full p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Short description (max:100)..."
                            ></textarea>
                            {errors.activityDescription && <div className="text-red-500 m-3">{errors.activityDescription}</div>}
                            <div>
                                <PrimaryButton className="mt-12">{title}</PrimaryButton>
                                <SecondaryButton className="mt-12 ml-2">
                                    {' '}
                                    <Link href={route('dashboard')}> Cancel </Link>
                                </SecondaryButton>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="">
                    <img className="w-4/6 m-20" src={createActivitySvg} alt="Woman adds new activity" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
