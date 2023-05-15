import React, { useEffect, setState } from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { fetchActivities } from "@/api/fetchActivities";
import { useState } from "react";
import moment from 'moment';
import TextInput from "./TextInput";

function ReportTable(props) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivities("/api/v1/report").then(data => setActivities(data));
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        reportDateFilterFrom: '',
        reportDateFilterTo: '',
    });


    function handleFilterClick() {
        fetchActivities('/api/v1/report',moment(data.reportDateFilterFrom).format("yyyy-MM-DD"), moment(data.reportDateFilterTo).format("yyyy-MM-DD")).then(data => {
            // console.log(data,'data')
            setActivities(data)
        });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class=" sm:flex sm:flex-row">
                <div className="py-2 ml-1">
                    <div className="">
                        <InputLabel htmlFor="date" value="Filter Activity From" />
                        <input
                            id="reportDateFilterFrom"
                            name="reportDateFilterFrom"
                            type="date"
                            value={data.reportDateFilterFrom}
                            onChange={(e) => setData('reportDateFilterFrom', e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-2 ml-1">
                    <div className="">
                        <InputLabel htmlFor="date" value="Filter Activity To" />
                        <input
                            id="reportDateFilterTo"
                            name="reportDateFilterTo"
                            type="date"
                            value={data.reportDateFilterTo}
                            onChange={(e) => setData('reportDateFilterTo', e.target.value)}
                        />
                    </div>
                </div>
                <div className="self-center m-5 pt-3">
                    <DangerButton onClick={handleFilterClick}>Filter</DangerButton>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            time spent
                        </th>
                        <th scope="col" className="px-6 py-3">
                            activity date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr
                            key={activity.id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="px-6 py-4">{activity.activityTimeSpend}</td>
                            <td className="px-6 py-4">{activity.activityDateFrom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReportTable;