import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ActivityTable from '@/Components/ActivityTable';
import { useState, useEffect } from 'react';
import { fetchActivities } from '@/api/fetchActivities';
import { CREATE_ACTIVITY_FORM, SHOW_ACTIVITY_REPORT } from '@/constants/apiRoutes';

export default function Dashboard({ auth }) {
const [activities, setActivities] = useState([]);

useEffect(() => {
    fetchActivities().then(data => setActivities(data));
  }, []);
 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Activity Report</h2>}
        >
            <Head title="Activity Report" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                       <Link  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href={route(CREATE_ACTIVITY_FORM)}>Add Activity</Link>
                       <Link  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href={route(SHOW_ACTIVITY_REPORT)}>Print Report</Link>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ActivityTable key={activities.length.toString()} activities={activities} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
