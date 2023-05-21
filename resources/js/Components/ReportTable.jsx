import React, { useEffect, setState } from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from "./InputLabel";
import DangerButton from "./DangerButton";
import { fetchActivities } from "@/api/fetchActivities";
import { useState,useRef } from "react";
import moment from 'moment';
import { formatTimeSpent } from "@/format/activity";
import PrimaryButton from "./PrimaryButton";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ERROR_CHECK_TIME_RANGE, ERROR_EXPORTING_PDF, ERROR_FILTERING_DATA, ERROR_SUBMITING_FORM } from "@/constants/constants";
import { REPORT_ROUTE } from "@/constants/apiRoutes";

function ReportTable(props) {
    const [activities, setActivities] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        fetchActivities(REPORT_ROUTE).then(data => setActivities(data))
        .catch(error=> {
            if (error.response && error.response.data && error.response.data.errors) {
                setData((prevData) => ({
                  ...prevData,
                  errors: error.response.data.errors,
                }));   
              }else{
                  console.error(ERROR_SUBMITING_FORM, error);
              }
        });
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        reportDateFilterFrom: '',
        reportDateFilterTo: '',
    });

    function chekDates(dateFrom,dateTo){
        if(dateTo < dateFrom){
            errors.activiyFilterDateTo=ERROR_CHECK_TIME_RANGE
            return errors.activiyFilterDateTo
        }
    }

    function handleFilterClick(e) {
        e.preventDefault();
        reset(); // Clear any previous errors
          chekDates(data.reportDateFilterFrom, data.reportDateFilterTo);
          fetchActivities(REPORT_ROUTE, moment(data.reportDateFilterFrom).format("yyyy-MM-DD"), moment(data.reportDateFilterTo).format("yyyy-MM-DD"))
            .then(data => {
              setActivities(data);
              reset();
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                  setData((prevData) => ({
                    ...prevData,
                    errors: error.response.data.errors,
                  }));   
                }else{
                    console.error(ERROR_FILTERING_DATA, error);
                }
            });
    }  
    function handleExportPDF() {
        html2canvas(tableRef.current)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save('activity-table.pdf');
            }) .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setData((prevData) => ({
                      ...prevData,
                      errors: error.response.data.errors,
                    }))
                }else{
                    console.error(ERROR_EXPORTING_PDF, error);
                }   
            });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <form onSubmit={handleFilterClick}>
            <div className=" sm:flex sm:flex-row">
                <div className="py-2 ml-1">
                    <div className="">
                        <InputLabel htmlFor="date" value="Filter Activity From" />
                        <input
                            id="reportDateFilterFrom"
                            name="reportDateFilterFrom"
                            type="date"
                            value={data.reportDateFilterFrom}
                            onChange={(e) => setData('reportDateFilterFrom', e.target.value)}
                            required
                        />
                         {errors.reportDateFilterFrom && <div className='text-red-500 m-3'>{errors.reportDateFilterFrom}</div>}
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
                            required
                        />
                         {errors.reportDateFilterTo && <div className='text-red-500 m-3'>{errors.reportDateFilterTo}</div>}
                    </div>
                </div>
                <div className="self-center m-5 pt-3">
                    <DangerButton >Filter</DangerButton>
                </div>
            </div>
                </form>
                <div className='overflow-y-scroll max-h-80'  ref={tableRef}>
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
                            <td className="px-6 py-4">{formatTimeSpent(activity.activityTimeSpend)}</td>
                            <td className="px-6 py-4">{activity.activityDateFrom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className=" sm:flex sm:flex-row sm:justify-end sm:items-end p-2">
            <PrimaryButton onClick={handleExportPDF}>Export as PDF</PrimaryButton>
            </div>
        </div>
    );
}

export default ReportTable;
