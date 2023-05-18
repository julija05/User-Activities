import React from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { fetchActivities } from "@/api/fetchActivities";
import { useState } from "react";
import moment from 'moment';
import TextInput from "./TextInput";
import { formatTimeSpent } from "@/format/activity";
import ToastSuccess from "./ToastSucess";
import ToastError from "./ToastError";

function ActivityTable(props) {
    const { activities } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        activiyFilterDateFrom: '',
        activiyFilterDateTo: '',
        sendUserEmail: '',
    });

    const [state, setState] = useState({
        activities: activities,
        success: false,
        error: false,
        errorMessage: '',
    });

    function chekDates(dateFrom, dateTo) {
        if (dateTo < dateFrom) {
            errors.activiyFilterDateTo = 'Check the time range'
            return errors.activiyFilterDateTo
        }
    }


    function handleFilterClick(e) {
        e.preventDefault();
        if (!data.activiyFilterDateFrom || !data.activiyFilterDateTo) {
            return errors.activiyFilterDateFrom = 'Both dates are required'
        }
        chekDates(data.activiyFilterDateFrom, data.activiyFilterDateTo);
        fetchActivities("/api/v1/userActivities", moment(data.activiyFilterDateFrom).format("yyyy-MM-DD"), moment(data.activiyFilterDateTo).format("yyyy-MM-DD")).then(data => {
            setState({
                ...state,
                activities: data,
            })
        });
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function handleSendReport(e) {
        e.preventDefault();
        setState({ ...state, error: false, errorMessage: "", success: false });

        if (!data.activiyFilterDateFrom || !data.activiyFilterDateTo) {
            setState({ ...state, error: true, errorMessage: "wrong date" });
            return
        }

        if (!data.sendUserEmail) {
            setState({ ...state, error: true, errorMessage: 'Email is required' });
            return
        }

        if (!isValidEmail(data.sendUserEmail)) {
            errors.sendUserEmail = 'Enter Valid Email'
            setState({ ...state, error: true, errorMessage: 'Email is invalid' });
            return
        }

        post(route('activityReport.store'), {
            onError: (error) => {
                setState({ ...state, error: true, errorMessage: error });
            },
            onSuccess: () => {
                setState({ ...state, success: true, error: false, errorMessage: "" });
            }
        });

        // Render ToastSuccess component

    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {!props.report &&
                <form onSubmit={handleFilterClick}>
                    <div class=" sm:flex sm:flex-row">
                        <div className="py-2 ml-1">
                            <div className="">
                                <InputLabel htmlFor="date" value="Filter Activity From" />
                                <input
                                    id="activiyFilterDateFrom"
                                    name="activiyFilterDateFrom"
                                    type="date"
                                    value={data.activiyFilterDateFrom}
                                    onChange={(e) => setData('activiyFilterDateFrom', e.target.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div className="py-2 ml-1">
                            <div className="">
                                <InputLabel htmlFor="date" value="Filter Activity To" />
                                <input
                                    id="activiyFilterDateTo"
                                    name="activiyFilterDateTo"
                                    type="date"
                                    value={data.activiyFilterDateTo}
                                    onChange={(e) => setData('activiyFilterDateTo', e.target.value)}
                                    required
                                />

                            </div>
                        </div>
                        <div className="self-center m-5 pt-3">
                            <DangerButton>Filter</DangerButton>
                        </div>
                    </div>
                    <div className='sm:flex sm:flex-row'>
                        {errors.activiyFilterDateFrom && <div className='text-red-500 m-3'>{errors.activiyFilterDateFrom}</div>}
                        {errors.activiyFilterDateTo && <div className='text-red-500 m-3'>{errors.activiyFilterDateTo}</div>}
                    </div>
                </form>
            }
            <div className='overflow-y-scroll max-h-80'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            activity description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            time spend
                        </th>
                        <th scope="col" className="px-6 py-3">
                            activity date
                        </th>
                        {!props.report &&
                            <th scope="col" className="px-6 py-3">
                                edit activity
                            </th>
                            
                        }
                           {!props.report &&
                            <th scope="col" className="px-6 py-3">
                                delete activity
                            </th>
                            
                        }
                    </tr>
                </thead>
                <tbody>
                    {state.activities.map((activity) => (
                        <tr
                            key={activity.id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {activity.activityDescription}
                            </th>
                            <td className="px-6 py-4">{formatTimeSpent(activity.activityTimeSpend)}</td>
                            <td className="px-6 py-4">{activity.activityDateFrom}</td>
                            {!props.report &&
                                <td className="px-6 py-4">
                                    <a
                                        href={route('activities.edit',[activity.id])}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            }
                             {!props.report &&
                                <td className="px-6 py-4">
                                    <a
                                        href={route('activities.destroy',[activity.id])}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Delete
                                    </a>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {!props.report &&
                <form onSubmit={handleSendReport}>
                    <div className=" sm:flex sm:flex-row sm:justify-end sm:items-end p-2">
                        <div className="sm:flex sm:flex-column">
                            <InputLabel className="mt-3" htmlFor="sendUserEmail" value="User Email" />
                            <TextInput
                                id="nasendUserEmailme"
                                name="sendUserEmail"
                                value={data.sendUserEmail}
                                className="ml-2"
                                isFocused={true}
                                onChange={(e) => setData('sendUserEmail', e.target.value)}
                                required />
                        </div>
                        {errors.sendUserEmail && <div className='text-red-500 m-3'>{errors.sendUserEmail}</div>}
                        <PrimaryButton type="submit" className="ml-2 mb-1 ">Send Report</PrimaryButton>
                    </div>
                    <div>
                        {state.success && <ToastSuccess
                            onClose={() => {
                                setState({
                                    ...state,
                                    success: false,
                                })
                            }}
                        />}
                    </div>
                    <div>
                        {state.error && <ToastError message={state.errorMessage}
                            onClose={() => {
                                setState({
                                    ...state,
                                    error: false,
                                    errorMessage: '',
                                })
                            }}
                        />}
                    </div>
                </form>
            }

        </div>
    );
}

export default ActivityTable;
