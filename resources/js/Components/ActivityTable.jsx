import React from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { fetchActivities } from "@/api/fetchActivities";
import { useState } from "react";
import moment from 'moment';
import TextInput from "./TextInput";
import { router } from "@inertiajs/core";

function ActivityTable(props) {
    const { activities } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        activiyFilterDateFrom: '',
        activiyFilterDateTo: '',
        sendUserEmail: '',
    });

    const [state, setState] = useState({
        activities: activities,
    });
    
    function chekDates(dateFrom,dateTo){
        if(dateTo < dateFrom){
            errors.activiyFilterDateTo='Check the time range'
            return errors.activiyFilterDateTo
        }
    }


    function handleFilterClick(e) {
        e.preventDefault();
        if(!data.activiyFilterDateFrom || !data.activiyFilterDateTo){
           return errors.activiyFilterDateFrom = 'Both dates are required'
        }
        chekDates(data.activiyFilterDateFrom,data.activiyFilterDateTo);
        fetchActivities("/api/v1/userActivities",moment(data.activiyFilterDateFrom).format("yyyy-MM-DD"), moment(data.activiyFilterDateTo).format("yyyy-MM-DD")).then(data => {
            setState({
                ...state,
                activities: data,
            })
        });
    }

    function handleSendReport(e) {
        e.preventDefault();
        if(!data.sendUserEmail){
           return errors.sendUserEmail='Email is requred';
        }
        post(route('activityReport.store'));
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
                            <td className="px-6 py-4">{activity.activityTimeSpend}</td>
                            <td className="px-6 py-4">{activity.activityDateFrom}</td>
                            {!props.report &&
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {!props.report &&
                <form onSubmit={handleSendReport}>
                    <div className=" sm:flex sm:flex-row sm:justify-end sm:items-end">
                        <div className="sm:flex sm:flex-column">
                            <InputLabel htmlFor="sendUserEmail" value="User Email" />
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
                        <PrimaryButton className="ml-2 ">Send Report</PrimaryButton>
                    </div>
                </form>
            }
        </div>
    );
}

export default ActivityTable;
