
import { Head } from '@inertiajs/react';
import ActivityTable from '@/Components/ActivityTable';

export default function Report(props) {

    console.log('props.activities', props.activities)

    return (
        <>
            <Head title="Report" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ActivityTable key={props.activities.length.toString()} activities={props.activities} report={true} />
                </div>
            </div>
        </>
    );
}
