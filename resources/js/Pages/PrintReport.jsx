import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ReportTable from '@/Components/ReportTable';

export default function Dashboard({ auth }) {

 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report</h2>}
        >
            <Head title="Show Report" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ReportTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
